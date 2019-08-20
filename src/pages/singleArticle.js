import React from 'react';
import Layout from '@components/Layout';
// import Banner from '../../public/images/banner_default.png';

const SingleArticlePage = () => {
  return (
    <Layout>
      <div className="article-layout">
        <div>Author's card</div>
        <main>
          <h1 className="article-title sm:mx-4">
            Facebook’s Libra Cryptocurrency Could Be Great, if Not for Facebook
          </h1>
          <p className="article-desc mt-3 sm:mx-4">
            Facebook has been trying to “fix” how we send and receive money for
            years through products like Facebook Credits and “Send Money to
            Friends in Messenger.” Enter Libra,
          </p>
          <img
            src="../../public/images/banner_default.png"
            alt="Article Banner"
            className="mt-3"
          />
          <div className="article-body mt-3">
            <p>
              acebook has been trying to “fix” how we send and receive money for
              years through products like Facebook Credits and “Send Money to
              Friends in Messenger.” Enter Libra, an upcoming cryptocurrency
              that has a couple of modest goals: “Reinvent money. Transform the
              economy.” Though you may be unaware, Facebook has been working
              toward this project for a long time. Earlier attempts at creating
              a new financial infrastructure, like Facebook Credits, focused on
              monetizing apps and services that were built on the Facebook
              platform. At the time, you could buy Facebook Credits, which would
              then allow you to make purchases in games like FarmVille, for
              example.
            </p>
            <p>
              Think of it like an in-app currency for the social network and its
              various appendages — more like gold in Candy Crush than actual
              money. Ultimately, it failed, in part because there wasn’t a
              broader use case. But the idea maintains an appeal. Getting
              developers to use a Facebook “currency” would grant the company
              access to the valuable credit card details of millions of users
              buying virtual products — as well as a valuable cut of the
              transactions made using its tools. Libra is the evolution of that
              early goal, now with grander ambitions. Facebook wants to
              completely reshape how people make online payments.
            </p>
            <p>
              By detaching from currencies like the U.S. dollar, Libra could
              bring instant, low-cost digital payments and transfers to anyone
              with a phone. On paper, this is the ubiquitous, global
              cryptocurrency that fans of the technology have dreamed of since
              the dawn of Bitcoin. Thanks to Facebook, the year of
              cryptocurrencies going mainstream may finally arrive. But this is
              Facebook, so as you can imagine, there are some issues here.
              Bitcoin, cryptocurrency, and blockchain are now a part of the
              modern vocabulary, but they’ve really yet to demonstrate vast
              consumer appeal. Few people are paying for their coffee with a
              Bitcoin-backed card or sending money to relatives on the
              blockchain, because it’s all too complex. (The staggering amount
              of electricity needed to manage Bitcoin doesn’t help.) But
              Facebook has amazing reach — last reported to be more than 2.3
              billion active users — so Libra is almost certainly set up for
              overnight success where every digital currency before it failed.
            </p>
          </div>
        </main>
        <div>Action Button</div>
      </div>
    </Layout>
  );
};

export default SingleArticlePage;
