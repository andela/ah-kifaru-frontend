import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';
import Loader from 'react-loader-spinner';
import Layout from '@components/Layout';
import Editor, { Description } from './editor';
import * as toastr from 'toastr';
import {
  publishArticle,
  draftArticle,
  Loading,
  Loaded
} from '@modules/article/action';
import './createArticle.scss';

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
class NewArticle extends React.Component {
  componentDidMount() {
    localStorage.setItem('url', this.props.location.pathname);
  }
  state = {
    draft: false,
    title: '',
    tags: [],
    suggestions: []
  };

  onChange = e => {
    const { name, value } = e.target;
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
              const tag = articleTags.join(' ');
              const values = {
                title,
                description: JSON.stringify(description),
                image: 'https://google.com',
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
                image: 'https://google.com',
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
  render = () => {
    let ready = false;
    if (this.props.isLoggedIn) {
      if (!this.editor) {
        this.editor = Editor();
      }
      if (!this.description) {
        this.description = Description();
      }
    }
    const { tags, suggestions, title } = this.state;
    if (title.length > 4) {
      ready = true;
    }
    return this.props.isLoggedIn ? (
      !this.props.isLoading ? (
        <Layout>
          <>
            <div className="md-flex-row relative">
              <div className="md-8">
                <div className="content-area mt-16 m-auto">
                  <textarea
                    name="title"
                    placeholder="Title"
                    className="text-area border-l-2 px-3 py-1 w-full"
                    maxLength="92"
                    onChange={this.onChange}
                  />
                  <div
                    id="description"
                    className="w-full mt-8"
                    data-gramm_editor="false"
                    onChange={this.onChange}
                  />
                  <div
                    id="editorjs"
                    className="w-full mt-8"
                    data-gramm_editor="false"
                    onChange={this.onChange}
                  />
                  <div className="block-md absolute bottom-0">
                    <ReactTags
                      tags={tags}
                      suggestions={suggestions}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      handleDrag={this.handleDrag}
                      delimiters={delimiters}
                      classNames={{
                        tags: 'tagsClass',
                        tagInput: 'tagInputClass',
                        tagInputField: 'tag-input-field-class',
                        selected: 'selectedClass',
                        tag: 'tagClass bg-green-500',
                        remove: 'removeClass',
                        suggestions: 'suggestionsClass',
                        activeSuggestion: 'activeSuggestionClass'
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="md-2 flex flex-col justify-center align-middle px-16">
                <button
                  type="button"
                  onClick={this.draftArticle}
                  className="draft-button red-button hover:bg-green-700 outline-none text-white font-bold py-2 px-4"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={this.publishArticle}
                  className="publish-button bg-green-500 hover:bg-green-700 outline-none text-white font-bold py-2 px-4 mt-4"
                >
                  Publish
                </button>
              </div>
            </div>
          </>
        </Layout>
      ) : (
        <Loader type="ThreeDots" />
      )
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
  isLoading: state.articleReducer.isLoading
});
const mapPropsToDispatch = {
  publishArticle,
  draftArticle,
  Loaded,
  Loading
};

export default connect(
  mapToProps,
  mapPropsToDispatch
)(NewArticle);
