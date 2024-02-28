const { PrismaClient } = require("@prisma/client");
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

//-------------------------  Create Product ----------------------------------------

const createProduct = async (productData) => {
  const productResponse = await prisma.products.create({
    data: productData,
  });

  return productResponse;
};

//-------------------------  Create Liked Products ----------------------------------------

const createLikedProduct = async (userid, productId) => {
  const productResponse = await prisma.users.update({
    where: {
      id: userid,
    },
    data: {
      likedProducts: {
        connect: { id: productId },
      },
    },
  });

  return productResponse;
};

//-------------------------  Get Liked Product For User  ----------------------------------------

const getLikedAndCartProductsByUserId = async (userId) => {
  const productResponse = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    include: {
      likedProducts: true,
      cartProducts: true,
    },
  });

  return productResponse;
};

//-------------------------  Get Cart Product For User By Cart Id  ----------------------------------------

const getCartProductByIdForUser = async (userId, productId) => {
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
};

//-------------------------  Get Product By Name  ----------------------------------------

const getProductByName = async (productData) => {
  const productResponse = await prisma.products.findFirst({
    where: {
      name: productData,
    },
  });

  return productResponse;
};

//-------------------------  Get All Products ----------------------------------------

const getAllProducts = async () => {
  const productResponse = await prisma.products.findMany();

  return productResponse;
};

//-------------------------  Search Products ----------------------------------------

const searchProductService = async (productString) => {
  const productResponse = await prisma.products.findMany({
    where: {
      OR: [
        {
          name: {
            contains: productString,
            // mode: "insensitive",
          },
        },
        {
          category_name: {
            contains: productString,
            // mode: "insensitive",
          },
        },
        {
          description: {
            contains: productString,
            // mode: "insensitive",
          },
        },
      ],
    },
  });

  return productResponse;
};

//--------------------------- Module Exports -------------------------------------

module.exports = {
  createProduct,
  getProductByName,
  getAllProducts,
  createLikedProduct,
  getLikedAndCartProductsByUserId,
  getCartProductByIdForUser,
  searchProductService,
};
