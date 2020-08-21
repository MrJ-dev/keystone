/** @jsx jsx */

import { jsx } from '@emotion/core';

import { FieldContainer, FieldLabel, FieldInput } from '@arch-ui/fields';
import InputCustom from './InputCustom';

const InputCustomField = (props) => {

    // const editor = grapesjs.init({
    //     // Indicate where to init the editor. You can also pass an HTMLElement
    //     container: '#app',
    //     // Get the content for the canvas directly from the element
    //     // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    //     fromElement: true,
    //     // Size of the editor
    //     height: '300px',
    //     width: 'auto',
    //     // Disable the storage manager for the moment
    //     storageManager: false,
    //     // Avoid any default panel
    //     panels: { defaults: [] },
    // });
    // editor.load(res => {
    //     console.log(res)
    //     editor.render();
    //     console.log(editor)
    // });
    // console.log("======================field===================================");
    // console.log(props)
    // console.log("value", value)
    const value = props.value;
    const field = props.field;
    const onChange = props.onChange;
    const errors = props.errors;
    return (
        <div>
            <FieldContainer>
                <FieldLabel htmlFor={`ks-input-${field.path}`} field={field} errors={errors} />
                <InputCustom value={value} onChange={onChange} id={props.item?.id} />
            </FieldContainer>
        </div>
    )

};
export default InputCustomField;