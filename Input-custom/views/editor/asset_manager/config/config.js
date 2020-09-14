export default {

  assets: [],

  // Content to add where there is no assets to show
  // eg. 'No <b>assets</b> here, drag to upload'
  noAssets: 'No <b>assets</b> here, drag to upload',

  stylePrefix: 'am-',

  // Upload endpoint, set `false` to disable upload
  upload: 'http://localhost:8001/upload-image',
  // upload: false,
  // upload: 0,

  // The name used in POST to pass uploaded files
  uploadName: 'file',

  headers: {},

  params: {},

  credentials: 'include',

  multiUpload: true,

  // If true, tries to add automatically uploaded assets.
  // To make it work the server should respond with a JSON containing assets
  // in a data key, eg:
  // {
  //  data: [
  //    'https://.../image.png',
  //    ...
  //    {src: 'https://.../image2.png'},
  //    ...
  //  ]
  // }
  autoAdd: 1,

  // To upload your assets, the module uses Fetch API, with this option you
  // overwrite it with something else.
  // It should return a Promise
  // @example
  // customFetch: (url, options) => axios(url, { data: options.body }),
  customFetch: '',

  // Custom uploadFile function.
  // Differently from the `customFetch` option, this gives a total control
  // over the uploading process, but you also have to emit all `asset:upload:*` events
  // by yourself (if you need to use them somewhere)
  // @example
  // uploadFile: (e) => {
  //   var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
  //   // ...send somewhere
  //   console.log(files);

  //   var formData = new FormData();

  //   for (var i in files) {
  //     formData.append('file-' + i, files[i])
  //   }

  //   $.ajax({
  //     url: 'https://localhost:8001/upload-image',
  //     type: 'POST',
  //     data: formData,
  //     contentType: false,
  //     crossDomain: true,
  //     mimeType: "multipart/form-data",
  //     processData: false,
  //     success: function (result) {
  //       var images = result.data; // <- should be an array of uploaded images
  //       console.log(images)
  //     }
  //   });
  // },
  uploadFile: '',

  // In the absence of 'uploadFile' or 'upload' assets will be embedded as Base64
  embedAsBase64: 1,

  // Handle the image url submit from the built-in 'Add image' form
  // @example
  // handleAdd: (textFromInput) => {
  //   // some check...
  //   editor.AssetManager.add(textFromInput);
  // }
  handleAdd: '',

  // Enable an upload dropzone on the entire editor (not document) when dragging
  // files over it
  // If active the dropzone disable/hide the upload dropzone in asset modal,
  // otherwise you will get double drops (#507)
  dropzone: 1,

  // Open the asset manager once files are been dropped via the dropzone
  openAssetsOnDrop: 1,

  // Any dropzone content to append inside dropzone element
  dropzoneContent: '<input type="file" id="gjs-am-uploadFile" name="file" accept="image/*" multiple="">',

  //method called before upload, on return false upload is canceled.
  // @example
  // beforeUpload: (files) => {
  //   // logic...
  //   var stopUpload = true;
  //   if(stopUpload) return false;
  // }
  beforeUpload: null
};
