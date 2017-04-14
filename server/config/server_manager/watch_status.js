import {Server} from '/lib/collections';
import webrcon from 'webrcon';

export default function (server, options) {
  const {fake} = options;

  if (!fake) {
    let lastUpdate = new Date();
    let rcon;

    const interval = Meteor.setInterval(() => {
      if (new Date() - lastUpdate > 1.5 * 10 * 1000) {
        Meteor.clearInterval(interval);
        Server.update(server._id, {$set: {
          serverStatus: {
            hostname: 'OFFLINE',
            map: '?',
            players: []
          }
        }});

        if (rcon && rcon.disconnect) {
          rcon.disconnect();
        }
      }

      rcon = new webrcon(server.ip, server.rcon);
      rcon.status().then(res => {
        lastUpdate = new Date();
        Server.update(server._id, {$set: {
          serverStatus: {
            hostname: res.name,
            map: res.map,
            players: res.players
          }
        }});
        rcon.disconnect();
      });
    }, 10 * 1000);
  } else {
    // Do nothing.
  }
}
