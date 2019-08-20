import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { AvatarIcon } from '../../assets/icons';
import { isFollower } from '@utils'
import './authorcard.css';

const AuthorCard = ({ user: { avatar, username, id }, followers}) => {

  if (!followers) {
    
  }
        
  //const showFollow = isFollower(followers, id);
  return (
    <div className="flex flex-col items-center mt-5">
      <Link
        to={`/profile/${id}`}
        className="my-3 text-lg text-danger font-semibold flex flex-col items-center"
      >
        {avatar ? (
          <img
            href={avatar}
            alt="author avatar"
            className="w-8 h-8 rounded-full mt-3"
          />
        ) : (
          <AvatarIcon className="w-14 h-14 rounded-full mt-3" />
        )}
        @
        {username}
      </Link>
      <button
        type="button"
        className="bg-primary text-white py-3 px-10 rounded text-sm font-medium"
        // onClick={() => onFollow(id)}
      >
        FOLLOW
      </button>
    </div>
  );
};

AuthorCard.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired,
};

const mapStateToProps = (state)=> {
  followers: state.authReducer.followers
}
const mapDispatchToProps = (dispatch)=> {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorCard);
