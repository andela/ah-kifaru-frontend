import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ArticleCard from './index';
import { article } from '../../../__mocks__/mockData';

const {
  title,
  description,
  body,
  image,
  publishedDate,
  readTime,
  author,
  tags = []
} = article;

const articleWithNoDescription = {
  title,
  body,
  image,
  publishedDate,
  readTime,
  author,
  tags
};

describe('ArticleCard', () => {
  let articleCard;

  it('renders the article card successfully', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard article={article} />
      </BrowserRouter>
    );
    expect(articleCard).toBeDefined();
    expect(articleCard.find('div').length).toBe(3);
    expect(articleCard.find('img').length).toBe(2);
    expect(articleCard.find('h3').length).toBe(1);
    expect(articleCard.find('p').length).toBe(3);
    expect(articleCard.find('span').length).toBe(3);
    // expect(articleCard.find('button').length).toBe(1);
  });

  it('renders and empty article card', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard />
      </BrowserRouter>
    );

    expect(articleCard).toBeDefined();
    expect(articleCard.find('div').exists()).toEqual(true);
    expect(articleCard.find('img').exists()).toEqual(true);
    expect(articleCard.find('h3').exists()).toEqual(true);
    expect(articleCard.find('p').exists()).toEqual(true);
    expect(articleCard.find('span').exists()).toEqual(true);
    // expect(articleCard.find('button').exists()).toEqual(true);
  });

  it('should render an article card with a title', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard article={article} showBookmark={false} />
      </BrowserRouter>
    );

    expect(articleCard.find('h3')).toBeTruthy();
    expect(articleCard.find('h3').text()).toEqual(title);
  });

  it('should render an article card with a short text from the body', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard article={articleWithNoDescription} showBookmark={false} />
      </BrowserRouter>
    );

    expect(articleCard.find('[data-testid="description"]')).toBeTruthy();
    expect(articleCard.find('[data-testid="description"]').text()).toEqual(
      body
    );
  });

  it('should render an article card with a short text from the body', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard article={article} showBookmark={false} />
      </BrowserRouter>
    );

    expect(articleCard.find('[data-testid="description"]')).toBeTruthy();
    expect(articleCard.find('[data-testid="description"]').text()).toEqual(
      description
    );
  });

  it('should render an article card with an article image', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard article={article} showBookmark={false} />
      </BrowserRouter>
    );

    expect(articleCard.find('img.article-image')).toBeTruthy();
  });

  it("should render an article card with an author's image", () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard article={article} showBookmark={false} />
      </BrowserRouter>
    );

    expect(articleCard.find('img.author-image')).toBeTruthy();
    expect(articleCard.find('[data-testid="authorImage"]').length).toBe(1);
  });

  it('should render an article card with an author name', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard article={article} showBookmark={false} />
      </BrowserRouter>
    );

    expect(articleCard.find('p.author-name')).toBeTruthy();
  });

  it('should render an article card with a published date', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard article={article} showBookmark={false} />
      </BrowserRouter>
    );

    expect(articleCard.find('[data-testid="publishedDate"]')).toBeTruthy();
    expect(articleCard.find('[data-testid="publishedDate"]').text()).toEqual(
      publishedDate
    );
  });
  it('should render an article card with time it takes to read an article', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard article={article} showBookmark={false} />
      </BrowserRouter>
    );

    expect(articleCard.find('[data-testid="readTime"]')).toBeTruthy();
    expect(articleCard.find('[data-testid="readTime"]').text()).toEqual(
      readTime
    );
  });

  it('should not render the bookmark icon when a user is not logged-in or is viewing his or her profile page', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard article={article} showBookmark={false} />
      </BrowserRouter>
    );

    expect(articleCard.find('button').length).toBe(0);
  });

  // it('should render a bookmarked icon (filled bookmark icon) when an article is bookmarked', () => {
  //   articleCard = mount(
  //     <BrowserRouter>
  //       <ArticleCard article={article} isBookmarked />
  //     </BrowserRouter>
  //   );

  //   expect(articleCard.find('button[name="bookmark"]')).toBeTruthy();
  //   expect(articleCard.find('[data-testid="bookmarked"]').length).toBe(1);
  // });

  // it('should render a non-filled bookmark icon when an article is not bookmarked', () => {
  //   articleCard = mount(
  //     <BrowserRouter>
  //       <ArticleCard article={article} isBookmarked={false} />
  //     </BrowserRouter>
  //   );

  //   expect(articleCard.find('button[name="bookmark"]')).toBeTruthy();
  //   expect(articleCard.find('[data-testid="not-bookmarked"]').length).toBe(1);
  // });
});
