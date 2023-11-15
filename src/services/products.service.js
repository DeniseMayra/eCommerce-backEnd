import { productsDAOfs } from '../dao/dao-fs-manager.js';
import { productsDAOmongo } from '../dao/dao-mongo-manager.js';

const mongo = true;
let daoManager = productsDAOmongo;
if (!mongo){
  daoManager = productsDAOfs;
}

export class ProductsService {

  // static getProducts(req) {
  //   return this.getProductsMongo(req)
  // }

  static getById(pid) {
    return daoManager.getProductById(pid);
  }

  static addProduct(product) {
    return daoManager.addProduct(product);
  }

  static update(pid, newProduct){ 
    return daoManager.updateProduct(pid, newProduct);
  }
  
  static delete(pid){
    return daoManager.deleteProduct(pid);
  }

  static getProductsMongo = async (req) => {
    const { limit=2, page=1, sort=1 } = req.query;
    const query = {};
    const paginattionOpt = {
      limit,
      page,
      sort: {price: sort},
    };
    const result = await daoManager.getProducts( query, paginattionOpt ); //array
  
    const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  
    return {
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages, page: result.page, hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage, prevPage: result.prevPage, nextPage: result.nextPage,
      prevLink: result.hasPrevPage ? getPrevLink(baseUrl, result) : null,
      nextLink: result.hasNextPage ? getNextLink(baseUrl, result) : null
    };
  };
  
}
function getPrevLink(baseUrl, result) {
  return baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`);
};
function getNextLink (baseUrl, result) {
  return baseUrl.includes('page') ? baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`);
};
