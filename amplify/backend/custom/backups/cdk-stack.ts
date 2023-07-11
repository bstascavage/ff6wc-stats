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
      assumedBy: new iam.AccountPrincipal(Stack.of(this).account),
    });
    backupAdmin.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AWSBackupFullAccess"),
    );
    backupAdmin.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "AWSBackupServiceRolePolicyForS3Backup",
      ),
    );

    // Create backup vault rules
    const dailyPlanRule = new backup.BackupPlanRule({
      deleteAfter: Duration.days(14),
      ruleName: "Daily",
    });
    const weeklyPlanRule = new backup.BackupPlanRule({
      deleteAfter: Duration.days(28),
      scheduleExpression: events.Schedule.expression("cron(0 5 ? * MON *)"),
      ruleName: "Weekly",
    });
    const monthlyPlanRule = new backup.BackupPlanRule({
      deleteAfter: Duration.days(90),
      scheduleExpression: events.Schedule.expression("cron(0 5 1 * ? *)"),
      ruleName: "Monthly",
    });

    const plan = new backup.BackupPlan(this, "amplify-appsync-dyanmodb-plan", {
      backupPlanName: `statscollide-plan-${
        AmplifyHelpers.getProjectInfo().envName
      }`,
      backupPlanRules: [dailyPlanRule, weeklyPlanRule, monthlyPlanRule],
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

    plan.addSelection(`UserStackSelectionByTag`, {
      resources: [
        backup.BackupResource.fromTag(
          "user:Stack",
          AmplifyHelpers.getProjectInfo().envName,
        ),
      ],
    });
  }
}
