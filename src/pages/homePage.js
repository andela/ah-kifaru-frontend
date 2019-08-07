import React from 'react';
import Layout from '@components/Layout';
import Banner from '@components/Banner/index';
import ArticleCard from '../components/ArticleCard/index';

const Homepage = () => {
  return (
    <Layout>
      <Banner />
      <ArticleCard
        title="Pointing towards a good test boosts engineers' confidence"
        description="Things are going to be fine. All you need to do is stay focused and believe in yourself"
        body="The journey to become world class may be scary and daunting. All you need to do is stay focused and believe in yourself"
        imageUrl="imageUrl"
        authorImage="author-image"
        publishedDate="June 25"
        author="Mark"
        readTime="2 mins read"
      />
    </Layout>
  );
};

export default Homepage;
