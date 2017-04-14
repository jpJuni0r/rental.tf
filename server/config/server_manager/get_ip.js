import {Server} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import wrapper from 'do-wrapper';

export default function (server, options) {
  const {fake} = options;
  const api = new wrapper(Meteor.settings.DO_KEY);

  if (!fake) {
    // Request IP from DO
    // Wait 1s for DO to set up networks
    Meteor.setTimeout(() => {
      const dropletId = Server.findOne(server._id).droplet;
      api.dropletsGetById(dropletId).then(res => {
        const newDroplet = res.body.droplet;
        const ip = newDroplet.networks.v4[0].ip_address;

        Server.update(server._id, {$set: {
          status: 'BOOTING',
          stage: 3,
          ip
        }});
      });
    }, 1000);
  } else {
    Meteor.setTimeout(() => {
      Server.update(server._id, {$set: {
        status: 'BOOTING',
        stage: 3,
        ip: '127.0.0.1'
      }});
    }, 2000);
  }

}
