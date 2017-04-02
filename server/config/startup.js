import {ServiceConfiguration} from 'meteor/service-configuration';

export default function () {
  ServiceConfiguration.configurations.upsert(
  { service: 'steam' },
    {
      $set: {
        loginStyle: 'redirect',
        timeout: 10000
      }
    }
  );
}
