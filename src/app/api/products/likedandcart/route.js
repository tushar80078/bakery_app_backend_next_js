import { createEdgeRouter } from "next-connect";
import productController from "@/controllers/product.controller";
import { errorMiddleware } from "@/helper/middleware/errorMiddleware";
import cors from "cors";

const router = createEdgeRouter();

// ------------------ All Edge Router Requests ---------------------

router.post(productController.postCreateLikedProductController);

// ------------------ Error Middleware ------------------------------

router.use(errorMiddleware);
router.use(cors());

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
