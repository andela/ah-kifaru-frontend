import React, { PureComponent } from 'react';
import Layout from '@components/common/Layout';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthorCard from '@components/AuthorCard'
import { fetchArticle } from '@modules/articles/actions';
import convertFromJSON from '@utils/convertFromJson';
import PulseLoader from 'react-spinners/PulseLoader';
import { prettifyDate, calculateReadTime } from '@utils';
import ReactHtmlParser from 'react-html-parser';
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
    const { isLoading, isSuccess, article } = this.props;
    const {
      title,
      image: ImageUrl,
      description,
      body,
      publishedDate,
      tags = ['', ''],
      username,
      avatar,
      authorId,
      avg_rating,
      count_rating,
    } = article;

    const rawBody = this.getArticleBody(body);
    const user = {
      username,
      avatar,
      id: authorId
    };
    return (
      <Layout>
        <PulseLoader sizeUnit="em" size={0.6} color="red" loading={isLoading} />
        {isSuccess && (
          <div className="article-layout">
            <div className="l-content ">
              <AuthorCard user={user}/>
            </div>
            <div className="maincontent">
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
                <div className="tagslist" data-testid="tags">
                  {tags.map(name => (
                    <div
                      className="tag"
                      key={name}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="r-content flex flex-col items-center mt-5"></div>
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
  }
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
  isLoading: state.articleReducer.isPending,
  isSuccess: state.articleReducer.isSuccess,
  article: state.articleReducer.article
});

const mapDispatchToProps = dispatch => ({
  getArticle: id => dispatch(fetchArticle(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleArticlePage);
