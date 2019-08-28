import React from 'react';
import Layout from '@components/Layout';
import PropTypes from 'prop-types';
// import Banner from '../../public/images/banner_default.png';

const SingleArticlePage = ({ title, body, imageUrl,publishedDate, tags, count_rating, username, avatar, avg_rating }) => {
  return (
    <Layout>
      <div className="article-layout">
        <div>Author's card</div>
        <main>
          <h1 className="article-title">{title}</h1>
          <p className="article-desc mt-3">{description}</p>
          <div className="articleTime">
            <p>June 25</p>
            <span />
            <p>5 min read</p>
          </div>
          <img
            src="../../public/images/banner_default.png"
            alt="Article Banner"
            className="mt-3"
          />
          <div className="article-body mt-4">
            
            <div className="tagslist">
              {
                tags.map((tag)=>(<div className="tag">{tag.name}</div>
                ))
              }
            </div>
          </div>
        </main>
        <div>Action Button</div>
      </div>
    </Layout>
  );
};

SingleArticlePage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tags: PropTypes.shape([
    name: PropTypes.string.isRequired
  ]).isRequired
}

export default SingleArticlePage;
