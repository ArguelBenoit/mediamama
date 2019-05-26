import React from 'react';
import PropTypes from 'prop-types';

let Error = ({ location }) => {
  return <div>{location.pathname} : 404</div>;
};

Error.propTypes = {
  location: PropTypes.string
};

export default Error;
