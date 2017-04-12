import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Server} from '/lib/collections';
import wrapper from 'do-wrapper';

export default function () {
  Meteor.methods({
    'server.new'(_id, username, userId, password, rcon, region) {
      check([ _id, username, userId, password, rcon, region ], [ String ]);

      const verifiedUser = Meteor.users.findOne(this.userId);

      const server = {
        _id,
        status: 'SETUP',
        username: verifiedUser.profile.name,
        userId: verifiedUser._id,
        password,
        rcon,
        region,
        ip: null,
        droplet: null,
        createdAt: new Date()
      };

      Server.insert(server);
    },
    'server.destroy'(_id) {
      const server = Server.findOne(_id);

      if (!server || this.userId !== server.userId) {
        throw Meteor.Error(403);
      }

      // Cancel server
      const TOKEN = Meteor.settings.DO_KEY;
      const api = new wrapper(TOKEN);

      api.dropletsDelete(server.droplet).then(() => {
        Server.update(_id, {$set: {status: 'DESTROYED'}});
      });
    }
  });
}
