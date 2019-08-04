import React from 'react';
import { Link } from 'react-router-dom';

const CommentNotitification = ({ payload, read }) => {
  const { commenter, title, slug } = payload;
  return (
    <div>
      <span
        className={`${'h-3 w-3 rounded-full inline-block'} ${
          read ? '' : 'bg-green-400'
        }`}
      />
      <Link to={`/${slug}`}>
        <strong>{commenter}</strong>
        commented on
        <strong>{title}</strong>
      </Link>
    </div>
  );
};

export default CommentNotitification;
