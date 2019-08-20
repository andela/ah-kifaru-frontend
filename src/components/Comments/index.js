import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AvatarIcon } from '../../assets/icons';
import {
  getComments,
  postComments
} from '../../store/modules/comments/actions';
import { ViewComments } from './ViewComments';
import { CreateComments } from './CreateComments';

class CommentsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'rest',
      content: '',
      errors: {
        content: ''
      }
    };
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
    const { getComment, articleId } = this.props;
    getComment(articleId);
  }

  handleClear() {
    this.setState({ content: '' });
  }

  handleCommentSubmit(e) {
    e.preventDefault();
    const { articleId, postComment } = this.props;
    const { content } = this.state;

    const errors = {};
    if (!content) errors.content = 'Comment cannot be empty!!!';
    if (Object.keys(errors).length) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...errors
        }
      }));
      return;
    }
    postComment(articleId, { content });
    this.setState({ content: '' });
  }

  handleInputFieldChange(event) {
    const {
      target: { name, value }
    } = event;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: ''
      }
    }));
  }

  render() {
    const {
      status,
      content,
      errors: { content: contentError }
    } = this.state;
    const { isAuthenticated, comments } = this.props;

    return (
      <div className="w-4/6 mx-auto">
        <CreateComments
          handleCommentSubmit={this.handleCommentSubmit}
          handleInputFieldChange={this.handleInputFieldChange}
          content={content}
          isAuthenticated={isAuthenticated}
          contentError={contentError}
          handleClear={this.handleClear}
          comments={comments}
          status={status}
        />

        {comments.map(comment => (
          <ViewComments
            key={comment.id}
            allComments={comment}
            AvatarIcon={AvatarIcon}
          />
        ))}
      </div>
    );
  }
}

CommentsCard.propTypes = {
  getComment: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,
  postComment: PropTypes.func.isRequired,
  articleId: PropTypes.number.isRequired
};
const mapStateToProps = state => ({
  comments: state.commentReducer.comments,
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user
});
const mapDispatchToProps = {
  getComment: getComments,
  postComment: postComments
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsCard);
