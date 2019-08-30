import React, { PureComponent } from 'react';
import Layout from '@components/common/Layout';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticle } from '@modules/articles/actions';
import convertFromJSON from '@utils/convertFromJson';
import PulseLoader from 'react-spinners/PulseLoader';
import { prettifyDate, calculateReadTime } from '@utils';
import ReactHtmlParser from 'react-html-parser';
import CommentsCard from '@components/Comments';
import Background from '../../assets/images/comment_bg.svg';

class SingleArticlePage extends PureComponent {
  componentDidMount() {
    const { match, getArticle } = this.props;
    const { params } = match;
    getArticle(params.articleId);
  }

  getArticleBody = body => {
    if (!body) {
      return;
    }
    return convertFromJSON(JSON.parse(body));
  };

  render() {
    const {
      isLoading,
      isSuccess,
      article,
      match: {
        params: { articleId }
      }
    } = this.props;
    const {
      title,
      image: ImageUrl,
      description,
      body,
      publishedDate,
      tags = ['', ''],
      username,
      avatar,
      avg_rating,
      count_rating
    } = article;

    const rawBody = this.getArticleBody(body);
    const user = {
      username,
      avatar,
      id: 2
    };
    return (
      <Layout>
        <PulseLoader sizeUnit="em" size={0.6} color="red" loading={isLoading} />
        {isSuccess && (
          <div className="">
            <div className="article-layout">
              <div className="l-content"></div>
              <article className="maincontent">
                <h1 className="article-title">{title}</h1>
                <p className="article-desc mt-3">{description}</p>
                <div className="articleTime">
                  <p data-testid="publish-date">
                    {publishedDate ? prettifyDate(publishedDate) : 'Draft'}
                  </p>
                  <span />
                  <p>{calculateReadTime(body)}</p>
                </div>
                <img
                  src={ImageUrl}
                  alt="Article Banner"
                  className="mt-3"
                  data-testid="banner"
                />
                <div className="article-body mt-4">
                  <div className="text-lg body">{ReactHtmlParser(rawBody)}</div>
                  <section
                    aria-label="tags"
                    className="tagslist"
                    data-testid="tags"
                  >
                    {tags.map(name => (
                      <div className="tag" key={name}>
                        {name}
                      </div>
                    ))}
                  </section>
                </div>
              </article>
              <div className="r-content flex flex-col items-center mt-5"></div>
            </div>
            <section className="comment-layout bg-repeat bg-center">
              <CommentsCard articleId={articleId} />
            </section>
          </div>
        )}
      </Layout>
    );
  }
}

SingleArticlePage.defaultProps = {
  article: {
    title: '',
    description: '',
    body: '',
    image: '',
    publishedDate: null,
    tags: [''],
    username: '',
    avatar: '',
    avg_rating: '',
    count_rating: ''
  },
  isSuccess: false
};

SingleArticlePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    image: PropTypes.string,
    publishedDate: PropTypes.any,
    tags: PropTypes.array,
    username: PropTypes.string,
    avatar: PropTypes.string,
    avg_rating: PropTypes.string,
    count_rating: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      articleId: PropTypes.string
    }).isRequired
  }).isRequired,
  getArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.singleArticleReducer.isPending,
  isSuccess: state.singleArticleReducer.isSuccess,
  article: state.singleArticleReducer.article
});

const mapDispatchToProps = dispatch => ({
  getArticle: id => dispatch(fetchArticle(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleArticlePage);
