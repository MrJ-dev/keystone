const { Text } = require("@keystonejs/fields");


class InputCustom extends Text.implementation {
    constructor(path, { ...fieldConfig }, listConfig) {
        //  ("listConfiig", listConfig);
        super(...arguments);
    }
}

module.exports = {
    InputCustom,
    MongoIntegerInterface: Text.adapters.mongoose,
    KnexIntegerInterface: Text.adapters.knex,
}