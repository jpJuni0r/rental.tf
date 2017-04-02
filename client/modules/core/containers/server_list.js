import ServerList from '../components/server_list';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  onData(null, {});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(ServerList);
