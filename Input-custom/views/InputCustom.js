/** @jsx jsx */

import { jsx } from '@emotion/core';
import GrapesJSEditor from './editor/Editor';


const InputCustom = ({ onChange, value, id, closeEditor }) => {
    // console.log("id", id)
    return (
        <GrapesJSEditor value={value} onChange={onChange} id={id} closeEditor={closeEditor}></GrapesJSEditor>
    )
}

export default InputCustom;