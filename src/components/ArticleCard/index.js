import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ArticleCard.scss';
import authImage from '../../assets/images/author-image.png';
import articleImage from '../../assets/images/article-image.png';
import { BookmarkIcon, BookmarkedIcon } from '../../assets/icons';

function ArticleCard(props) {
  const {
    article = {},
    isBookmarked = false,
    showBookmark = true,
    toggleBookmark
  } = props;

  const {
    title = '',
    description = '',
    body = '',
    image = '',
    publishedDate = '',
    readTime = '',
    author,
    tags = []
  } = article;

  const updateBookmarkStatus = event => {
    // TOGGLE BOOKMARK ACTION
    toggleBookmark(article.id, isBookmarked);
  };

  return (
    <article className="card flex md:flex-col mt-2 mb-2 shadow md:shadow">
      <Link to="/articles/:id" className="flex w-2/6 md:w-full">
        <img className="article-image" src={articleImage} alt="author" />
      </Link>
      <div className="flex flex-col flex-grow w-4/6 pl-3 md:pl-0 md:pt-2 md:w-full bg-white">
        <Link to="/articles/:id" className="flex flex-col flex-grow">
          <h3 className="text-base text-overflow-one-line font-bold mb-1 leading-tight">
            {title}
          </h3>
          <p
            className="small-text text-xs text-overflow mb-1 mt-2"
            data-testid="description"
          >
            {!description ? body : description}
          </p>
        </Link>
        <div className="flex text-xs items-center cursor-pointer mt-3 mb-2 px-1">
          <Link to="user/profile" className="flex w-5/6 items-center">
            <img
              className="h-10 w-10"
              src={authImage}
              alt="author"
              data-testid="authorImage"
            />
            <div className="flex flex-col justify-center ml-1">
              <p className="author-name font-extrabold md:text-base text-overflow-one-line">
                {author}
              </p>
              <p className="flex items-center">
                <span
                  className="small-text md:text-xs"
                  aria-label={`published ${publishedDate}`}
                  data-testid="publishedDate"
                >
                  {publishedDate}
                </span>
                &nbsp; &nbsp;
                <span className="dotSeparator text-base" />
                &nbsp; &nbsp;
                <span
                  className="read-time small-text md:text-xs"
                  data-testid="readTime"
                >
                  {readTime}
                </span>
              </p>
            </div>
          </Link>
          {showBookmark ? (
            <button
              type="button"
              className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
            >
              {isBookmarked ? (
                <BookmarkedIcon
                  name="bookmark"
                  aria-label="bookmark"
                  data-testid="bookmarked"
                />
              ) : (
                <BookmarkIcon
                  name="bookmark"
                  aria-label="bookmark"
                  data-testid="not-bookmarked"
                />
              )}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

ArticleCard.defaultProps = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  body: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  publishedDate: PropTypes.number.isRequired,
  readTime: PropTypes.number.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  showBookmark: PropTypes.bool.isRequired
};

ArticleCard.defaultProps = {
  description: ''
};

export default ArticleCard;
