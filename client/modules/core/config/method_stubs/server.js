export default function ({Meteor, Collections, check}) {
  Meteor.methods({
    'server.new'(_id, username, userId, password, rcon, region) {
      check([ _id, username, userId, password, rcon, region ], [ String ]);

      const server = {
        _id,
        status: 'SETUP',
        username,
        userId,
        password,
        rcon,
        region,
        ip: null,
        droplet: null,
        createdAt: new Date()
      };

      Collections.Server.insert(server);
      Meteor.users.update(this.userId, {$set: {'profile.activeServer': _id}});
    },
    'server.destroy'() {
      Meteor.users.update(this.userId, {$set: {'profile.activeServer': false}});
    }
  });
}
