import {Meteor} from 'meteor/meteor';
import {Server} from '/lib/collections';

export default function () {
  Meteor.publish('server.list', function () {
    const fields = {
      status: 1,
      username: 1,
      userId: 1,
      region: 1,
      createdAt: 1
    };

    const server = Server.find({}, {sort: {createdAt: -1}, limit: 20, fields});
    return server;
  });

  Meteor.publish('server.single', function (serverId) {
    const user = Meteor.users.findOne(this.userId);

    let server;
    if (user.isAdmin) {
      server = Server.find(serverId);
    } else {
      server = Server.find({_id: serverId, userId: this.userId});
    }

    return server;
  });
}
