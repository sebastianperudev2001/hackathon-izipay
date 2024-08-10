import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class ApiGatewayConstruct extends Construct {
  public readonly api: apiGateway.RestApi;

  constructor(
    scope: Construct,
    id: string,
    generateGraphs: lambda.Function,
    generateAnswer: lambda.Function
  ) {
    super(scope, id);

    this.api = new apiGateway.RestApi(this, "Api", {
      description: "POC API para INAGEIGEM",
      deployOptions: {
        stageName: "api",
        loggingLevel: apiGateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
      cloudWatchRole: true,
    });

    const chartsResource = this.api.root.addResource("charts");
    const messagesResource = this.api.root.addResource("messages");

    chartsResource.addMethod(
      "POST",
      new apiGateway.LambdaIntegration(generateGraphs)
    );

    messagesResource.addMethod(
      "POST",
      new apiGateway.LambdaIntegration(generateAnswer)
    );

    messagesResource.addCorsPreflight({
      allowOrigins: ["*"],
      allowMethods: ["*"],
    });

    chartsResource.addCorsPreflight({
      allowOrigins: ["*"],
      allowMethods: ["*"],
    });
  }
}
