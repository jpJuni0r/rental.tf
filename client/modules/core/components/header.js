import React from 'react';

class Header extends React.Component {
  render() {
    const {currentRoute, user, loggedIn, onOwnServerPage} = this.props;
    return (
      <header>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a href="/" className="navbar-brand">Rental.tf</a>
            </div>

            <div className="navbar-collapse">
              <ul className="nav navbar-nav">
                <li className={currentRoute === 'server.list' ? 'active' : null}>
                  <a href="/">Home</a>
                </li>
                <li className={currentRoute === 'server.new' ? 'active' : null}>
                  <a href="/new">New Server</a>
                </li>
                <li className={currentRoute === 'about' ? 'active' : null}>
                  <a href="/about">About</a>
                </li>
              </ul>

              {loggedIn ? (
                <ul className="nav navbar-nav pull-right">
                  {user.profile.activeServer ? (
                    <li className={onOwnServerPage ? 'active' : null}>
                      <a href={`/servers/${user.profile.activeServer}`}>Server running&nbsp;
                        <i className="glyphicon glyphicon-refresh gly-spin"></i>
                      </a>
                    </li>
                  ) : null}
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                      {user.profile.name} <span className="caret" />
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="/logout">Logout</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              ) : (
                <ul className="nav navbar-nav pull-right">
                  <li>
                    <a href="/login">Login with Steam</a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
