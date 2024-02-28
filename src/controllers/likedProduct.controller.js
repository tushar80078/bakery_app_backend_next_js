const likedService = require("@/services/likedProducts.service");
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

    // -------- Checking product is availabe in liked list -------------------

    const isLikedProductExistForUser = await likedService.getLikedProductById(
      parseInt(user_id),
      parseInt(product_id)
    );

    // ------- If it exist then we will remove it --------------------
    if (isLikedProductExistForUser) {
      const unlikeProduct = await likedService.removeLikedProduct(
        parseInt(user_id),
        parseInt(product_id)
      );

      const getLikedAndCartProductsByUserId =
        await productService.getLikedAndCartProductsByUserId(parseInt(user_id));

      if (unlikeProduct) {
        return NextResponse.json(
          {
            success: true,
            liked: false,
            msg: "Product Unliked For Given User!!",
            resData: getLikedAndCartProductsByUserId?.likedProducts,
          },
          { status: 200 }
        );
      } else {
        return next(`Error While Creating Liked Product`);
      }
    } else {
      // ------- Else we create new entry to create like product --------------------

      const createLikedProduct = await likedService.createLikedProduct(
        parseInt(user_id),
        parseInt(product_id)
      );

      if (createLikedProduct) {
        const getLikedAndCartProductsByUserId =
          await productService.getLikedAndCartProductsByUserId(
            parseInt(user_id)
          );

        return NextResponse.json(
          {
            success: true,
            liked: true,
            msg: "Product Liked For Given User!!",
            resData: getLikedAndCartProductsByUserId?.likedProducts,
          },
          { status: 200 }
        );
      } else {
        return next(`Error While Creating Liked Product`);
      }
    }
  } catch (error) {
    console.log(
      "\n-------------------- Error Occured (Create Cateogry Controller)------------------\n",
      error
    );
    return next(error);
  }
};
