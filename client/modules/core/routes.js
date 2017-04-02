import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout';
import ServerList from './containers/server_list';
import Login from './containers/login';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'server.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<ServerList />)
      });
    }
  });

  FlowRouter.route('/login', {
    name: 'login',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Login />)
      });
    }
  });
}
