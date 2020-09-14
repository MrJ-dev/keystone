const { InputCustom, MongoIntegerInterface, KnexIntegerInterface } = require('./Implementation');
const { Text } = require('@keystonejs/fields');
// const { CustomApp } = require('./middleware');
const express = require('express')
const fs = require('fs');


// var upload = multer({ storage: storage }).single('file')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).array('file')


function prepareMiddleware() {

    const app = express();
    app.use(express.json());
    app.post('/upload-image', (req, res) => {

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log(err)
                return res.status(500).json(err)
            } else if (err) {
                console.log(err)
                return res.status(500).json(err)
            }
            console.log("request successfully happened")
            return res.status(200).send(req.files)
        })

    });
    return app;
}
module.exports = {
    type: 'InputCustom',
    implementation: InputCustom,
    views: {
        Controller: require.resolve('./views/Controller'),
        Field: require.resolve('./views/Field'),
        Filter: Text.views.Filter,
        Cell: require.resolve('./views/Cell'),
    },
    adapters: {
        mongoose: MongoIntegerInterface,
        knex: KnexIntegerInterface,
    },
    // apps: [
    //     new CustomApp()
    // ]
    prepareMiddleware

};
