const cartService = require("@/services/cartProducts.service");
const dateTimeGenerator = require("@/helper/functions/timeDateGenerator");
const productService = require("@/services/product.service");
const { NextResponse } = require("next/server");
const {
  customErrorMiddleware,
} = require("@/helper/middleware/errorMiddleware");

// --------------------------------- Create Liked Products -----------------------------------------

exports.postCreateRemoveLikedProductController = async (req, params, next) => {
  try {
    const { product_id, user_id } = await req.json();

    if (!product_id || !user_id) {
      return customErrorMiddleware(
        `Please Send Proper Data With Proper Keys. (Required fields with keys - product_id, user_id)`,
        400
      );
    }

    // -------- Checking product is availabe in cart list -------------------

    const isCartProductExistForUser = await cartService.getCartProductById(
      parseInt(user_id),
      parseInt(product_id)
    );

    // ------- If it exist then we will remove it --------------------
    if (isCartProductExistForUser) {
      const removeCartProduct = await cartService.removeCartProduct(
        parseInt(user_id),
        parseInt(product_id)
      );

      const getLikedAndCartProductsByUserId =
        await productService.getLikedAndCartProductsByUserId(parseInt(user_id));

      if (removeCartProduct) {
        return NextResponse.json(
          {
            success: true,
            liked: false,
            msg: "Product Removed From Cart For Given User!!",
            resData: getLikedAndCartProductsByUserId?.cartProducts,
          },
          { status: 200 }
        );
      } else {
        return next(`Error While Removig Cart Product`);
      }
    } else {
      // ------- Else we create new entry to create like product --------------------

      const createCartProduct = await cartService.createCartProduct(
        parseInt(user_id),
        parseInt(product_id)
      );

      if (createCartProduct) {
        const getLikedAndCartProductsByUserId =
          await productService.getLikedAndCartProductsByUserId(
            parseInt(user_id)
          );

        return NextResponse.json(
          {
            success: true,
            liked: true,
            msg: "Product Added To Cart For Given User!!",
            resData: getLikedAndCartProductsByUserId?.cartProducts,
          },
          { status: 200 }
        );
      } else {
        return next(`Error While To Add Product In Cart`);
      }
    }
  } catch (error) {
    console.log(
      "\n-------------------- Error Occured (Create Remove Cart Controller)------------------\n",
      error
    );
    return next(error);
  }
};
