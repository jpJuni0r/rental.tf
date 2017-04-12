import React from 'react';
import {mount} from 'react-mounter';

import MainLayout from './components/main_layout';
import ServerList from './containers/server_list';
import Server from './containers/server';
import NewServer from './containers/new_server';
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

  FlowRouter.route('/new', {
    name: 'server.new',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewServer />)
      });
    }
  });

  FlowRouter.route('/servers/:serverId', {
    name: 'server.view',
    action({serverId}) {
      mount(MainLayoutCtx, {
        content: () => (<Server serverId={serverId} />)
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
