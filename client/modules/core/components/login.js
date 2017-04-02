import React from 'react';

const Login = ({loggingIn}) => (
  <section className="container">
    {loggingIn ? (<span>Logging in</span>) : (<span>Redirecting to Steam...</span>)}
  </section>
);

export default Login;
