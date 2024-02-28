const { PrismaClient } = require("@prisma/client");
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

//-------------------------  Create Liked Products ----------------------------------------

const createLikedProduct = async (userId, productId) => {
  try {
    const productResponse = await prisma.users.update({
      where: { id: userId },
      data: {
        likedProducts: {
          connect: {
            id: productId,
          },
        },
      },
    });

    return productResponse;
  } catch (error) {
    console.error("Error creating liked product in likedProductService", error);
    throw error;
  }
};

//-------------------------  Remove Liked Products ----------------------------------------

const removeLikedProduct = async (userId, productId) => {
  try {
    const productResponse = await prisma.users.update({
      where: { id: userId },
      data: {
        likedProducts: {
          disconnect: {
            id: productId,
          },
        },
      },
    });

    return productResponse;
  } catch (error) {
    console.error("Error creating liked product in likedProductService", error);
    throw error;
  }
};
//-------------------------  Get All Liked Products ----------------------------------------

const getAllLikedProducts = async (productData) => {
  const productResponse = await prisma.liked_products.findMany();

  return productResponse;
};

//-------------------------  Get Liked Product By Id ----------------------------------------

const getLikedProductById = async (userId, productId) => {
  const productResponse = await prisma.users.findFirst({
    where: {
      id: userId,
      likedProducts: {
        some: {
          id: productId,
        },
      },
    },
  });

  return productResponse;
};

//--------------------------- Module Exports -------------------------------------

module.exports = {
  createLikedProduct,
  removeLikedProduct,
  getLikedProductById,
  getAllLikedProducts,
};
