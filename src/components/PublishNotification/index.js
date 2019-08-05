import React from 'react';
import { Link } from 'react-router-dom';

const PublishNotification = ({ payload, read }) => {
  const { slug, username, title } = payload;
  return (
    <div>
      <span
        className={`${'h-3 w-3 rounded-full inline-block'} ${
          read ? '' : 'bg-green-400'
        }`}
      />
      <Link to={`/${slug}`}>
        <strong>{username}</strong>
        just published
        <strong>{title}</strong>
      </Link>
    </div>
  );
};

export default PublishNotification;
