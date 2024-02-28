const productService = require("@/services/product.service");
const likedProducService = require("@/services/likedProducts.service");
const dateTimeGenerator = require("@/helper/functions/timeDateGenerator");
const { NextResponse } = require("next/server");
const {
  customErrorMiddleware,
} = require("@/helper/middleware/errorMiddleware");

// --------------------------------- Create Product -----------------------------------------

exports.postCreateProductController = async (req, params, next) => {
  try {
    const productData = await req.json();

    const isProductExists = await productService.getProductByName(
      productData.name
    );

    if (isProductExists) {
      return customErrorMiddleware(
        `Product already exists with given name.`,
        409
      );
    }

    //------- Generate current time to add in database
    const created_at = dateTimeGenerator.generateCurrentTiimeDate();

    const createProductResponse = await productService.createProduct({
      created_at,
      ...productData,
    });

    if (createProductResponse) {
      return NextResponse.json(
        {
          success: true,
          msg: "Product Created Successfully!!",
          resData: createProductResponse,
        },
        { status: 200 }
      );
    } else {
      return next(`Error While Creating Course`);
    }
  } catch (error) {
    console.log(
      "\n-------------------- Error Occured (Create Product Controller)------------------\n",
      error
    );
    return next(error);
  }
};

// --------------------------------- Get All Products -----------------------------------------

exports.getGetAllProducts = async (req, params, next) => {
  try {
    const getProductsResponse = await productService.getAllProducts();

    if (getProductsResponse) {
      return NextResponse.json(
        {
          success: true,
          msg: "Products Fetched Successfully!!",
          resData: getProductsResponse,
        },
        { status: 200 }
      );
    } else {
      return next(`Error While Getting Products`);
    }
  } catch (error) {
    console.log(
      "\n-------------------- Error Occured (Get All Products Controller)------------------\n",
      error
    );
    return next(error);
  }
};

// --------------------------------- Create Liked Products -----------------------------------------

exports.postCreateLikedProductController = async (req, params, next) => {
  try {
    const productData = await req.json();

    const createProductResponse = await productService.createLikedProduct(
      productData.userId,
      productData.productId
    );

    if (createProductResponse) {
      return NextResponse.json(
        {
          success: true,
          msg: "Liked Product Created Successfully!!",
          resData: createProductResponse,
        },
        { status: 200 }
      );
    } else {
      return next(`Error While Creating Course`);
    }
  } catch (error) {
    console.log(
      "\n-------------------- Error Occured (Create Liked Product Controller)------------------\n",
      error
    );
    return next(error);
  }
};

// --------------------------------- Get Liked Products For User-----------------------------------------

exports.getGetLikeProductsForUser = async (req, params, next) => {
  try {
    const paramsData = params;

    const getLikedAndCartProductsByUserId =
      await productService.getLikedAndCartProductsByUserId(
        parseInt(paramsData.params.userId)
      );

    if (getLikedAndCartProductsByUserId) {
      return NextResponse.json({
        success: true,
        message: "Product Fetched Successfully!!",
        resData: {
          likedProducts: getLikedAndCartProductsByUserId?.likedProducts,
          cartProducts: getLikedAndCartProductsByUserId?.cartProducts,
        },
      });
    } else {
      return next(`Error While Getting Products`);
    }
  } catch (error) {
    console.log(
      "\n-------------------- Error Occured (Get All Products Controller)------------------\n",
      error
    );
    return next(error);
  }
};

// --------------------------------- Search Product -----------------------------------------

exports.getGetSearchedProduct = async (req, params, next) => {
  try {
    const searchText = await req.json();

    if (!searchText?.searchString) {
      return NextResponse.json({
        success: false,
        message: "Please send data in string format with key `searchString`",
      });
    }

    const searchedProductResponse = await productService.searchProductService(
      searchText.searchString
    );

    if (searchedProductResponse) {
      return NextResponse.json({
        success: true,
        message: "Product Fetched Successfully!!",
        resData: searchedProductResponse,
      });
    } else {
      return next(`Error While Getting Searched Products`);
    }
  } catch (error) {
    console.log(
      "\n-------------------- Error Occured (Get Searched Products Controller)------------------\n",
      error
    );
    return next(error);
  }
};
