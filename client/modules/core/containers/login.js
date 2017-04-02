import Login from '../components/login';

import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, login}, onData) => {
  const {Meteor, FlowRouter} = context();

  if (Meteor.loggingIn()) {
    onData(null, {loggingIn: true});
  } else if (Meteor.userId()) {
    FlowRouter.go('/');
  } else {
    onData(null, {loggingIn: false});
    Meteor.loginWithSteam();
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Login);
