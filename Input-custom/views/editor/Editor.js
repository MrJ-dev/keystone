import 'grapesjs/dist/css/grapes.min.css';
import { Editor } from 'grapesjs-react'
import React, { useEffect, useState, useRef } from 'react';
import './index.css'
import { v4 as uuidv4 } from 'uuid';
import CodeEditor from './CodeEditor';


const UUID = uuidv4();

export default function GrapeJsEditor(props) {

  const editorRef = useRef();
  const storageManager = {
    id: UUID + "_",
    type: 'local',
    autosave: true,
    autoload: false,
    stepsBeforeSave: 1,
  }

  const [landingPage, setLandingPage] = useState({
    html: `<div></div>`,
    css: null,
    components: null,
    styles: null,
    assets: null
  });

  const [isShowingCodeEditor, setIsShowingCodeEditor] = useState(false)


  function initialiseEditor(editor) {

    editor.setComponents(landingPage.html);
    editor.setStyle(landingPage.css)
    // editor.AssetManager = AssetManager;
    // console.log("editor", editor.AssetManager.getConfig())
    let config = editor.AssetManager.getConfig();
    config.upload = 'http://localhost:3000/upload-image';
    config.uploadName = 'files';
    config.uploadFile = function (e) {
      var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
      var formData = new FormData();
      console.log(files)

      for (var i in files) {
        formData.append('file', files[i])
      }

      fetch('http://localhost:3000/upload-image', {
        method: 'POST',
        body: formData,

      }).then(async (res) => {
        console.log(res)
        let files = await res.json();
        console.log("files", files)
        files = files.map(item => item.path);
        editor.AssetManager.add(files);
      }).catch(err => {
        console.log(err);
      })
    }
    config.stylePrefix = "am-"
    config.embedAsBase64 = 0;
    editor.AssetManager.init(config)
  }

  useEffect(() => {
    const value = props.value;

    if (value && Object.keys(value).length > 0) {

      setLandingPage(state => {
        let newLandingPage = state;
        newLandingPage.html = value["html"];
        newLandingPage.css = value['css'];
        newLandingPage.assets = JSON.parse(value["assets"]);
        newLandingPage.styles = JSON.parse(value["styles"]);
        newLandingPage.components = JSON.parse(value["components"]);
        return { ...newLandingPage }
      })
    }
  }, [props.value]);

  function handleChanges() {
    const myJson = {}
    let re = new RegExp(UUID, 'g')
    setJsonFromLocalStorage(myJson, re);
    props.onChange(myJson)
    props.closeEditor()
  }

  const setJsonFromLocalStorage = (myJson, re) => {
    for (const item of Object.keys(localStorage)) {
      if (item.match(re)) {
        myJson[item.split("_")[1]] = localStorage.getItem(item)
        localStorage.removeItem(item)
      }
    }
  }

  function showCodeEditor() {
    setIsShowingCodeEditor(true);
  }
  function closeCodeEditor() {
    setIsShowingCodeEditor(false);
  }

  function updateLandingPageCss(css) {
    setLandingPage(state => {
      state['styles'] = { pStylePrefix: "gjs-", em: "" }
      state['css'] = css;

      return { ...state }
    })
  }

  function updateLandingPageHtml(html) {
    setLandingPage(state => {
      state['html'] = html;
      return { ...state }
    })
  }

  return (
    <>
      <div className="header">
        {!isShowingCodeEditor ?
          (
            <>
              <button type="button" className="btn" onClick={handleChanges}> Save </button>
              <button type="button" className="btn" onClick={showCodeEditor}> Edit  </button>
            </>
          )
          :
          <button type="button" className="btn" onClick={closeCodeEditor}> Close Code Editor</button>
        }
      </div>

      {!isShowingCodeEditor ?
        <Editor
          ref={editorRef}
          onInit={initialiseEditor}
          id="gjs"
          presetType="webpage"
          storageManager={storageManager}
          components={(landingPage.components) || landingPage.html}
          styleManager={landingPage.styles || landingPage.css}
        // assetsManager={assetsManager}
        />
        :
        <CodeEditor updateLandingPageHtml={updateLandingPageHtml} updateLandingPageCss={updateLandingPageCss} uuid={UUID}></CodeEditor>
      }
    </>
  );
}
