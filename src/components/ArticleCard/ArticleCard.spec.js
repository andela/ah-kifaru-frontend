import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ArticleCard from './index';
import { articleCardMockData } from '../../../__mocks__/mockData';

const {
  title,
  description,
  body,
  image,
  authorImage,
  publishedDate,
  author,
  readTime
} = articleCardMockData;

describe('ArticleCard', () => {
  let articleCard;

  beforeEach(() => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          description={description}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
        />
      </BrowserRouter>
    );
  });

  it('renders the article card successfully', () => {
    expect(articleCard).toBeDefined();
    expect(articleCard.find('div').length).toBe(4);
    expect(articleCard.find('img').length).toBe(2);
    expect(articleCard.find('h1').length).toBe(1);
    expect(articleCard.find('p').length).toBe(3);
    expect(articleCard.find('span').length).toBe(3);
    expect(articleCard.find('button').length).toBe(1);
  });

  it('should render an article card with a title', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          description={description}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
          showBookmark={false}
        />
      </BrowserRouter>
    );

    expect(articleCard.find('h1')).toBeTruthy();
    expect(articleCard.find('h1').text()).toEqual(title);
  });

  it('should render an article card with a short text from the body', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
          showBookmark={false}
        />
      </BrowserRouter>
    );

    expect(articleCard.find('p.description-body')).toBeTruthy();
    expect(articleCard.find('p.description-body').text()).toEqual(body);
  });

  it('should render an article card with a short text from the body', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          description={description}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
          showBookmark={false}
        />
      </BrowserRouter>
    );

    expect(articleCard.find('p.description-body')).toBeTruthy();
    expect(articleCard.find('p.description-body').text()).toEqual(description);
  });

  it('should render an article card with an article image', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          description={description}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
          showBookmark={false}
        />
      </BrowserRouter>
    );

    expect(articleCard.find('img.article-image')).toBeTruthy();
  });

  it('should render an article card with an article image', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          description={description}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
          showBookmark={false}
        />
      </BrowserRouter>
    );

    expect(articleCard.find('img.author-image')).toBeTruthy();
  });

  it('should render an article card with an author name', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          description={description}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
          showBookmark={false}
        />
      </BrowserRouter>
    );

    expect(articleCard.find('p.author-name')).toBeTruthy();
    expect(articleCard.find('p.author-name').text()).toEqual(author);
  });

  it('should render an article card with a published date', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          description={description}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
          showBookmark={false}
        />
      </BrowserRouter>
    );

    expect(articleCard.find('span.create-date')).toBeTruthy();
    expect(articleCard.find('span.create-date').text()).toEqual(publishedDate);
  });
  it('should render an article card with an author name', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          description={description}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
          showBookmark={false}
        />
      </BrowserRouter>
    );

    expect(articleCard.find('span.read-time')).toBeTruthy();
    expect(articleCard.find('span.read-time').text()).toEqual(readTime);
  });

  it('should not render the bookmark icon', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          description={description}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
          showBookmark={false}
        />
      </BrowserRouter>
    );

    expect(articleCard.find('button').length).toBe(0);
  });

  it('should render a bookmark icon when an article is bookmarked', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          description={description}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
          isBookmarked
        />
      </BrowserRouter>
    );

    expect(articleCard.find('button')).toBeTruthy();
    expect(articleCard.find('button').length).toBe(1);
    expect(articleCard.find('.bookmarked').length).toBe(1);
  });

  it('should render a bookmark icon when an article is not bookmarked', () => {
    articleCard = mount(
      <BrowserRouter>
        <ArticleCard
          title={title}
          description={description}
          body={body}
          image={image}
          author-image={authorImage}
          publishedDate={publishedDate}
          author={author}
          readTime={readTime}
          isBookmarked={false}
        />
      </BrowserRouter>
    );

    expect(articleCard.find('button')).toBeTruthy();
    expect(articleCard.find('button').length).toBe(1);
    expect(articleCard.find('.not-bookmarked').length).toBe(1);
  });
});
