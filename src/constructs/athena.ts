import { CfnWorkGroup } from 'aws-cdk-lib/aws-athena';
import { Construct } from 'constructs';

export class Athena extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new CfnWorkGroup(this, 'athena-workgroup', {
      name: 'athena-workgroup',
      workGroupConfiguration: {
        enforceWorkGroupConfiguration: true,
        resultConfiguration: {
          encryptionConfiguration: {
            encryptionOption: 'SSE_KMS',
          },
        },
      },
    });
  }
}