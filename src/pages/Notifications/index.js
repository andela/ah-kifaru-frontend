import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FollowNotification from '../../components/FollowNotification';
import CommentNotification from '../../components/CommentNotification';
import PublishNotification from '../../components/PublishNotification';
import config from '../../config';

const Notifications = () => {
  // const [notifications, setNotifications] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [limit, setLimit] = useState(10);
  const [url, setUrl] = useState(
    `${config.apiUrl}/notifications?page=${currentPage}&limit=${limit}`
  );
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data.data);
      setTotalPages(response.data.metadata.totalPages);
      setCurrentPage(response.data.metadata.currentPage);
      setIsLoading(false);
    } catch (err) {
      return err;
    }
  };

  const changePage = e => {
    const { name } = e.target;
    if (name === 'next' && currentPage === totalPages) {
      setCurrentPage(currentPage + 1);
      return setUrl(`/next?page=${currentPage}$limit=${limit}`);
    }
    if (name === 'previous' && currentPage === 1) {
      setCurrentPage(currentPage - 1);
      return setUrl(`/next?page=${currentPage}$limit=${limit}`);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [url]);

  const allNotifications = notifications => {
    const groupedNotifications = [];
    notifications.forEach(notification => {
      if (notification.payload.type === 'new_follower') {
        groupedNotifications.push(<FollowNotification key={notification.id} />);
      }
      if (notification.payload.type === 'new_comment') {
        groupedNotifications.push(
          <CommentNotification key={notification.id} />
        );
      }
      if (notification.payload.type === 'new_article') {
        groupedNotifications.push(
          <PublishNotification key={notification.id} />
        );
      }
    });
    if (groupedNotifications.length > 0) {
      return groupedNotifications;
    }
    return [<div>You do not have any Notifications at the moment</div>];
  };

  return (
    <main>
      <div>
        {isLoading ? <div>Page is still loading</div> : allNotifications(data)}
      </div>
      <div>
        <input
          type="button"
          name="previous"
          onClick={changePage}
          value="Previous Page"
          className=""
        />
        <input
          type="button"
          name="next"
          onClick={changePage}
          value="Next Page"
          className=""
        />
      </div>
    </main>
  );
};

export default Notifications;
