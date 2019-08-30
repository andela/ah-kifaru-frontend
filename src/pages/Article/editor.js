import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import MarkerTool from '@editorjs/marker';
import Delimeter from '@editorjs/delimiter';
import axios from 'axios';

const instance = axios.create({
  headers: {}
});

const uploadImageCallBack = file => {
  const url = 'https://api.cloudinary.com/v1_1/dmsohf8ul/image/upload';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'kifaru');
  return instance.post(url, formData, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
};

export default (data = null) => {
  const editor = new EditorJS({
    holder: 'body-editor',
    placeholder: 'Tell your story and solve a problem',
    tools: {
      header: {
        class: Header,
        shortcut: 'CMD+SHIFT+H',
        inlineToolbar: ['link', 'bold']
      },
      image: {
        class: ImageTool,
        inlineToolbar: true,
        config: {
          placeholder: 'Add image',
          uploader: {
            /**
             * Uploads an image file to the server and returns an uploaded data
             * @param {file} file - file selected from the device or dragged an paste
             * @param {Promise.<{success, file: {url}}}>}
             */
            uploadByFile(file) {
              return uploadImageCallBack(file).then(res => {
                return {
                  success: 1,
                  file: {
                    url: res.data.url
                  }
                };
              });
            },
            /**
             * Uploads image by this url
             * @param {url} url - url of image
             * @param {Promise.<{success, file: {url}}}>}
             */
            uploadByUrl(url) {
              return uploadImageCallBack(url).then(res => {
                return {
                  success: 1,
                  file: {
                    url: res.data.url
                  }
                };
              });
            }
          }
        }
      },
      list: {
        class: List,
        inlineToolbar: ['link', 'bold'],
        shortcut: 'CMD+SHIFT+L'
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+P'
      },
      marker: {
        class: MarkerTool,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+M'
      },
      delimiter: {
        class: Delimeter,
        shortcut: 'CMD+SHIFT+D'
      }
    },
    data
  });
  return editor;
};

export const Description = (data = null) => {
  const editor = new EditorJS({
    holder: 'description',
    placeholder: 'Description',
    tools: {
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+P'
      }
    },
    data
  });
  return editor;
};
