import { productsService } from '../dao/mongo/services.js';
import { SUCCESS } from './constant.js';

export const getProductsMongo = async (req) => {
  const { limit=2, page=1, sort=1 } = req.query;
  const query = {};
  const paginattionOpt = {
    limit,
    page,
    sort: {price: sort},
  };
  const result = await productsService.getProducts( query, paginattionOpt ); //array

  const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  return {
    status: SUCCESS,
    payload: result.docs,
    totalPages: result.totalPages, page: result.page, hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage, prevPage: result.prevPage, nextPage: result.nextPage,
    prevLink: result.hasPrevPage ? getPrevLink(baseUrl, result) : null,
    nextLink: result.hasNextPage ? getNextLink(baseUrl, result) : null
  };
};

function getPrevLink(baseUrl, result) {
  return baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`);
};
function getNextLink(baseUrl, result) {
  return baseUrl.includes('page') ? baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`);
};
