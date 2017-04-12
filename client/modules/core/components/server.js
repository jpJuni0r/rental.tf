import React from 'react';

class Server extends React.Component {
  render() {
    const {server} = this.props;
    return (
      <section className="container server">
        {server.status !== 'DESTROYED' ? (
          <button className="btn btn-danger destroy-server"
            onClick={this._destroyServer.bind(this)}>
            &times;
          </button>
        ) : null}
        <h1>Server <code>{server.status}</code></h1>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>IP</th>
              <td>{String(server.ip)}</td>
            </tr>
            <tr>
              <th>Droplet</th>
              <td>{server.droplet}</td>
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
          </tbody>
        </table>
      </section>
    );
  }

  _destroyServer() {
    const {server, destroyServer} = this.props;
    destroyServer(server._id);
  }
}

export default Server;
