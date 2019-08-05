import React from 'react';
import { Link } from 'react-router-dom';

const FollowNotification = ({ payload, read }) => {
  const { follower } = payload;
  return (
    <div className="">
      <span
        className={`${'h-3 w-3 rounded-full inline-block'} ${
          read ? '' : 'bg-green-400'
        }`}
      />
      <Link to="/">
        {/* tell group we need userId here but we keep g
        etting usernem, shold we just make this an onclick event instead? */}
        <strong>{follower}</strong>
        started following you
      </Link>
    </div>
  );
};

export default FollowNotification;
