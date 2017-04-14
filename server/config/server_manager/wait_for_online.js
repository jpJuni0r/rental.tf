import {Server} from '/lib/collections';
import webrcon from 'webrcon';

export default function (server, options) {
  const {fake} = options;

  if (!fake) {
    Meteor.setTimeout(() => {
      // Check if still relevant
      const freshServer = Server.findOne({_id: server._id});
      if (freshServer.stage !== 3) {
        return;
      }

      const rcon = new webrcon(server.ip, server.rcon);
      rcon.status().then(res => {
        Server.update(server._id, {$set: {
          status: 'ONLINE',
          stage: 4,
          serverStatus: {
            hostname: res.name,
            map: res.map,
            players: res.players
          }
        }});
      });
    }, 90 * 1000);
  } else {
    Meteor.setTimeout(() => {
      Server.update(server._id, {$set: {
        status: 'ONLINE',
        stage: 4,
        serverStatus: {
          name: 'Rental.TF',
          map: 'cp_badlands',
          players: []
        }
      }});
    }, 4000);
  }
}
