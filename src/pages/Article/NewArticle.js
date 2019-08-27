import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';
import Loader from 'react-loader-spinner';
import Layout from '@components/common/Layout';
import Editor, { Description } from './editor';
import * as toastr from 'toastr';
import { publishArticle, draftArticle } from '@modules/article/action';
import './createArticle.scss';

const KeyCodes = {
  comma: 188,
  space: 32,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

export const getImage = ({ blocks }) => {
  const defaultImage =
    'http://res.cloudinary.com/dmsohf8ul/image/upload/v1566901277/kifaru/uf8j7kxjvzxeon5b2wtn.png';
  if (blocks.length > 0) {
    const firstImage = blocks.find(block => block.type === 'image');
    if (typeof firstImage !== undefined) {
      const {
        file: { url }
      } = firstImage.data;
      return url;
    }
  }
  return defaultImage;
};
class NewArticle extends React.Component {
  state = {
    title: '',
    tags: []
  };

  componentDidMount = () => {
    if (this.props.isLoggedIn) {
      if (!this.editor) {
        this.editor = Editor();
      }
      if (!this.description) {
        this.description = Description();
      }
    }
  };
  editorRef = React.createRef(null);

  onChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleDelete = i => {
    this.setState({
      tags: this.state.tags.filter((tag, index) => index !== i)
    });
  };

  handleAddition = tag => {
    let { tags } = this.state;
    if (tags.length < 5) {
      this.setState({ tags: [...tags, tag] });
      return;
    }
    toastr.error('Maximum number of tags allowed is 5');
  };

  handleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags];

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags });
  };

  validateFields = (tags, publishArticle) => {
    const { title } = this.state;
    if (!title) {
      return toastr.error('Enter a Title');
    }
    if (!tags.length) {
      return toastr.error('Minimum of one tag required');
    }
    publishArticle(this.value, this.props.history);
  };

  publishArticle = event => {
    event.preventDefault();
    event.target.disabled = true;
    const { publishArticle } = this.props;
    const { title, tags } = this.state;

    let articleTags = [];
    tags.map(tag => {
      articleTags.push(tag.text);
    });

    this.editor.isReady
      .then(() => {
        this.editor.save().then(body => {
          this.description.isReady.then(() => {
            this.description.save().then(description => {
              const image = getImage(body);
              const tag = articleTags.join(' ');
              const values = {
                title,
                description: JSON.stringify(description),
                image,
                body: JSON.stringify(body),
                tag
              };
              this.value = values;

              this.validateFields(tags, publishArticle);
            });
          });
        });
      })
      .catch(() => {
        toastr.error('Please check your internet connection!');
      });
    event.target.disabled = false;
  };

  draftArticle = event => {
    event.preventDefault();
    event.target.disabled = true;
    const { draftArticle } = this.props;
    const { title, tags } = this.state;

    let articleTags = [];
    tags.map(tag => {
      articleTags.push(tag.text);
    });

    this.editor.isReady
      .then(() => {
        this.editor.save().then(body => {
          this.description.isReady.then(() => {
            this.description.save().then(description => {
              const tag = articleTags.join(' ');
              const values = {
                title,
                description: JSON.stringify(description),
                image: '',
                body: JSON.stringify(body),
                tag
              };
              if (title) {
                draftArticle(values, this.props.history);
                return;
              }
              return toastr.error('Title is required');
            });
          });
        });
      })
      .catch(() => {
        toastr.error('Please check your internet connection!');
      });
    event.target.disabled = false;
  };

  focusEditor = event => {
    this.editorRef.current.querySelector('[contentEditable="true"]').focus();
  };

  render = () => {
    let ready = false;

    const { tags, suggestions, title } = this.state;
    if (title.length >= 5) {
      ready = true;
    }
    return this.props.isLoggedIn ? (
      <Layout>
        <>
          <div className="flex md:flex-row sm:flex-col md:w-4/5 relative m-auto h-content">
            {!this.props.isLoading ? (
              <>
                <div className="md:w-4/5 h-content">
                  <div className="content-area mt-16 m-auto flex flex-col h-content">
                    <div className="body-content">
                      <textarea
                        name="title"
                        data-testid="title"
                        placeholder="Title"
                        className="text-area border-l-2 px-3 py-1 w-full"
                        maxLength="92"
                        onChange={this.onChange}
                      />
                      <div
                        className="cursor-text bg-ash"
                        ref={this.editorRef}
                        onClick={this.focusEditor}
                      >
                        <div
                          id="description"
                          className="w-full mt-8"
                          data-gramm_editor="false"
                          data-testid="description"
                        />
                      </div>
                      <div
                        className="cursor-text bg-ash min-h-5"
                        ref={this.editorRef}
                        onClick={this.focusEditor}
                      >
                        <div
                          id="body-editor"
                          className="w-full mt-8"
                          data-gramm_editor="false"
                          data-testid="editorjs"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <div
                      className=" tags w-full md:w-5/5 relative bottom-0"
                      data-testid="tags"
                    >
                      <ReactTags
                        tags={tags}
                        suggestions={suggestions}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag}
                        handleTagClick={this.handleDelete}
                        delimiters={delimiters}
                        classNames={{
                          tags: 'tagsClass',
                          tagInput: 'tagInputClass',
                          tagInputField: 'tag-input-field-class',
                          selected: 'selectedClass',
                          tag:
                            'tagClass bg-gray-300 uppercase text-black px-4 py-4',
                          remove: 'removeClass',
                          suggestions: 'suggestionsClass',
                          activeSuggestion: 'activeSuggestionClass'
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="md:w-1/5 h-30 flex flex-col justify-end items-center sm:py-6">
                  <button
                    type="button"
                    onClick={this.draftArticle}
                    data-testid="draft-button"
                    aria-label="draft"
                    className="draft-button w-4/5 sm:w-3/5 red-button hover:bg-red-700 hover:text-white outline-none text-white font-bold py-3 px-4"
                  >
                    Draft
                  </button>
                  <button
                    type="button"
                    onClick={this.publishArticle}
                    data-testid="publish-button"
                    aria-label="publish"
                    className="publish-button w-4/5 sm:w-3/5 bg-green-500 hover:bg-green-700 outline-none text-white font-bold py-3 px-4 mt-4 rounded"
                  >
                    Publish
                  </button>
                </div>
              </>
            ) : (
              <Loader
                type="ThreeDots"
                width={50}
                height={50}
                color="red"
                className="flex flex-col items-center justify-center loader w-full"
              />
            )}
          </div>
        </>
      </Layout>
    ) : (
      <Redirect to="/login" />
    );
  };
}

NewArticle.defaultProp = {
  isLoggedIn: false,
  user: {}
};

NewArticle.proptype = {
  isLoggedIn: PropType.bool.isRequired,
  user: PropType.shape({
    id: PropType.number
  }),
  publishArticle: PropType.func.isRequired,
  draftArticle: PropType.func.isRequired,
  Loaded: PropType.func.isRequired,
  Loading: PropType.func.isRequired
};

const mapToProps = state => ({
  isLoggedIn: state.authReducer.isAuthenticated,
  isLoading: state.createArticleReducer.isLoading
});
const mapPropsToDispatch = {
  publishArticle,
  draftArticle
};

export default connect(
  mapToProps,
  mapPropsToDispatch
)(NewArticle);
