import React from 'react';

class ServerList extends React.Component {
  render() {
    const {servers} = this.props;
    return (
      <section className="container">
        <h2>Recent Servers</h2>

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
            {servers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  <em>
                    No servers were created, yet. Go ahead and <a href="/new">create</a> one!
                  </em>
                </td>
              </tr>
            ) : null}
            {servers.map(server => (
              <tr key={server._id} onClick={this._gotoServer.bind(this, server._id)}
                className="pointer">
                <td>{server.status}</td>
                <td>
                  {server.username}
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
