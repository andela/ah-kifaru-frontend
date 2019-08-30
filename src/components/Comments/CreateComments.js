import React from 'react';
import PropTypes from 'prop-types';

export const CreateComments = ({
  handleCommentSubmit,
  handleInputFieldChange,
  content,
  isAuthenticated,
  contentError,
  handleClear
}) => (
  <section>
    <div className="flex flex-col w-full m-auto  mb-10 mt-10">
      <h2 className="mb-3 font-bold text-2xl uppercase">comments</h2>
      <form
        onSubmit={handleCommentSubmit}
        data-testid="submit-form"
        arai-label="comment"
      >
        <div className="flex flex-col md:flex-row w-full ">
          <div className="w-full md:pr-6 pr-0">
            <textarea
              data-testid="content"
              className="w-full h-full p-3 border-solid border-gray-200 border-2 "
              placeholder="Enter Comment..."
              name="content"
              value={content}
              onChange={handleInputFieldChange}
              disabled={!isAuthenticated}
            />
            {!isAuthenticated ? (
              <p className="text-center text-red-600 font-medium text-xl">
                You need to login to post a comment!!!
              </p>
            ) : (
              ''
            )}
            {!!contentError && (
              <span className="text-red-600 text-base">{contentError}</span>
            )}
          </div>
          <div
            data-testid="commentButtons"
            className="md:w-1/5 w-full flex flex-row justify-between md:flex-col md:justify-start"
          >
            <button
              data-testid="button"
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-black p-2 md:p-4 rounded mb-5 md:w-full w-1/2 md:ml-0 mr-5"
              onClick={handleClear}
              disabled={!isAuthenticated}
            >
              CLEAR
            </button>
            <button
              data-testid="submit"
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white p-2 md:p-4 rounded mb-5 md:w-full w-1/2 md:ml-0 ml-5"
              disabled={!isAuthenticated}
            >
              SEND
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
);

CreateComments.propTypes = {
  content: PropTypes.string,
  contentError: PropTypes.string,
  handleClear: PropTypes.func,
  handleCommentSubmit: PropTypes.func,
  handleInputFieldChange: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired
};

CreateComments.defaultProps = {
  handleInputFieldChange: PropTypes.func.isRequired,
  handleCommentSubmit: PropTypes.func.isRequired,
  content: PropTypes.isRequired,
  contentError: PropTypes.isRequired,
  handleClear: PropTypes.func.isRequired
};

export default CreateComments;
