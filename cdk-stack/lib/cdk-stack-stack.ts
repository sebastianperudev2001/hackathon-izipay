import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaFunctionsConstruct } from "./components/lambda-functions";
import { ApiGatewayConstruct } from "./components/api-gateway";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStackStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunctionsSetup = new LambdaFunctionsConstruct(
      this,
      "LambdaFunctions"
    );
    const apiGatewaySetup = new ApiGatewayConstruct(
      this,
      "ApiGateway",
      lambdaFunctionsSetup.generateGraphs,
      lambdaFunctionsSetup.generateAnswer
      //probando
    );
  }
}
