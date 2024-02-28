const { PrismaClient } = require("@prisma/client");
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

//-------------------------  Create Cart Products ----------------------------------------

const createCartProduct = async (userId, productId) => {
  try {
    const productResponse = await prisma.users.update({
      where: { id: userId },
      data: {
        cartProducts: {
          connect: {
            id: productId,
          },
        },
      },
    });

    return productResponse;
  } catch (error) {
    console.error("Error creating cart product in cartProductService", error);
    throw error;
  }
};

//-------------------------  Remove Cart Products ----------------------------------------

const removeCartProduct = async (userId, productId) => {
  try {
    const productResponse = await prisma.users.update({
      where: { id: userId },
      data: {
        cartProducts: {
          disconnect: {
            id: productId,
          },
        },
      },
    });

    return productResponse;
  } catch (error) {
    console.error("Error creating cart product in cartProductService", error);
    throw error;
  }
};

//-------------------------  Get Cart Product By Id ----------------------------------------

const getCartProductById = async (userId, productId) => {
  try {
    const productResponse = await prisma.users.findFirst({
      where: {
        id: userId,
        cartProducts: {
          some: {
            id: productId,
          },
        },
      },
    });

    return productResponse;
  } catch (error) {
    console.error("Error creating cart product in cartProductService", error);
    throw error;
  }
};

//--------------------------- Module Exports -------------------------------------

module.exports = {
  createCartProduct,
  getCartProductById,
  removeCartProduct,
};
