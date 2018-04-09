import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign In to manage your store's inventory</p>
    <button className="github" onClick={() => props.authenticate('Github')}>Github Login</button>
    <button className="facebook" onClick={() => props.authenticate('Facebook')}>Facebook Login</button>
    <button className="twitter" onClick={() => props.authenticate('Twitter')}>Twitter Login</button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default Login;

