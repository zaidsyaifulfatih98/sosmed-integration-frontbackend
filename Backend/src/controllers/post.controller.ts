import { Request, Response, NextFunction } from "express";
import { postService } from "../services/post.service";

const isCUID = (value: string) => /^c[a-z0-9]{24}$/.test(value);

export const postController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postService.getAll();
      res.status(200).json({
        success: true,
        message: "get all posts successfully",
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      if (!isCUID(id)) {
        res.status(400).json({ success: false, message: "invalid id" });
        return;
      }

      const post = await postService.getById(id);

      if (!post) {
        res.status(404).json({ success: false, message: "post not found" });
        return;
      }

      res.status(200).json({
        success: true,
        message: "get post successfully",
        data: post,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content, authorId } = req.body;

      const post = await postService.create({ title, content, authorId });

      res.status(201).json({
        success: true,
        message: "create post successfully",
        data: post,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      if (!isCUID(id)) {
        res.status(400).json({ success: false, message: "invalid id" });
        return;
      }

      const post = await postService.update(id, req.body);

      res.status(200).json({
        success: true,
        message: "update post successfully",
        data: post,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      if (!isCUID(id)) {
        res.status(400).json({ success: false, message: "invalid id" });
        return;
      }

      await postService.delete(id);

      res.status(200).json({
        success: true,
        message: "delete post successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};