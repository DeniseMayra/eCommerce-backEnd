import { faker } from '@faker-js/faker';
import { PRODUCTS_CATEGORY_ACCESORIES, PRODUCTS_CATEGORY_MOTORCYCLE } from '../../clases/constant.js';

const { database, commerce, number, image, datatype, string } = faker; 

export const generateProducts = () => {
  return {
    _id: database.mongodbObjectId(),
    title: commerce.product(),
    price: parseFloat(commerce.price()),
    stock: parseInt(number.int({max:100})),
    thumbnails: [image.url()],
    code: string.alphanumeric(5),
    description: commerce.productDescription(),
    status: datatype.boolean(),
    category: datatype.boolean() ? PRODUCTS_CATEGORY_MOTORCYCLE : PRODUCTS_CATEGORY_ACCESORIES,
    owner: database.mongodbObjectId()
  }
};
