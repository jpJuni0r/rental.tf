import React from 'react';

class NewServer extends React.Component {
  render() {
    const {Form, FormSchema, defaultState, user, serverActive} = this.props;
    const disableForm = !user || serverActive;

    return (
      <section className="container">
        <h1>New Server</h1>
        <p>
          It takes about two minutes for a new server to start
        </p>
        {!user ? (
          <p className="text-danger">
            You need to log in first!
          </p>
        ) : null}
        {serverActive ? (
          <p className="text-danger">
            You already have a server running!
          </p>
        ) : null}
        <form onSubmit={this._submit.bind(this)}>
          <Form ref="form" type={FormSchema} value={defaultState} ref="form" />
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={disableForm}>Submit</button>
          </div>
        </form>
      </section>
    );
  }

  _submit(e) {
    e.preventDefault();

    const {newServer} = this.props;
    const props = this.refs.form.getValue();

    const {serverPassword, rconPassword, region} = props;
    newServer(serverPassword, rconPassword, region);
  }
}

export default NewServer;
