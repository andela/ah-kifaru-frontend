import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ArticleCard.scss';
import authImage from '../../assets/images/author-image.png';
import articleImage from '../../assets/images/article-image.png';
import { BookmarkIcon, BookmarkedIcon } from '../../assets/icons';

function ArticleCard(props) {
  const {
    title,
    description,
    body,
    image,
    publishedDate,
    readTime,
    author,
    tag,
    isBookmarked = false,
    showBookmark = true
  } = props;

  return (
    <main className="main flex justify-center items-center overflow-y-auto pb-6">
      <div className="card flex md:flex-col mt-2 mb-2">
        <Link to="/articles/:id" className="flex w-2/6 md:w-full">
          <img className="article-image" src={articleImage} alt="author" />
        </Link>
        <div className="w-4/6 pl-3 pr-1 md:p-2 md:w-full">
          <Link to="/articles/:id">
            <h1 className="text-xs text-overflow-one-line font-bold mb-1 leading-tight">
              {title}
            </h1>
            <p className="description-body small-text text-overflow mb-1">
              {!description ? body : description}
            </p>
          </Link>
          <div className="flex text-xs items-center cursor-pointer">
            <Link to="user/profile" className="flex w-5/6 items-center">
              <img
                className="author-image h-8 w-8"
                src={authImage}
                alt="author"
              />
              <div className="flex flex-col justify-center ml-2">
                <p className="author-name">{author}</p>
                <p className="small-text">
                  <span className="create-date">{publishedDate}</span>
                  &nbsp; &nbsp;
                  <span className="dotSeparator" />
                  &nbsp; &nbsp;
                  <span className="read-time">{readTime}</span>
                </p>
              </div>
            </Link>
            {showBookmark ? (
              <button
                type="button"
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
              >
                {isBookmarked ? (
                  <BookmarkedIcon className="bookmarked" />
                ) : (
                  <BookmarkIcon className="not-bookmarked" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="card flex md:flex-col mt-2 mb-2">
        <Link to="/articles/:id" className="flex w-2/6 md:w-full">
          <img className="article-image" src={articleImage} alt="author" />
        </Link>
        <div className="w-4/6 pl-3 pr-1 md:p-2 md:w-full">
          <Link to="/articles/:id">
            <h1 className="text-xs text-overflow-one-line font-bold mb-1 leading-tight">
              {title}
            </h1>
            <p className="description-body small-text text-overflow mb-1">
              {!description ? body : description}
            </p>
          </Link>
          <div className="flex text-xs items-center cursor-pointer">
            <Link to="user/profile" className="flex w-5/6 items-center">
              <img
                className="author-image h-8 w-8"
                src={authImage}
                alt="author"
              />
              <div className="flex flex-col justify-center ml-2">
                <p className="author-name">{author}</p>
                <p className="small-text">
                  <span className="create-date">{publishedDate}</span>
                  &nbsp; &nbsp;
                  <span className="dotSeparator" />
                  &nbsp; &nbsp;
                  <span className="read-time">{readTime}</span>
                </p>
              </div>
            </Link>
            {showBookmark ? (
              <button
                type="button"
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
              >
                {isBookmarked ? (
                  <BookmarkedIcon className="bookmarked" />
                ) : (
                  <BookmarkIcon className="not-bookmarked" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="card flex md:flex-col mt-2 mb-2">
        <Link to="/articles/:id" className="flex w-2/6 md:w-full">
          <img className="article-image" src={articleImage} alt="author" />
        </Link>
        <div className="w-4/6 pl-3 pr-1 md:p-2 md:w-full">
          <Link to="/articles/:id">
            <h1 className="text-xs text-overflow-one-line font-bold mb-1 leading-tight">
              {title}
            </h1>
            <p className="description-body small-text text-overflow mb-1">
              {!description ? body : description}
            </p>
          </Link>
          <div className="flex text-xs items-center cursor-pointer">
            <Link to="user/profile" className="flex w-5/6 items-center">
              <img
                className="author-image h-8 w-8"
                src={authImage}
                alt="author"
              />
              <div className="flex flex-col justify-center ml-2">
                <p className="author-name">{author}</p>
                <p className="small-text">
                  <span className="create-date">{publishedDate}</span>
                  &nbsp; &nbsp;
                  <span className="dotSeparator" />
                  &nbsp; &nbsp;
                  <span className="read-time">{readTime}</span>
                </p>
              </div>
            </Link>
            {showBookmark ? (
              <button
                type="button"
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
              >
                {isBookmarked ? (
                  <BookmarkedIcon className="bookmarked" />
                ) : (
                  <BookmarkIcon className="not-bookmarked" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="card flex md:flex-col mt-2 mb-2">
        <Link to="/articles/:id" className="flex w-2/6 md:w-full">
          <img className="article-image" src={articleImage} alt="author" />
        </Link>
        <div className="w-4/6 pl-3 pr-1 md:p-2 md:w-full">
          <Link to="/articles/:id">
            <h1 className="text-xs text-overflow-one-line font-bold mb-1 leading-tight">
              {title}
            </h1>
            <p className="description-body small-text text-overflow mb-1">
              {!description ? body : description}
            </p>
          </Link>
          <div className="flex text-xs items-center cursor-pointer">
            <Link to="user/profile" className="flex w-5/6 items-center">
              <img
                className="author-image h-8 w-8"
                src={authImage}
                alt="author"
              />
              <div className="flex flex-col justify-center ml-2">
                <p className="author-name">{author}</p>
                <p className="small-text">
                  <span className="create-date">{publishedDate}</span>
                  &nbsp; &nbsp;
                  <span className="dotSeparator" />
                  &nbsp; &nbsp;
                  <span className="read-time">{readTime}</span>
                </p>
              </div>
            </Link>
            {showBookmark ? (
              <button
                type="button"
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
              >
                {isBookmarked ? (
                  <BookmarkedIcon className="bookmarked" />
                ) : (
                  <BookmarkIcon className="not-bookmarked" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="card flex md:flex-col mt-2 mb-2">
        <Link to="/articles/:id" className="flex w-2/6 md:w-full">
          <img className="article-image" src={articleImage} alt="author" />
        </Link>
        <div className="w-4/6 pl-3 pr-1 md:p-2 md:w-full">
          <Link to="/articles/:id">
            <h1 className="text-xs text-overflow-one-line font-bold mb-1 leading-tight">
              {title}
            </h1>
            <p className="description-body small-text text-overflow mb-1">
              {!description ? body : description}
            </p>
          </Link>
          <div className="flex text-xs items-center cursor-pointer">
            <Link to="user/profile" className="flex w-5/6 items-center">
              <img
                className="author-image h-8 w-8"
                src={authImage}
                alt="author"
              />
              <div className="flex flex-col justify-center ml-2">
                <p className="author-name">{author}</p>
                <p className="small-text">
                  <span className="create-date">{publishedDate}</span>
                  &nbsp; &nbsp;
                  <span className="dotSeparator" />
                  &nbsp; &nbsp;
                  <span className="read-time">{readTime}</span>
                </p>
              </div>
            </Link>
            {showBookmark ? (
              <button
                type="button"
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
              >
                {isBookmarked ? (
                  <BookmarkedIcon className="bookmarked" />
                ) : (
                  <BookmarkIcon className="not-bookmarked" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="card flex md:flex-col mt-2 mb-2">
        <Link to="/articles/:id" className="flex w-2/6 md:w-full">
          <img className="article-image" src={articleImage} alt="author" />
        </Link>
        <div className="w-4/6 pl-3 pr-1 md:p-2 md:w-full">
          <Link to="/articles/:id">
            <h1 className="text-xs text-overflow-one-line font-bold mb-1 leading-tight">
              {title}
            </h1>
            <p className="description-body small-text text-overflow mb-1">
              {!description ? body : description}
            </p>
          </Link>
          <div className="flex text-xs items-center cursor-pointer">
            <Link to="user/profile" className="flex w-5/6 items-center">
              <img
                className="author-image h-8 w-8"
                src={authImage}
                alt="author"
              />
              <div className="flex flex-col justify-center ml-2">
                <p className="author-name">{author}</p>
                <p className="small-text">
                  <span className="create-date">{publishedDate}</span>
                  &nbsp; &nbsp;
                  <span className="dotSeparator" />
                  &nbsp; &nbsp;
                  <span className="read-time">{readTime}</span>
                </p>
              </div>
            </Link>
            {showBookmark ? (
              <button
                type="button"
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
              >
                {isBookmarked ? (
                  <BookmarkedIcon className="bookmarked" />
                ) : (
                  <BookmarkIcon className="not-bookmarked" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="card flex md:flex-col mt-2 mb-2">
        <Link to="/articles/:id" className="flex w-2/6 md:w-full">
          <img className="article-image" src={articleImage} alt="author" />
        </Link>
        <div className="w-4/6 pl-3 pr-1 md:p-2 md:w-full">
          <Link to="/articles/:id">
            <h1 className="text-xs text-overflow-one-line font-bold mb-1 leading-tight">
              {title}
            </h1>
            <p className="description-body small-text text-overflow mb-1">
              {!description ? body : description}
            </p>
          </Link>
          <div className="flex text-xs items-center cursor-pointer">
            <Link to="user/profile" className="flex w-5/6 items-center">
              <img
                className="author-image h-8 w-8"
                src={authImage}
                alt="author"
              />
              <div className="flex flex-col justify-center ml-2">
                <p className="author-name">{author}</p>
                <p className="small-text">
                  <span className="create-date">{publishedDate}</span>
                  &nbsp; &nbsp;
                  <span className="dotSeparator" />
                  &nbsp; &nbsp;
                  <span className="read-time">{readTime}</span>
                </p>
              </div>
            </Link>
            {showBookmark ? (
              <button
                type="button"
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
              >
                {isBookmarked ? (
                  <BookmarkedIcon className="bookmarked" />
                ) : (
                  <BookmarkIcon className="not-bookmarked" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="card flex md:flex-col mt-2 mb-2">
        <Link to="/articles/:id" className="flex w-2/6 md:w-full">
          <img className="article-image" src={articleImage} alt="author" />
        </Link>
        <div className="w-4/6 pl-3 pr-1 md:p-2 md:w-full">
          <Link to="/articles/:id">
            <h1 className="text-xs text-overflow-one-line font-bold mb-1 leading-tight">
              {title}
            </h1>
            <p className="description-body small-text text-overflow mb-1">
              {!description ? body : description}
            </p>
          </Link>
          <div className="flex text-xs items-center cursor-pointer">
            <Link to="user/profile" className="flex w-5/6 items-center">
              <img
                className="author-image h-8 w-8"
                src={authImage}
                alt="author"
              />
              <div className="flex flex-col justify-center ml-2">
                <p className="author-name">{author}</p>
                <p className="small-text">
                  <span className="create-date">{publishedDate}</span>
                  &nbsp; &nbsp;
                  <span className="dotSeparator" />
                  &nbsp; &nbsp;
                  <span className="read-time">{readTime}</span>
                </p>
              </div>
            </Link>
            {showBookmark ? (
              <button
                type="button"
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
              >
                {isBookmarked ? (
                  <BookmarkedIcon className="bookmarked" />
                ) : (
                  <BookmarkIcon className="not-bookmarked" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="card flex md:flex-col mt-2 mb-2">
        <Link to="/articles/:id" className="flex w-2/6 md:w-full">
          <img className="article-image" src={articleImage} alt="author" />
        </Link>
        <div className="w-4/6 pl-3 pr-1 md:p-2 md:w-full">
          <Link to="/articles/:id">
            <h1 className="text-xs text-overflow-one-line font-bold mb-1 leading-tight">
              {title}
            </h1>
            <p className="description-body small-text text-overflow mb-1">
              {!description ? body : description}
            </p>
          </Link>
          <div className="flex text-xs items-center cursor-pointer">
            <Link to="user/profile" className="flex w-5/6 items-center">
              <img
                className="author-image h-8 w-8"
                src={authImage}
                alt="author"
              />
              <div className="flex flex-col justify-center ml-2">
                <p className="author-name">{author}</p>
                <p className="small-text">
                  <span className="create-date">{publishedDate}</span>
                  &nbsp; &nbsp;
                  <span className="dotSeparator" />
                  &nbsp; &nbsp;
                  <span className="read-time">{readTime}</span>
                </p>
              </div>
            </Link>
            {showBookmark ? (
              <button
                type="button"
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
              >
                {isBookmarked ? (
                  <BookmarkedIcon className="bookmarked" />
                ) : (
                  <BookmarkIcon className="not-bookmarked" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </main>
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
