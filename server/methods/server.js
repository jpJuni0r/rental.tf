import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Server} from '/lib/collections';
import wrapper from 'do-wrapper';

export default function () {
  Meteor.methods({
    'server.new'(_id, username, userId, password, rcon, region) {
      check([ _id, username, userId, password, rcon, region ], [ String ]);

      const verifiedUser = Meteor.users.findOne(this.userId);

      if (!verifiedUser || verifiedUser.profile.serverActive) {
        throw new Meteor.Error(403);
      }

      const server = {
        _id,
        stage: 1,
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
      Meteor.users.update(this.userId, {$set: {'profile.activeServer': _id}});
    },
    'server.destroy'(_id) {
      const server = Server.findOne(_id);

      if (!server || this.userId !== server.userId) {
        throw new Meteor.Error(403);
      }

      // Check against server status
      const {status} = server;
      if (status === 'DESTROYED' || status === 'TIMEOUT') {
        throw new Meteor.Error(403);
      }

      // Cancel server
      const TOKEN = Meteor.settings.DO_KEY;
      const api = new wrapper(TOKEN);

      if (!Meteor.settings.DISABLE_RENTING) {
        api.dropletsDelete(server.droplet).then(() => {
          Server.update(_id, {$set: {status: 'DESTROYED', stage: 11}});
          Meteor.users.update(this.userId, {$set: {
            'profile.activeServer': null,
            serverTimeout: null
          }});
        });
      } else {
        Server.update(_id, {$set: {status: 'DESTROYED'}});
        Meteor.users.update(this.userId, {$set: {'profile.activeServer': null}});
      }

    }
  });
}
