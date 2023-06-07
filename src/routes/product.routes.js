module.exports = app => {
    const product = require("../controllers/product.controller.js");
    const { authJwt } = require("../middlewares");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/",[authJwt.verifyToken] ,product.create);

    // Retrieve all Tutorials
    router.get("/",[authJwt.verifyToken], product.findAll);

    // Retrieve all published Tutorials
    router.get("/done",[authJwt.verifyToken], product.findAllDone);

    // Retrieve a single Tutorial with id
    router.get("/:id",[authJwt.verifyToken], product.findOne);

    // Update a Tutorial with id
    router.put("/:id",[authJwt.verifyToken], product.update);

    // Delete a Tutorial with id
    router.delete("/:id",[authJwt.verifyToken], product.delete);

    // Create a new Tutorial
    router.delete("/",[authJwt.verifyToken], product.deleteAll);

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
        next();
    });

    app.use("/api/product", router);
};
