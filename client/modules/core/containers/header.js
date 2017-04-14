import Header from '../components/header';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter} = context();

  const user = Meteor.user();
  const currentRoute = FlowRouter.current().route.name;

  const currentPath = FlowRouter.current().path;

  if (!Meteor.loggingIn() && user) {
    const onOwnServerPage = currentPath === `/servers/${user.profile.activeServer}`;
    return onData(null, {currentRoute, user, onOwnServerPage, loggedIn: true});
  }

  onData(null, {currentRoute, loggedIn: false});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Header);
