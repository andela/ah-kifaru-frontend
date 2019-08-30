import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import SyncLoader from 'react-spinners/FadeLoader';
import { css } from '@emotion/core';

import Layout from '@components/common/Layout';
import { fetchArticlesAction } from '../../store/modules/landingPage/actions/index';
import ArticleCard from '../../components/ArticleCard/index';
import { SearchCard } from '../../components/SearchCard/index';
import './index.css';

const override = css`
  display: block;
  margin: 40% auto;
  border-color: red;
`;

export const LandingPage = ({
  fetchArticles = () => {},
  allArticles = [],
  status = '',
  history
}) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    fetchArticles({ page, limit });
  }, []);

  if (status === 'fetchPending') {
    return (
      <div className="sweet-loading flex" data-testid="pageLoading">
        <SyncLoader
          css={override}
          sizeUnit="em"
          size={3}
          color="#50E3C2"
          loading={status === 'fetchPending'}
        />
      </div>
    );
  }

  return (
    <Layout>
      <div className="w-full">
        <SearchCard history={history} />
        <div className=" w-11/12 mx-auto mt-6">
          <div className="w-full flex flex-wrap justify-between">
            {allArticles.length ? (
              allArticles.map(article => {
                return <ArticleCard key={article.id} article={article} />;
              })
            ) : (
              <span> There are no articles at the moment :( </span>
            )}
          </div>
        </div>
      </div>
      <div className="bottom-card h-64 flex flex-col items-end justify-center pr-12 mt-20 pt-4 lg:mt-48">
        <div className="text-white text-lg md:text-2xl font-extrabold antialiased tracking-wide">
          Your ideas and thoughts are
        </div>
        <div className="text-white text-lg md:text-2xl font-extrabold antialiased tracking-wide">
          worth sharing.
        </div>
        <Link
          to="/new-article"
          className="mt-4 bg-white text-gray-700 px-10 py-4 rounded text-xs cursor-pointer font-bold"
        >
          Start Writing
        </Link>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  allArticles: state.articleReducer.articles,
  status: state.articleReducer.status
});

const mapDispatchToProps = dispatch => ({
  fetchArticles: ({ page, limit }) =>
    dispatch(fetchArticlesAction({ page, limit }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
