import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
const Logout = (
  <div>Logging out...</div>
);

export const composer = ({context}) => {
  const {Meteor, FlowRouter} = context();

  Meteor.logout(() => {
    FlowRouter.go('/');
  });
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Logout);
