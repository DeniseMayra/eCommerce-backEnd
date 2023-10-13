import { Router } from 'express';
import { cartsService, productsService } from '../dao/mongo/services.js';
import { SUCCESS } from '../clases/constant.js';

const router = Router();

router.get('/products', async(req,res) => {
  const { limit=2, page=1, sort=1 } = req.query;
  const query = {};
  const paginattionOpt = {
    limit,
    page,
    sort: {price: sort},
  }
  const result = await productsService.getProducts( query, paginattionOpt ); //array

  const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  const response = {
    status: SUCCESS,
    payload: result.docs,
    totalPages: result.totalPages, page: result.page, hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage, prevPage: result.prevPage, nextPage: result.nextPage,
    prevLink: result.hasPrevPage ? getPrevLink(baseUrl, result) : null,
    nextLink: result.hasNextPage ? getNextLink(baseUrl, result) : null
  };

  res.render('home', {data: response});
})

router.get('/cart', async(req,res) => {
  const result = await cartsService.getProductByCartId('651f6661f0f110960f1f1dfb');
  res.render('cart', {data: result.products});
})

function getPrevLink(baseUrl, result) {
  return baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`);
}
function getNextLink(baseUrl, result) {
  return baseUrl.includes('page') ? baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`);
}

export { router as viewsRouter};
