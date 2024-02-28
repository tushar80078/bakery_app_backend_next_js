const { NextResponse, NextRequest } = require("next/server");
const userService = require("../services/user.service");
const productService = require("@/services/product.service");
const {
  customErrorMiddleware,
} = require("@/helper/middleware/errorMiddleware");
const authHelper = require("@/helper/functions/authHelper");
const dateTimeGenerator = require("@/helper/functions/timeDateGenerator");

// ----------------------- Create User Profile -----------------------------------------

exports.postCreateUserProfile = async (req, params, next) => {
  try {
    let { phone_number, email_id, password, role, first_name, last_name } =
      await req.json();

    if (!phone_number || !email_id || !password || !role) {
      return customErrorMiddleware(
        `Please Send Proper Data With Proper Keys. (Required fields with keys - phone_number, email_id, password, role)`,
        400
      );
    }

    let isUserExists = await userService.getUserByEmailId(email_id);

    if (isUserExists) {
      return customErrorMiddleware(
        `User already exists with given Email_Id`,
        409
      );
    }

    let isUserExistsWithPhoneNumber = await userService.getUserByPhoneNumber(
      phone_number
    );

    if (isUserExistsWithPhoneNumber) {
      return customErrorMiddleware(
        `User already exists with given Phone_number`,
        409
      );
    }

    //------- Generating hash password
    password = await authHelper.hashPassword(password);

    //------- Generate current time to add in database
    const created_at = dateTimeGenerator.generateCurrentTiimeDate();

    const createUserResponse = await userService.createUser({
      first_name,
      last_name,
      email_id,
      phone_number,
      password,
      is_active: true,
      role,
      created_at,
    });

    return NextResponse.json(
      {
        success: true,
        msg: "User Created Successfully!!",
        resData: createUserResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "\n-------------------- Error Occured (User Signup Controller)------------------\n",
      error
    );
    return next(error);
  }
};

// ----------------------- User Authentication -----------------------------------------

exports.postUserLogin = async (req, params, next) => {
  try {
    const { email_id, password } = await req.json();

    if (!email_id || !password) {
      return customErrorMiddleware(
        `Please Send Proper Data With Proper Keys. (Required fields with keys - email_id, password)`,
        400
      );
    }

    let isUserExists = await userService.getUserByEmailId(email_id);

    if (!isUserExists) {
      return customErrorMiddleware(`User not found with given Email_Id`, 409);
    }

    let validatePassword = await authHelper.validatePassword(
      password,
      isUserExists.password
    );

    if (validatePassword) {
      const tokenObject = {
        id: isUserExists.id,
        email_id: isUserExists.email_id,
      };
      const jwtToken = await authHelper.createToken(tokenObject);

      const getLikedAndCartProductsByUserId =
        await productService.getLikedAndCartProductsByUserId(
          parseInt(isUserExists.id)
        );

      return NextResponse.json(
        {
          success: true,
          msg: "User Successfully Logged In!!",
          token: jwtToken,
          userInfo: isUserExists,
          likedProducts: getLikedAndCartProductsByUserId?.likedProducts,
          cartProducts: getLikedAndCartProductsByUserId?.cartProducts,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          msg: "You Are Not Authorized!! Password Incorrect",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(
      "\n----------------------- Error Occured (User Login Controller) ----------------------\n",
      error
    );
    return next(error);
  }
};
