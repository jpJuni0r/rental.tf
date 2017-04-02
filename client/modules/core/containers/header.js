import Header from '../components/header';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, FlowRouter} = context();

  const currentRoute = FlowRouter.current().route.name;
  const user = Meteor.user();

  if (!Meteor.loggingIn() && user) {
    return onData(null, {currentRoute, user, loggedIn: true});
  }

  onData(null, {currentRoute, loggedIn: false});
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Header);
