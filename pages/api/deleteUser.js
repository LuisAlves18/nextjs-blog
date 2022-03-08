import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try{
    const userId = JSON.parse(req.body)
 
  const delprof= await prisma.profile.delete({
    where: {
      userId: parseInt(userId.id)
    }
     
  })
  
  res.json("deleted")
}catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    } 
    throw e
}
};