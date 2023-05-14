import { ApiDefinition, MockIntegration, PassthroughBehavior, RestApi, SpecRestApi } from 'aws-cdk-lib/aws-apigateway';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';

export class Apigateway extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const restApi = new RestApi(this, 'rest-api');
    const mockIntegration = new MockIntegration({
      integrationResponses: [
        { statusCode: '200' },
      ],
      passthroughBehavior: PassthroughBehavior.NEVER,
      requestTemplates: {
        'application/json': '{ "statusCode": 200 }',
      },
    });

    restApi.root.addMethod('GET', mockIntegration, {
      requestValidatorOptions: {
        validateRequestBody: true,
        validateRequestParameters: true,
      },
    });
    NagSuppressions.addResourceSuppressions(restApi, [
      { id: 'AwsSolutions-IAM4', reason: 'irelevant at the moment' },
      { id: 'AwsSolutions-APIG1', reason: 'irelevant at the moment' },
      { id: 'AwsSolutions-APIG3', reason: 'irelevant at the moment' },
      { id: 'AwsSolutions-APIG4', reason: 'irelevant at the moment' },
      { id: 'AwsSolutions-APIG6', reason: 'irelevant at the moment' },
      { id: 'AwsSolutions-COG4', reason: 'irelevant at the moment' },
      // { id: 'AwsSolutions-APIG2', reason: 'irelevant at the moment' },
    ], true);


    const specRestApi = new SpecRestApi(this, 'spec-rest-api', {
      apiDefinition: ApiDefinition.fromAsset('./src/constructs/apigateway/openapi.yaml'),
    });
    NagSuppressions.addResourceSuppressions(specRestApi, [
      { id: 'AwsSolutions-IAM4', reason: 'irelevant at the moment' },
      { id: 'AwsSolutions-APIG1', reason: 'irelevant at the moment' },
      { id: 'AwsSolutions-APIG3', reason: 'irelevant at the moment' },
      { id: 'AwsSolutions-APIG6', reason: 'irelevant at the moment' },
      { id: 'AwsSolutions-APIG2', reason: 'irelevant at the moment' },
    ], true);


  }
}