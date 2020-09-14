/** @jsx jsx */

import { jsx } from '@emotion/core';
import { useState } from 'react'
import { FieldContainer, FieldLabel } from '@arch-ui/fields';
import InputCustom from './InputCustom'



const GQL_PREFIX_TYPE = "_files"
const InputCustomField = (props) => {

    const value = props.value;
    const field = props.field;
    const onChange = props.onChange;
    const errors = props.errors;
    const [isShowingEditor, setIsShowingEditor] = useState(false);
    const type = `${GQL_PREFIX_TYPE}_${props.field.path}`;

    const fileContentList = '';


    console.log("fileContentList", field.getListByKey('FileContent'));

    function showEditor() {
        setIsShowingEditor(true);
    }

    function closeEditor() {
        setIsShowingEditor(false)
    }
    console.log("props", props)
    return (
        <div>
            <FieldContainer>
                <FieldLabel htmlFor={`ks-input-${field.path}`} field={field} errors={errors} />

                {isShowingEditor ?
                    <div style={{ position: "fixed", top: 0, right: 0, width: "100%", height: "100%", zIndex: 99 }}>
                        <InputCustom value={value} onChange={onChange} id={props.item?.id} closeEditor={closeEditor} />
                    </div>
                    :
                    <button type="button" onClick={showEditor}>Open Editor</button>}
            </FieldContainer>
        </div>
    )

};
export default InputCustomField;