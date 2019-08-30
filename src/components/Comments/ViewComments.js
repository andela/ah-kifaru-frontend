import React from 'react';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';

export const ViewComments = ({ allComments, AvatarIcon }) => (
  <article
    className="mt-3 mb-3 flex w-full border border-gray-400 border-width-2
    justify-between mx-auto p-2"
    key={allComments.id}
    data-testid="allComments_id"
  >
    <div className="w-1/12 flex justify-center mx-2 md:mx-0">
      <AvatarIcon className="w-8 h-8" />
    </div>
    <div className="w-11/12">
      <p className="flex text-danger font-bold">{allComments.user.username}</p>
      <p className="flex text-sm text-gray-600" data-testid="allComments_date">
        {dateFormat(allComments.createdAt, 'mmmm dS, yyyy')}
      </p>
      <p
        data-testid="allComments_content"
        className="text-gray-700 text-justify "
      >
        {allComments.content}
      </p>
    </div>
  </article>
);

ViewComments.propTypes = {
  AvatarIcon: PropTypes.object.isRequired,
  allComments: PropTypes.array.isRequired
};

export default ViewComments;
