import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          content: "https://pris.ly/discord",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
  },
];

async function main() {
  console.log("Starting seed...");

  // Clear existing data first
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  console.log("Cleared existing data");

  for (const u of userData) {
    const user = await prisma.user.create({ data: u });
    console.log(`Created user: ${user.name} (${user.email})`);
  }

  console.log("Seed completed successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
