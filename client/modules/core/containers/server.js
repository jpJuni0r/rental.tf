import Server from '../components/server';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, serverId}, onData) => {
  const {Meteor, Collections, moment} = context();

  if (Meteor.subscribe('server.single', serverId).ready()) {
    let server = Collections.Server.findOne(serverId);
    server.createdAt = moment(server.createdAt).format('lll');

    const isAdmin = Meteor.userId() === server.userId;

    onData(null, {server, isAdmin});
  } else {
    let server = Collections.Server.findOne(serverId);

    if (server) {
      server.createdAt = moment(server.createdAt).format('lll');
      const isAdmin = Meteor.userId() === server.userId;
      onData(null, {server, isAdmin});
    } else {
      onData();
    }
  }
};

export const depsMapper = (context, actions) => ({
  destroyServer: actions.server.destroyServer,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Server);
