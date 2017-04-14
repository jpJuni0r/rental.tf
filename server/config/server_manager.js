import {Server} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import wrapper from 'do-wrapper';

const TOKEN = Meteor.settings.DO_KEY;
const api = new wrapper(TOKEN);

function createServer(server) {
  return new Promise((resolve) => {
    const {DEMOS_KEY, LOGS_KEY} = Meteor.settings;

    let formatedRegion = 'fra1';

    switch (server.region) {
      case 'usaSf': formatedRegion = 'sfo2'; break;
      case 'usaNy': formatedRegion = 'nyc2'; break;
    }

    const configuration = {
      name: `tf2-${server._id}-${server.region}`,
      region: formatedRegion,
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

    api.dropletsCreate(configuration).then((res) => {

      resolve(res.body.droplet);
    });
  });
}
export default function () {
  Server.find({createdAt: {$gte: new Date(new Date() - 1000)}}).observe({
    added(server) {
      if (!Meteor.settings.DISABLE_RENTING) {
        createServer(server).then(droplet => { // BROKEN HERE
          Server.update({_id: server._id}, {$set: {droplet: droplet.id, status: 'STAGING'}});

          // Fetch IP
          Meteor.setTimeout(() => {
            api.dropletsGetById(droplet.id).then(res => {
              const newDroplet = res.body.droplet;
              const ip = newDroplet.networks.v4[0].ip_address;

              // TODO: Throw error on invalid IP
              Server.update({_id: server._id}, {$set: {
                ip, status: 'READY_SOON', serverStarted: new Date()
              }});
            });
          }, 1000);

          // Timeout server after two hours
          const timeout = Meteor.setTimeout(() => {
            if (server.status !== 'TERMINATED') {
              api.dropletsDelete(droplet.id).then(() => {
                Server.update({_id: server._id}, {$set: {
                  status: 'TIMEOUT', serverStopped: new Date()
                }});
                Meteor.users.update({_id: server.userId}, {$set: {'profile.activeServer': false}});
              });
            }
          }, 2 * 59 * 60 * 1000); // One hour has 59min

          Meteor.users.update({_id: server.userId}, {$set: {
            serverTimeout: timeout, serverStopped: new Date()
          }});
        });
      } else {
        Server.update({_id: server._id}, {$set: {ip: '127.0.0.1', status: 'READY'}});
      }
    }
  });
}
