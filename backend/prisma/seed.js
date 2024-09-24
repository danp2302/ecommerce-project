const { PrismaClient } = require("@prisma/client");
const productData = require("../data/products.json");

const prisma = new PrismaClient();

async function main() {
  for (let product of productData.products)
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      },
    });
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
