import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getCategories() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      description: 'Console',
      image: 'console.png',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      description: 'Phone',
      image: 'phones.png',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      description: 'Smartwatch',
      image: 'smartwatches.jpeg',
    },
  ];
}

function getProducts() {
  return [
    {
      id: '3ac283ee-6e68-49bd-9eaf-4f356087b465',
      title: 'PlayStation 4',
      productDescription: 'Konsola PlayStation 4 w zestawie z grą FC 24',
      price: '199.99',
      producer: 'Sony',
      categoryId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: '41b3de10-add2-4ca5-97c5-8178f8238b6a',
      title: 'PlayStation 5',
      productDescription: 'Konsola PlayStation 5 w edycji z grą SpiderMan',
      price: '599',
      producer: 'Sony',
      categoryId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: '94307c47-55bb-4a0a-8fbd-b32aeff71986',
      title: 'Samsung S23',
      productDescription: 'Smartphone Samsung w wersji ULTRA',
      price: '1299.99',
      producer: 'Samsung',
      categoryId: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
    },
    {
      id: 'f5eac2cf-459a-42cf-bfe6-9e74ad4c29fd',
      title: 'IPhone 15',
      productDescription: 'Najnowszej generacji smartphone',
      price: '399',
      producer: 'Apple',
      categoryId: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
    },
    {
      id: '83f5eb08-2dce-4be4-9be9-667a1b842b72',
      title: 'Apple Watch 9',
      productDescription: 'Nowy smartwatch series 9',
      price: '699.99',
      producer: 'Apple',
      categoryId: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
    },
    {
      id: 'b631bc46-4f5b-4846-9c27-3728eb58dfa0',
      title: 'Huawei Watch GT4',
      productDescription: 'Nowy smartwatch Huawei',
      price: '399.99',
      producer: 'Huawei',
      categoryId: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
    },
  ];
}

function getImages() {
  return [
    {
      id: '77e4caa4-c8a1-4487-b5b7-484575dbc39e',
      image: 'huawei1.jpeg',
      productId: 'b631bc46-4f5b-4846-9c27-3728eb58dfa0',
    },
    {
      id: 'dacbc756-ed38-43a1-8ac6-815865b1aace',
      image: 'huawei2.jpeg',
      productId: 'b631bc46-4f5b-4846-9c27-3728eb58dfa0',
    },
    {
      id: 'c7aa8749-8183-4d3b-8de5-7172eacd7363',
      image: 'huawei3.jpeg',
      productId: 'b631bc46-4f5b-4846-9c27-3728eb58dfa0',
    },
    {
      id: '83feff9b-9f1f-4c82-9bc1-a8d61c73fde8',
      image: 'apple9-1.jpeg',
      productId: '83f5eb08-2dce-4be4-9be9-667a1b842b72',
    },
    {
      id: 'aec2e4d6-726f-440f-9e38-6337779ec1a7',
      image: 'apple9-2.jpeg',
      productId: '83f5eb08-2dce-4be4-9be9-667a1b842b72',
    },
    {
      id: 'ec69bd1c-69d8-4823-98c6-c838b9fa6680',
      image: 'apple9-3.jpeg',
      productId: '83f5eb08-2dce-4be4-9be9-667a1b842b72',
    },
    {
      id: '39967f31-bdf2-4651-93c1-e19b79ddf568',
      image: 'IPhone1.jpg',
      productId: 'f5eac2cf-459a-42cf-bfe6-9e74ad4c29fd',
    },
    {
      id: '58db7efb-0a28-4d49-a14a-a5c898104af0',
      image: 'IPhone2.jpg',
      productId: 'f5eac2cf-459a-42cf-bfe6-9e74ad4c29fd',
    },
    {
      id: '6c20e106-768d-4d84-b0a6-cccef2edb575',
      image: 'IPhone3.jpg',
      productId: 'f5eac2cf-459a-42cf-bfe6-9e74ad4c29fd',
    },
    {
      id: '9b1c857e-1ac5-4c3f-93b2-c621c237f943',
      image: 'IPhone4.jpg',
      productId: 'f5eac2cf-459a-42cf-bfe6-9e74ad4c29fd',
    },
    {
      id: '5179e287-c2dc-4c53-91a7-5e45d537de0c',
      image: 'samsung1.jpeg',
      productId: '94307c47-55bb-4a0a-8fbd-b32aeff71986',
    },
    {
      id: 'b0629468-0b6c-4357-824e-9d312508e5a6',
      image: 'samsung2.jpeg',
      productId: '94307c47-55bb-4a0a-8fbd-b32aeff71986',
    },
    {
      id: 'c95af4e5-1ef5-4795-8b57-fdc4314066d1',
      image: 'samsung3.jpeg',
      productId: '94307c47-55bb-4a0a-8fbd-b32aeff71986',
    },
    {
      id: '2d8e743e-0531-4f23-85dc-84c3eced946d',
      image: 'sony1.jpeg',
      productId: '41b3de10-add2-4ca5-97c5-8178f8238b6a',
    },
    {
      id: '53220944-50cd-41b7-9d32-1eb650e5343e',
      image: 'sony2.jpeg',
      productId: '41b3de10-add2-4ca5-97c5-8178f8238b6a',
    },
    {
      id: '971cc789-ac71-49ef-99ff-e87c283a468e',
      image: 'sony3.jpeg',
      productId: '41b3de10-add2-4ca5-97c5-8178f8238b6a',
    },
    {
      id: '8ea94a67-0066-4d76-ad69-d85c0df41b2f',
      image: 'ps4-1.jpeg',
      productId: '3ac283ee-6e68-49bd-9eaf-4f356087b465',
    },
    {
      id: 'a00c59fe-6000-4479-8811-166b2b172026',
      image: 'ps4-2.jpeg',
      productId: '3ac283ee-6e68-49bd-9eaf-4f356087b465',
    },
    {
      id: 'fc4a493a-0147-4e35-ba8f-f95f86792270',
      image: 'ps4-3.jpeg',
      productId: '3ac283ee-6e68-49bd-9eaf-4f356087b465',
    },
  ];
}

async function seed() {
  await Promise.all(
    getCategories().map((category) => {
      return db.categories.create({ data: category });
    }),
  );
  await Promise.all(
    getProducts().map(({ categoryId, ...otherData }) => {
      return db.product.create({
        data: {
          ...otherData,
          category: {
            connect: { id: categoryId },
          },
        },
      });
    }),
  );
  await Promise.all(
    getImages().map((img) => {
      return db.images.create({ data: img });
    }),
  );
}

seed();
