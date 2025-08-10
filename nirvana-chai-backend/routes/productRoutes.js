const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getCategories,
  getOrigins,
} = require("../controllers/productController");

// Product routes
router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/origins", getOrigins);
router.get("/:id", getProductById);

module.exports = router;
