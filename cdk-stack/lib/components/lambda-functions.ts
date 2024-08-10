import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { Duration } from "aws-cdk-lib";

import * as iam from "aws-cdk-lib/aws-iam";

export class LambdaFunctionsConstruct extends Construct {
  public readonly generateGraphs: lambda.Function;
  public readonly generateAnswer: lambda.Function;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.generateGraphs = new lambda.Function(this, "GenerateGraphsLambda", {
      runtime: lambda.Runtime.PYTHON_3_10,
      handler: "app.lambda_handler",
      code: lambda.Code.fromAsset("lib/lambda_functions/generate_graphs", {
        bundling: {
          image: lambda.Runtime.PYTHON_3_10.bundlingImage,
          command: [
            "bash",
            "-c",
            "pip install -r requirements.txt -t /asset-output && cp -au . /asset-output",
          ],
        },
      }),
      environment: {},
      timeout: Duration.seconds(60),
      initialPolicy: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ["bedrock:*"],
          resources: ["*"],
        }),
      ],
    });

    this.generateAnswer = new lambda.Function(this, "GenerateAnswerLambda", {
      runtime: lambda.Runtime.PYTHON_3_10,
      handler: "app.lambda_handler",
      code: lambda.Code.fromAsset("lib/lambda_functions/generate_answer", {
        bundling: {
          image: lambda.Runtime.PYTHON_3_10.bundlingImage,
          command: [
            "bash",
            "-c",
            "pip install -r requirements.txt -t /asset-output && cp -au . /asset-output",
          ],
        },
      }),
      environment: {},
      timeout: Duration.seconds(60),
      initialPolicy: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ["bedrock:*"],
          resources: ["*"],
        }),
      ],
    });
  }
}
