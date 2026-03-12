import prisma from "../configs/prisma-client.config";

export const postService = {
  async getAll() {
    return await prisma.post.findMany({
      include: { author: true },
    });
  },

  async getById(id: string) {
    return await prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
  },

  async create(data: { title: string; content?: string; authorId: string }) {
    return await prisma.post.create({
      data,
      include: { author: true },
    });
  },

  async update(id: string, data: { title?: string; content?: string }) {
    return await prisma.post.update({
      where: { id },
      data,
      include: { author: true },
    });
  },

  async delete(id: string) {
    return await prisma.post.delete({
      where: { id },
    });
  },
};