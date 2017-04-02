import React from 'react';

class Header extends React.Component {
  render() {
    const {currentRoute, user, loggedIn} = this.props;
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
              </ul>

              {loggedIn ? (
                <ul className="nav navbar-nav pull-right">
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                      {user.profile.name} <span className="caret" />
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href={`/profile/${user.profile.id}`}>Profile </a>
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
