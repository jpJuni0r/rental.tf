export default {
  gotoServer({FlowRouter}, id) {
    return FlowRouter.go(`/servers/${id}`);
  },
  newServer({Meteor, Random, FlowRouter}, serverPassword, rconPassword, region) {
    const _id = Random.id();

    const user = Meteor.user();
    const userId = user._id;
    const username = user.profile.name;

    if (!userId) {
      throw new Meteor.Error(403, 'You need to log in first');
    }

    if (user.profile.activeServer) {
      throw new Meteor.Error(403, 'You already have a server running');
    }

    Meteor.call('server.new', _id, username, userId, serverPassword, rconPassword, region);
    FlowRouter.go(`/servers/${_id}`);
  },
  destroyServer({Meteor}, _id) {
    Meteor.call('server.destroy', _id);
  }
};
