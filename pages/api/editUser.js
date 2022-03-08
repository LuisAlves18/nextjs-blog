import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  const data = JSON.parse(req.body);
  const editUser = await prisma.profile.update({
    where: {
      userId: parseInt(data.userId)
    },
    data:{
      bio: data.bio
    },
  });
  console.log(data);
  res.json("edited");
};
