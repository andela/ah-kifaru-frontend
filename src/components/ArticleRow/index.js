import React from 'react';

const ArtricleRow = ({ props }) => {
  const { props: component } = props;
  return (
    <div
      className="w-full flex flex-col items-center
      lg:flex-row lg:h-80 lg:justify-between"
    >
      {component[0] || ''}
      {component[0] || ''}
      {component[0] || ''}
    </div>
  );
};

export default ArtricleRow;
