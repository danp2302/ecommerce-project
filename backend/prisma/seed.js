const { PrismaClient } = require("@prisma/client");
const productData = require("../data/products.json");
const helperFunctions = require("../helper_functions/helpers");

const path = require("path");

const prisma = new PrismaClient();

const imageConversion = async (imageFolder, image) => {
  const imagesDirectory = path.join(__dirname, imageFolder);
  const imagePath = path.join(imagesDirectory, image);
  console.log(imagePath);
  try {
    const convertToBase64 = helperFunctions.getImageBase64(imagePath);
    return convertToBase64;
  } catch (error) {
    console.error(`Error converting image ${image}: `, error);
  }
};

async function main() {
  for (let product of productData.products) {
    const imageData = await imageConversion("../images", product.image);
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: imageData,
      },
    });
  }
}
main()
  .then(async () => {
    console.log("successfully updated database");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
