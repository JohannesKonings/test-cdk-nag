import { App, Aspects, Stack, StackProps } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { Construct } from 'constructs';
import { Apigateway } from './constructs/apigateway/apigateway';
import { Athena } from './constructs/athena';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new Athena(this, 'athena-workgroup');
    new Apigateway(this, 'test-api');
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'test-cdk-nag-athena-dev', { env: devEnv });
// new MyStack(app, 'test-cdk-nag-athena-prod', { env: prodEnv });

Aspects.of(app).add(new AwsSolutionsChecks());

app.synth();