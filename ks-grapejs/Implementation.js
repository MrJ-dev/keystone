const { Relationship, Text } = require('@keystonejs/fields');

const GQL_TYPE_PREFIX = '_grapesjs_';

class GrapesJSEditor extends Relationship.implementation {
    constructor(path, { block, ...fieldConfig }, listConfig) {
        console.log("listConfing", listConfig)
        console.log("============================================")
        console.log("path", path)
        const { itemQueryName } = listConfig.getListByKey(listConfig.listKey).gqlNames;

        const type = `${GQL_TYPE_PREFIX}_${itemQueryName}_${path}`;
        console.log("============================================")
        console.log("type", type);
        console.log("=========================================")

        // Ensure the list is only instantiated once per server instance.
        let auxList = listConfig.getListByKey(type);

        if (!auxList) {
            auxList = listConfig.createAuxList(type, {
                fields: {
                    // TODO: Change to a native JSON type
                    asset: {
                        type: Text,
                        schemaDoc: '',
                    },
                    // TODO: Change to a native JSON type
                    html: {
                        type: Text,
                        schemaDoc: '',
                    },
                    // TODO: Change to a native JSON type
                    css: {
                        type: Text,
                        schemaDoc: '',
                    },
                    // TODO: Change to a native JSON type
                    style: {
                        type: Text,
                        schemaDoc: '',
                    },
                    // TODO: Change to a native JSON type
                    component: {
                        type: Text,
                        schemaDoc: '',
                    },
                    from: {
                        type: Relationship,
                        ref: `${listConfig.listKey}.${path}`,
                        schemaDoc: 'A reference back to the item this document belongs to',
                    },
                }
            });
        }

        // Link up the back reference to keep things in sync
        const config = { ...fieldConfig, many: false, ref: `${type}.from` };
        super(path, config, listConfig);
    }

    extendAdminMeta(meta) {
        console.log("===========================meta=============================")
        console.log(meta)
        return { ...meta };
    }
}

module.exports = {
    GrapesJSEditor,
    MongoRelationshipInterface: Relationship.adapters.mongoose,
    KnexIntegerRelationshipInterface: Relationship.adapters.knex,
};