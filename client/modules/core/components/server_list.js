import React from 'react';

class ServerList extends React.Component {
  render() {
    const {servers} = this.props;
    return (
      <section className="container">
        <h2>Serverlist</h2>

        <h3>Recent Servers</h3>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Status</th>
              <th>User</th>
              <th>Region</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {servers.map(server => (
              <tr key={server._id} onClick={this._gotoServer.bind(this, server._id)}
                className="pointer">
                <td>{server.status}</td>
                <td>
                  <a href={`/profile/${server.userId}`}>{server.username}</a>
                </td>
                <td>{server.region.toUpperCase()}</td>
                <td>{server.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }

  _gotoServer(id) {
    const {gotoServer} = this.props;
    gotoServer(id);
  }
}

export default ServerList;
