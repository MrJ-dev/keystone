import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UUID = uuidv4();
const Editor = (props) => {

  const [state, setstate] = useState({});
  // console.log("value", props)

  useEffect(() => {
    const value = props.value;
    const LandingPage = !props.value ? {
      html: `<div></div>`,
      css: null,
      components: null,
      styles: null,
      assets: null
    } : {
        html: value["html"],
        css: value["css"],
        assets: JSON.parse(value["assets"]),
        styles: JSON.parse(value["styles"]),
        components: JSON.parse(value["components"])
      }

    const editor = grapesjs.init({
      container: `#${"gjs"}`,
      // fromElement: true,
      height: '300px',
      width: 'auto',
      panels: {},
      blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'section', // id is mandatory
            label: '<b>Section</b>', // You can use HTML/SVG inside labels
            attributes: { class: 'gjs-block-section' },
            content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
          }, {
            id: 'text',
            label: 'Text',
            content: '<div data-gjs-type="text">Insert your text here</div>',
          }, {
            id: 'image',
            label: 'Image',
            select: true,
            content: { type: 'image' },
            activate: true,
          }
        ]
      },
      storageManager: {
        id: UUID + "_",
        type: 'local',
        autosave: true,

        autoload: false,
        stepsBeforeSave: 0,
      },
      components: (LandingPage.components) || LandingPage.html,
      style: LandingPage.styles || LandingPage.css,
      assets: LandingPage.assets

      // style: props.id ? props.value[props.id + "-style"] || props.value[props.id + "-css"] : {},

    });

    setstate({ ...state, editor: editor })

    // editor.StorageManager.add('local', {
    //   store(data, clb, clbErr) {
    //     localStorage.setItem('gjs-item')
    //   }
    // })

    editor.on('storage:end', e => {
      // console.log(e)
      const myJson = {}
      let re = new RegExp(UUID, 'g')
      setJsonFromLocalStorage(myJson, re);
      props.onChange(myJson)
    })

  }, [props.id]);

  const setJsonFromLocalStorage = (myJson, re) => {
    for (const item of Object.keys(localStorage)) {
      if (item.match(re)) {
        myJson[item.split("_")[1]] = localStorage.getItem(item)
        // localStorage.removeItem(item)
      }
    }
  }

  /**
   * This method is used if we want info directly from editor
   */
  function getEditorInfo() {
    console.log(state.editor?.getHtml());
    console.log(state.editor?.getComponents())
    // similarly for js, style,assets, css
  }

  return (
    <>
      <div id={"gjs"}>
      </div>
      <div id="blocks"></div>
    </>
  );
}

export default Editor;
