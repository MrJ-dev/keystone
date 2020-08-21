import FieldController from '@keystonejs/fields/Controller';
// import { parseDefaultValues } from '../util';

class EditorController extends FieldController {

  constructor(config, ...args) {

    // console.log(arguments)
    super({ ...config }, ...args);
    // console.log("ecporps", this.readViews())
    // console.log(this.views)
  }


  serialize = data => {
    if (data[this.path])
      console.log("serialLize", (data[this.path]))
    if (data[this.path]) {
      for (const key of Object.keys(data[this.path])) {
        // console.log(key)
        localStorage.removeItem(key);
      }
    }

    return data[this.path] ? JSON.stringify(data[this.path]) : null
  };
  deserialize = data => {
    // console.log("data-deserialsze", data)
    return data[this.path] ? JSON.parse(data[this.path]) : null;
  };


  // For simplicity let's disable filtering on this field (PRs welcome)
  getFilterTypes = () => [];
}

export default EditorController;