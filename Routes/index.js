const express = require("express");
const { Router } = express;
const router = Router();
const productsRoute = require("./products")


router.use("/api/products", productsRoute)


module.exports = router