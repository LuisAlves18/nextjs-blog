const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export async function main() {
    await prisma.user.create({
      data: {
        name: 'jose',
        email: 'jose@prisma.io',
        post: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    })

  
     const allUsers = await prisma.user.findMany({
      include: {
        post: false,
        profile: true,
      },
    })
    console.dir(allUsers, { depth: null })
    
  }
main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

