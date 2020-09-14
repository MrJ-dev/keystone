const { Text } = require("@keystonejs/fields");
const { File } = require('@keystonejs/fields');
const { Relationship } = require('@keystonejs/fields');
const { LocalFileAdapter } = require('@keystonejs/file-adapters');
const express = require('express')


class InputCustom extends Text.implementation {
    constructor(path, { ...fieldConfig }, listConfig) {
        console.log(fieldConfig)
        super(...arguments)
        const fileAdapter = new LocalFileAdapter({
            src: fieldConfig.adminConfig.filePath,
            path: fieldConfig.adminConfig.filePath,
        });
    }
}

module.exports = {
    InputCustom,
    MongoIntegerInterface: Text.adapters.mongoose,
    KnexIntegerInterface: Text.adapters.knex,
}
