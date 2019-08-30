import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { getProfile } from '@modules/profile/actions';
import Layout from '@components/common/Layout';
import ArticleCard from '@components/ArticleCard';

const mapToProps = state => ({
  userId: state.authReducer.user.id,
  profile: state.profileReducer.profile,
  error: state.profileReducer.error,
  follower: state.profileReducer.followers,
  followee: state.profileReducer.followee,
  articles: state.profileReducer.articles
});

const mapToDispatch = {
  getProfile
};

const Profile = ({
  articles,
  follower,
  followee,
  profile,
  getProfile: getUserProfile,
  match,
  userId
}) => {
  const { params: id } = match;

  if (profile === null) {
    if (id) {
      getUserProfile(parseInt(id.id, 10));
    }
  }

  const fillArticle = () =>
    articles.map(article => {
      if (article.author !== userId) {
        return <ArticleCard article={article} showBookmark={false} />;
      }
    });

  return profile !== null ? (
    <Layout>
      <h1>Profile page</h1>
      <article className="flex w-full md:w-4/5 m-auto pb-5">
        <div className="flex flex-col justify-center items-center w-2/5 md:w-1/5 md:px-8 md:py-8">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="rounded-full w-16 h-16"
          />
        </div>
        <div className="flex flex-col w-3/5 md:w-4/5">
          <h1 className="px-2 py:2 md:py-4 font-bold text-xl">
            {profile.username}
          </h1>
          {!profile.bio ? null : <div className="px-2 py-2">{profile.bio}</div>}
          <div className="mt-4">
            <span className="rounded py-3 px-3 mr-3">{`${follower.length} followers`}</span>
            <span className="rounded py-3 px-3">{`${followee.length} followed`}</span>
          </div>
        </div>
      </article>
      <article>
        <Tabs>
          <TabList className="flex m-auto text-center pt-5 justify-center border-solid border-b border-gray-400">
            <Tab
              className="btnt py-3 px-4 mx-2 cursor-pointer border-b-blue-200 tab"
              style={{ borderBottom: '3px solid blue' }}
            >
              Articles
            </Tab>
            <Tab className="btnt py-3 px-4 mx-2 cursor-pointer border-b-blue-200 tab">
              Custom Tab 2
            </Tab>
          </TabList>
          <TabPanel className="flex w-full px-4 md:w-4/5 md:m-auto">
            <div className="flex justify-around flex-wrap py-8">
              {fillArticle()}
            </div>
          </TabPanel>
          <TabPanel>Panel 2</TabPanel>
        </Tabs>
      </article>
    </Layout>
  ) : null;
};
Profile.defaultProps = {
  profile: null,
  follower: [],
  followee: [],
  articles: []
};
Profile.propTypes = {
  profile: PropType.shape({
    id: PropType.number,
    bio: PropType.string,
    username: PropType.string,
    avatar: PropType.string
  }),
  match: PropType.shape({
    params: PropType.shape({
      id: PropType.string.isRequired
    })
  }).isRequired,
  follower: PropType.array,
  followee: PropType.array,
  articles: PropType.array,
  getProfile: PropType.func.isRequired
};
export default connect(
  mapToProps,
  mapToDispatch
)(Profile);
