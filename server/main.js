import serverWatcher from './config/server_watcher';
import startup from './config/startup';
import hooks from './config/hooks';
import methods from './methods';
import publications from './publications';

serverWatcher();
startup();
hooks();
methods();
publications();
