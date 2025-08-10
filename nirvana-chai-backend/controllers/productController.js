const products = require("../data/products");

/**
 * Get all products with optional filtering and pagination
 */
const getProducts = (req, res) => {
  try {
    const {
      category,
      origin,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 20,
      sortBy = "id",
      sortOrder = "asc",
    } = req.query;

    let filteredProducts = [...products];

    // Apply filters
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    if (origin && origin !== "all") {
      filteredProducts = filteredProducts.filter(
        (p) => p.origin?.toLowerCase() === origin.toLowerCase(),
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= parseFloat(minPrice),
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price <= parseFloat(maxPrice),
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.productNameEnglish.toLowerCase().includes(searchLower) ||
          p.productNameCatalog.toLowerCase().includes(searchLower) ||
          p.composition.toLowerCase().includes(searchLower),
      );
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();

      if (sortOrder === "desc") {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
    });

    // Apply pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedProducts,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(filteredProducts.length / limitNum),
        totalItems: filteredProducts.length,
        itemsPerPage: limitNum,
      },
      filters: {
        applied: { category, origin, minPrice, maxPrice, search },
        available: {
          categories: [...new Set(products.map((p) => p.category))].filter(
            Boolean,
          ),
          origins: [...new Set(products.map((p) => p.origin))].filter(Boolean),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Get a single product by ID
 */
const getProductById = (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Get product categories
 */
const getCategories = (req, res) => {
  try {
    const categories = [...new Set(products.map((p) => p.category))].filter(
      Boolean,
    );
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get product origins
 */
const getOrigins = (req, res) => {
  try {
    const origins = [...new Set(products.map((p) => p.origin))].filter(Boolean);
    res.json({
      success: true,
      data: origins,
    });
  } catch (error) {
    console.error("Error fetching origins:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getCategories,
  getOrigins,
};
