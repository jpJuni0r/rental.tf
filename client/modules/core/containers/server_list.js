import ServerList from '../components/server_list';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, moment} = context();

  if (Meteor.subscribe('server.list').ready()) {
    let servers = Collections.Server.find().fetch();

    servers = servers.map(server => {
      return {
        ...server,
        createdAt: moment(server.createdAt).format('lll')
      };
    });

    onData(null, {servers});
  }
};

export const depsMapper = (context, actions) => ({
  gotoServer: actions.server.gotoServer,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(ServerList);
