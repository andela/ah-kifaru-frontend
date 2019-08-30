import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SyncLoader from 'react-spinners/FadeLoader';
import { css } from '@emotion/core';

import Layout from '@components/common/Layout';
import { searchAction } from '../../store/modules/search/actions/index';
import ArticleCard from '../../components/ArticleCard/index';
import SearchPageCard from '../../components/SearchPageCard/index';
import './index.css';

const override = css`
  display: block;
  margin: 40% auto;
  border-color: red;
`;

export const LandingPage = ({
  searchAction = () => {},
  allArticles = [],
  status = ''
}) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    searchAction({ page, limit });
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
        <SearchPageCard searchAction={searchAction} />
        <div className=" w-11/12 mx-auto mt-6">
          <div className="w-full flex flex-wrap justify-between">
            {allArticles.length ? (
              allArticles.map(article => {
                return <ArticleCard key={article.id} article={article} />;
              })
            ) : (
              <span className="mx-auto">
                {' '}
                There are no articles that match this at the moment :({' '}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="bottom-card h-64 flex flex-col items-end justify-center pr-12 mt-20 lg:mt-48">
        <div className="text-white text-lg font-bold antialiased tracking-wide">
          Your ideas and thoughts are
        </div>
        <div className="text-white text-lg font-bold antialiased tracking-wide">
          worth sharing.
        </div>
        <Link
          to="/"
          className="mt-4 bg-white text-gray-700 px-6 py-2 rounded text-xs cursor-pointer"
        >
          Start Writing
        </Link>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  allArticles: state.searchReducer.result,
  status: state.searchReducer.searchStatus
});

const mapDispatchToProps = dispatch => ({
  searchAction: ({ searchParameter, history }) =>
    dispatch(searchAction({ searchParameter, history }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
