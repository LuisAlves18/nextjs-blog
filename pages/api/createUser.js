import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const data = JSON.parse(req.body);
  const createUser = await prisma.user.create({
    data,
  });
  console.log(data);
  res.json(createUser);
};
