import {
  Stack,
  App,
  StackProps,
  CfnParameter,
  Duration,
  aws_iam as iam,
  aws_backup as backup,
  aws_events as events,
} from "aws-cdk-lib";

import * as AmplifyHelpers from "@aws-amplify/cli-extensibility-helper";

export class cdkStack extends Stack {
  constructor(
    scope: App,
    id: string,
    props?: StackProps,
    amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps,
  ) {
    super(scope, id, props);

    new CfnParameter(this, "env", {
      type: "String",
      description: "Current Amplify CLI env name",
    });

    // Set up IAM account for AWS Backups
    const backupAdmin = new iam.Role(this, "BackupAdminRole", {
      assumedBy: new iam.ServicePrincipal("backup.amazonaws.com"),
    });
    backupAdmin.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSBackupServiceRolePolicyForBackup",
      ),
    );
    backupAdmin.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "AWSBackupServiceRolePolicyForS3Backup",
      ),
    );

    // Create backup vault rules
    const weeklyPlanRule = new backup.BackupPlanRule({
      deleteAfter: Duration.days(187),
      moveToColdStorageAfter: Duration.days(7),
      scheduleExpression: events.Schedule.expression("cron(0 5 ? * MON *)"),
      ruleName: "Weekly",
    });

    const plan = new backup.BackupPlan(this, "amplify-appsync-dyanmodb-plan", {
      backupPlanName: `statscollide-plan-${
        AmplifyHelpers.getProjectInfo().envName
      }`,
      backupPlanRules: [weeklyPlanRule],
      backupVault: new backup.BackupVault(this, "Vault", {
        backupVaultName: `statscollide-vault-${
          AmplifyHelpers.getProjectInfo().envName
        }`,
        accessPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.DENY,
              principals: [new iam.AnyPrincipal()],
              actions: ["backup:DeleteRecoveryPoint"],
              resources: ["*"],
              conditions: {
                StringNotLike: {
                  "aws:PrincipalArn": [backupAdmin.roleArn],
                },
              },
            }),
          ],
        }),
      }),
    });

    // This will capture all resources in all the stacks that can be backed up with AWS Backup
    // Unfortunately, this will also capture all of the CFT stacks (all stacks are backed up but nested stacks will fail in their parent job)
    // and back up the deployment S3 buckets (which will fail because I am not enabling versioning on those buckets, due to cost)
    // The important resources are being backed up; just making a note in case I see a bunch of failures in
    // the AWS backup console and forget why.
    plan.addSelection(`UserStackSelectionByTag`, {
      resources: [
        backup.BackupResource.fromTag(
          "user:Stack",
          AmplifyHelpers.getProjectInfo().envName,
        ),
      ],
      backupSelectionName: "cloudformation-resources",
      role: backupAdmin,
    });
  }
}
