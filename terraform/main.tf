data "aws_caller_identity" "current" {}

### AWS Amplify App config and branch config ###
resource "aws_amplify_app" "setokiaba" {
  name       = var.app_name
  repository = var.source_repo

  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.setokiaba.id
  branch_name = var.main_branch
  stage       = "PRODUCTION"

  # Enable SNS notifications.
  enable_notification = true
}

# Associate top level domain with the main branch
resource "aws_amplify_domain_association" "main" {
  app_id      = aws_amplify_app.setokiaba.id
  domain_name = "setokiaba.com"

  # https://setokiaba.com
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = ""
  }

  # https://www.setokiaba.com
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }
}



### Cloudwatch event bridge to send build notifications to SNS ###
resource "aws_cloudwatch_event_rule" "amplify_app_main" {
  name        = "amplify-${aws_amplify_app.setokiaba.id}-${aws_amplify_branch.main.branch_name}-branch-notification"
  description = "AWS Amplify build notifications for :  App: ${aws_amplify_app.setokiaba.id} Branch: ${aws_amplify_branch.main.branch_name}"

  event_pattern = jsonencode({
    "detail" = {
      "appId" = [
        aws_amplify_app.setokiaba.id
      ]
      "branchName" = [
        aws_amplify_branch.main.branch_name
      ],
      "jobStatus" = [
        "SUCCEED",
        "FAILED"
      ]
    }
    "detail-type" = [
      "Amplify Deployment Status Change"
    ]
    "source" = [
      "aws.amplify"
    ]
  })
}

resource "aws_cloudwatch_event_target" "amplify_app_main" {
  rule      = aws_cloudwatch_event_rule.amplify_app_main.name
  target_id = aws_amplify_branch.main.branch_name
  arn       = aws_sns_topic.amplify_app_main.arn

  input_transformer {
    input_paths = {
      jobId  = "$.detail.jobId"
      appId  = "$.detail.appId"
      region = "$.region"
      branch = "$.detail.branchName"
      status = "$.detail.jobStatus"
    }

    input_template = "\"BUILD STATUS: <status>. Build notification from the AWS Amplify Console for app: https://<branch>.<appId>.amplifyapp.com/. Your build status is <status>. Go to https://console.aws.amazon.com/amplify/home?region=<region>#<appId>/<branch>/<jobId> to view details on your build. \""
  }
}

resource "aws_sns_topic" "amplify_app_main" {
  name              = "amplify-${aws_amplify_app.setokiaba.id}_${aws_amplify_branch.main.branch_name}"
  display_name      = "amplify-build-${var.app_name}"
  kms_master_key_id = aws_kms_key.build-sns-encrypt.arn
}

resource "aws_kms_key" "build-sns-encrypt" {
  description         = "This key is used to encrypt the SNS topic for Amplify build notifications"
  enable_key_rotation = true
  policy              = data.aws_iam_policy_document.build-sns-encrypt-policy-document.json
}

data "aws_iam_policy_document" "build-sns-encrypt-policy-document" {
  statement {
    sid    = "Allow KMS Use"
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["events.amazonaws.com"]
    }
    principals {
      type = "AWS"
      identifiers = [
        "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root",
        "${data.aws_caller_identity.current.arn}"
      ]
    }
    actions = [
      "kms:*",
    ]
    resources = [
      "*"
    ]
  }
}

data "aws_iam_policy_document" "amplify_app_main" {
  statement {
    sid = "Allow_Publish_Events ${aws_amplify_branch.main.arn}"

    effect = "Allow"

    actions = [
      "SNS:Publish",
    ]

    principals {
      type = "Service"
      identifiers = [
        "events.amazonaws.com",
      ]
    }

    resources = [
      aws_sns_topic.amplify_app_main.arn,
    ]
  }
}

resource "aws_sns_topic_policy" "amplify_app_main" {
  arn    = aws_sns_topic.amplify_app_main.arn
  policy = data.aws_iam_policy_document.amplify_app_main.json
}
