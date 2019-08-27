import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchArticlesAction } from '../../store/modules/landingPage/actions/index';

const LandingPage = () => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(12);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticlesAction({ page, limit });
  }, [page]);
};

export const mapDispatchToProps = dispatch => ({
  fetchArticles: ({ page, limit }) =>
    dispatch(fetchArticlesAction({ page, limit }))
});

export default connect(
  null,
  mapDispatchToProps
)(LandingPage);
