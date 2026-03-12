import { Router } from "express";
import { postController } from "../controllers/post.controller";

const postRouter = Router();

postRouter.get("/", postController.getAll);
postRouter.get("/:id", postController.getById);
postRouter.post("/", postController.create);
postRouter.put("/:id", postController.update);
postRouter.delete("/:id", postController.delete);

export default postRouter;