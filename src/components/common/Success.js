import React from 'react';
import PropTypes from 'prop-types';

import { SuccessIcon } from '../../assets/icons';

const SuccessContainer = ({ children }) => (
  <div className="flex flex-col items-center justify-center">
    <SuccessIcon className="sm:h-20 sm:w-20 md:h-40 md:w-40" />
    <p className="w-8/12 text-base text-center font-semibold">{children}</p>
  </div>
);

SuccessContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default SuccessContainer;
