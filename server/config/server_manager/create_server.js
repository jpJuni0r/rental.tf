import {Server} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import wrapper from 'do-wrapper';

export default function (server, options) {
  const {fake} = options;

  if (!fake) {
    // Request server from DO
    const {DEMOS_KEY, LOGS_KEY} = Meteor.settings;
    const api = new wrapper(Meteor.settings.DO_KEY);

    let formatedRegion = 'fra1';

    switch (server.region) {
      case 'usaSf': formatedRegion = 'sfo2'; break;
      case 'usaNy': formatedRegion = 'nyc2'; break;
    }

    const configuration = {
      name: `tf2-${server._id}-${server.region}`,
      region: formatedRegion,
      size: '2gb',
      image: 24186907,
      ssh_keys: [ // eslint-disable-line camelcase
        '3a:68:4d:94:9d:77:89:c7:17:c8:cb:3e:d4:fd:1d:23'
      ],
      monitoring: true,
      user_data: // eslint-disable-line camelcase
        '#!/bin/bash\n' +
        'docker run -p 27015:27015/tcp -p 27015:27015/udp -p 27020:27020/udp -p 27021:27021/tcp ' +
        'spiretf/docker-comp-server ' +
        `+sv_password "${server.password}" +rcon_password "${server.rcon}" ` +
        `+map cp_badlands +hostname "Rental.TF Match Server | Region ${formatedRegion.toUpperCase()}" ` +
        `+sm_demostf_apikey ${DEMOS_KEY} +logstf_apikey ${LOGS_KEY}`
    };

    api.dropletsCreate(configuration).then((res) => {
      Server.update(server._id, {$set: {
        status: 'BOOTING_UNKNOWN_IP',
        stage: 2,
        droplet: res.body.droplet.id
      }});
    });
  } else {
    Meteor.setTimeout(() => {
      Server.update(server._id, {$set: {
        status: 'BOOTING_UNKNOWN_IP',
        stage: 2,
        droplet: -1
      }});
    }, 2000);
  }
}
