import React from 'react';

class Server extends React.Component {
  render() {
    const {server, isAdmin} = this.props;

    const needIp = !server.ip ? {className: 'hidden'} : null;
    const ipPlaceholder = server.ip ? {className: 'hidden'} : null;

    return (
      <section className="container server">
        {server.status !== 'DESTROYED' && server.status !== 'TERMINATED' && isAdmin ? (
          <button className="btn btn-danger destroy-server"
            onClick={this._destroyServer.bind(this)}>
            &times;
          </button>
        ) : null}

        <h1>Server</h1>
        {isAdmin ? (
          <p className="text-info">
            Please stop your server maually.
            Otherwise it will timeout after two hours after creation.
          </p>
        ) : null}

        <div className="row">
          <div className="col-md-6">
            {isAdmin ? (
              <div>
                <h3>Details</h3>
                <table className="table table-striped">
                  <tbody>
                    <tr {...needIp}>
                      <th>IP</th>
                      <td>{server.ip}</td>
                    </tr>
                    <tr {...needIp}>
                      <th>connect link</th>
                      <td>
                        <a href={`steam://connect/${server.ip}/${server.password}`}>
                          connect {server.ip}; password {server.password}
                        </a>
                      </td>
                    </tr>
                    <tr {...needIp}>
                      <th>SourceTV link</th>
                      <td>
                        <a href={`steam://connect/${server.ip}:27020/`}>
                          connect {server.ip}:27020
                        </a>
                      </td>
                    </tr>
                    <tr {...needIp}>
                      <th>rcon details</th>
                      <td>rcon_address {server.ip}; rcon_password {server.rcon}</td>
                    </tr>
                    <tr {...ipPlaceholder}>
                      <td colSpan="2">
                        <em>Waiting for IP address...</em>
                      </td>
                    </tr>
                    <tr>
                      <th>Region</th>
                      <td>{server.region.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <th>Created by</th>
                      <td>{server.username}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <p className="text-info">
                  You don't have permission to view further details.
                </p>

                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <th>Region</th>
                      <td>{server.region.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <th>Created by</th>
                      <td>{server.username}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <h3>Status</h3>
            {server.serverStatus ? (
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>Status</th>
                    <td>
                      {(() => {
                        switch (server.stage) {
                          case 1:
                          case 2:
                          case 3:
                            return (
                              <i className="fa fa-spin fa-spinner text-warning" />
                            );
                          case 4:
                            return (
                              <i className="fa fa-check text-success" />
                            );
                          case 11:
                          case 12:
                            return (
                              <i className="fa fa-close" />
                            );
                        }
                      })()}
                      {` ${server.status}`} (Stage {server.stage})
                    </td>
                  </tr>
                  <tr>
                    <th>Hostname</th>
                    <td>{server.serverStatus.hostname}</td>
                  </tr>
                  <tr>
                    <th>Map</th>
                    <td>{server.serverStatus.map}</td>
                  </tr>
                  <tr>
                    <th>Players (incl. Bots)</th>
                    <td>{server.serverStatus.players.length}/24</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>Status</th>
                    <td>
                      {(() => {
                        switch (server.stage) {
                          case 1:
                          case 2:
                          case 3:
                            return (
                              <i className="fa fa-spin fa-spinner text-warning" />
                            );
                          case 4:
                            return (
                              <i className="fa fa-check text-success" />
                            );
                          case 11:
                          case 12:
                            return (
                              <i className="fa fa-close" />
                            );
                        }
                      })()}
                      {` ${server.status}`} (Stage {server.stage})
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    );
  }

  _destroyServer() {
    const {server, destroyServer} = this.props;
    destroyServer(server._id);
  }
}

export default Server;
