/** @jsx jsx */

import { jsx } from '@emotion/core';
import GrapesJSEditor from './editor/Editor';

;
function openModal(htmlPage, id) {
    window.location.href = "/abc?id=" + id
    // console.log("id", id)
}


const InputCustom = ({ onChange, value, id }) => {
    // console.log("id", id)
    return (
        <div>
            <GrapesJSEditor value={value} onChange={onChange} id={id}></GrapesJSEditor>
        </div>
    )
}

export default InputCustom;