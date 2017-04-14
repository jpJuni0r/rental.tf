import React from 'react';

class Server extends React.Component {
  render() {
    const {server, isAdmin} = this.props;
    return (
      <section className="container server">
        {server.status !== 'DESTROYED' && server.status !== 'TERMINATED' && isAdmin ? (
          <button className="btn btn-danger destroy-server"
            onClick={this._destroyServer.bind(this)}>
            &times;
          </button>
        ) : null}
        <h1>Server <code>{server.status}</code></h1>
        {isAdmin ? (
          <div>
            <p className="text-info">
              Please stop your server maually.
              Otherwise it will timeout after two hours after creation.
            </p>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>IP</th>
                  <td>{server.ip}</td>
                </tr>
                <tr>
                  <th>connect link</th>
                  <td>
                    <a href={`steam://connect/${server.ip}/${server.password}`}>
                      connect {server.ip}; password {server.password}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>SourceTV link</th>
                  <td>
                    <a href={`steam://connect/${server.ip}:27020/`}>
                      connect {server.ip}:27020
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>rcon details</th>
                  <td>rcon_address {server.ip}; rcon_password {server.rcon}</td>
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
                  <th>{server.region.toUpperCase()}</th>
                </tr>
                <tr>
                  <th>Created by</th>
                  <td>{server.username}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    );
  }

  _destroyServer() {
    const {server, destroyServer} = this.props;
    destroyServer(server._id);
  }
}

export default Server;
