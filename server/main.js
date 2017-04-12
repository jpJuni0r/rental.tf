import serverManager from './config/server_manager';
import startup from './config/startup';
import hooks from './config/hooks';
import methods from './methods';
import publications from './publications';

serverManager();
startup();
hooks();
methods();
publications();
