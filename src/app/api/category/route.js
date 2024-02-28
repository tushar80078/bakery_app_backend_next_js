import { createEdgeRouter } from "next-connect";
import categoryController from "@/controllers/category.controller";
import { errorMiddleware } from "@/helper/middleware/errorMiddleware";
import { NextResponse } from "next/server";
const router = createEdgeRouter();

// ------------------ All Edge Router Requests ---------------------

router.post(categoryController.postCreateCategoryController);
router.get(categoryController.getAllCategories);

// ------------------ Error Middleware ------------------------------

router.use(errorMiddleware);

// ------------------ All Exported Requests -------------------------

export async function GET(request, ctx) {
  return router.run(request, ctx);
}

export async function POST(request, ctx) {
  return router.run(request, ctx);
}

export async function DELETE(request, ctx) {
  return router.run(request, ctx);
}

export async function PUT(request, ctx) {
  return router.run(request, ctx);
}

export async function PATCH(request, ctx) {
  return router.run(request, ctx);
}

// module.exports = { POST, GET, DELETE, PUT, PATCH };
