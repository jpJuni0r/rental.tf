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
              <th />
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
                <td className="text-center">
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
                </td>
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
