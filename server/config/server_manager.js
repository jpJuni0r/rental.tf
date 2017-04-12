import {Server} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import wrapper from 'do-wrapper';

const TOKEN = Meteor.settings.DO_KEY;
const api = new wrapper(TOKEN);

function createServer(server) {
  return new Promise((resolve, reject) => {
    const {DEMOS_KEY, LOGS_KEY} = Meteor.settings;

    const configuration = {
      name: `tf2-${server._id}-${server.region}-${server.username}`,
      region: 'fra1',
      size: '2gb',
      image: 24094773,
      ssh_keys: [ // eslint-disable-line camelcase
        '3a:68:4d:94:9d:77:89:c7:17:c8:cb:3e:d4:fd:1d:23'
      ],
      monitoring: true,
      user_data: // eslint-disable-line camelcase
        '#!/bin/bash\n' +
        'docker run -p 27015:27015/udp -p 27015:27015/tcp -p 27020:27020/udp ' +
        'spiretf/docker-comp-server ' +
        `+sv_password ${server.password} +rcon_password ${server.rcon} ` +
        '+map cp_badlands +hostname "Rental.TF Match Server" ' +
        `+sm_demostf_apikey ${DEMOS_KEY} +logstf_apikey ${LOGS_KEY}`
    };

    api.dropletsCreate(configuration, (err, res) => {
      if (err) {
        reject(err);
      }

      resolve(res.body.droplet);
    });
  });
}
export default function () {
  Server.find().observe({
    added(server) {
      if (new Date() - server.createdAt < 1000) {
        createServer(server).then(droplet => {
          Server.update({_id: server._id}, {$set: {droplet: droplet.id, status: 'STAGING'}});

          Meteor.setTimeout(() => {
            api.dropletsGetById(droplet.id).then(res => {
              const newDroplet = res.body.droplet;
              const ip = newDroplet.networks.v4[0].ip_address;

              // TODO: Throw error on invalid IP
              Server.update({_id: server._id}, {$set: {ip, status: 'BOOTING'}});
            });
          }, 2000);
        });
      }
    }
  });
}
