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
    let server = Server.find(serverId);

    if (server.fetch()[0] && server.fetch()[0].userId !== this.userId) {
      const fields = {
        status: 1,
        stage: 1,
        region: 1,
        username: 1,
        userId: 1,
        createdAt: 1
      };
      server = Server.find(serverId, {fields});
    }

    return server;
  });
}
