import NewServer from '../components/new_server';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {t} = context();

  const {Form} = t.form;
  const Regions = t.enums({
    eu: 'Frankfurt (Germany)',
    usaSf: 'San Fancisco',
    usaNy: 'New York'
  });

  const FormSchema = t.struct({
    serverPassword: t.Str,
    rconPassword: t.Str,
    region: Regions
  });

  const defaultState = {
    serverPassword: 'joinme',
    rconPassword: 'rental',
    region: 'eu'
  };

  onData(null, {Form, FormSchema, defaultState});
};
export const depsMapper = (context, actions) => ({
  newServer: actions.server.newServer,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewServer);
