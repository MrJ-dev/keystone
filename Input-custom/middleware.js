const express = require('express');

class CustomApp {
  prepareMiddleware({ keystone, dev, distDir }) {
    const middleware = express();
    middleware.get('/hello', (req, res) => {
      console.log("callledd")
      res.send("hwllo world")
    })
    return middleware;
  }
}

module.export = CustomApp