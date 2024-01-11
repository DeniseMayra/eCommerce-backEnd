import { app } from '../src/app.js';
import { expect } from 'chai';
import supertest from 'supertest';
import { ROLE_ADMIN, ROLE_USER } from '../src/clases/constant.js';
import { usersModel } from '../src/dao/mongo/models/users.model.js';
import { productModel } from '../src/dao/mongo/models/product.model.js';
import { cartModel } from '../src/dao/mongo/models/cart.model.js';

const requester = supertest(app);

describe('Test app Ecommerce', function(){
  const admin = { first_name: 'denise', email: 'deniise001@gmail.com',  password: 'codertest', role: ROLE_ADMIN};
  const user = { first_name: 'denise', email: 'deniise@gmail.com',  password: 'codertest', role: ROLE_USER};
  let cookie = {};
  let cookieResponse = '';
  let products = [];
  let carts = [];
  let prodToDeleteFromCart = {};

  describe('Test endpoint session', function(){
    before(async function(){
      await usersModel.deleteMany({});
      await cartModel.deleteMany({});
    });

    it('Create User /api/sessions/signup POST', async function(){
      const response = await requester.post('/api/sessions/signup').send(admin);
      await requester.post('/api/sessions/signup').send(user);
      expect(response.statusCode).to.be.equal(200);
    });
      
    it('login', async function(){
      const responseLogin = await requester.post('/api/sessions/login').send(admin);
      cookieResponse = responseLogin.header['set-cookie'][0];
      cookie = {
        name: cookieResponse.split('=')[0],
        value: cookieResponse.split('=')[1]
      }
      expect(cookie.name).to.be.equal('accessToken');
    });
  })

  describe('Test endpoint products', function(){
    before(async function(){
      await productModel.deleteMany({});
    });

    it('Verify Auth when create product /api/products POST', async function(){
      const product = {
        title: 'prueba', price: 1500, stock: 15, category: 'acc', code: 'sd12'
      };
      const response = await requester.post('/api/products').send(product);
      expect(response.statusCode).to.be.equal(401);
    });

    it('Create Product /api/products POST using /mockingProduct', async function(){
      const responseMock = await requester.post('/api/products/mockingproducts').send();
      const productArray = JSON.parse(responseMock.text).mock;
     
      productArray.forEach(async(prod) => {
        await requester.post('/api/products').set('Cookie', [cookieResponse]).send(prod);
      });
    });

    it('get products', async function(){
      const responseGetProducts = await requester.get('/api/products').send();
      products = JSON.parse(responseGetProducts.text).payload;
      // console.log("🚀 ~ file: integration.test.js:58 ~ it ~ productDBArray:", products);
      expect(responseGetProducts.statusCode).to.be.equal(200);
    });

    
    it('put product', async function(){
      const updateProd = { ...products[0], title: 'test put prod' };
      const responsePutProducts = await requester.put(`/api/products/${products[0]._id}`).set('Cookie', [cookieResponse]).send(updateProd);
      expect(responsePutProducts.statusCode).to.be.equal(200);
    });

    it('delete product', async function(){
      const responseDeleteProducts = await requester.delete(`/api/products/${products[1]._id}`).set('Cookie', [cookieResponse]).send();
      expect(responseDeleteProducts.statusCode).to.be.equal(200);
    })

    it('get product by id (modify prod)', async function(){
      const responseProducts = await requester.get(`/api/products/${products[0]._id}`).set('Cookie', [cookieResponse]).send();
      // console.log("🚀 ~ file: integration.test.js:58 ~ it ~ modify:", JSON.parse(responseProducts.text));
      expect(responseProducts.statusCode).to.be.equal(200);
    });

    it('get product by id (delete prod)', async function(){
      const responseProducts = await requester.get(`/api/products/${products[1]._id}`).set('Cookie', [cookieResponse]).send();
      // console.log("🚀 ~ file: integration.test.js:58 ~ it ~ delete:", JSON.parse(responseProducts.text));
    });

  });

  describe('Test endpoint cart', function(){
    before(async function(){
      await cartModel.deleteMany({});
    });

    it('Create cart', async function(){
      await requester.post('/api/carts').send();
      const response = await requester.post('/api/carts').send();
      expect(JSON.parse(response.text).error).to.be.equal(false);
    });
  
    it('Get carts', async function(){
      const response = await requester.get('/api/carts').send();
      expect(JSON.parse(response.text).error).to.be.equal(false);
      carts = JSON.parse(response.text).data;
      // console.log( JSON.parse(response.text));
    });
    
    it('Delete cart', async function(){
      const response = await requester.delete(`/api/carts/${carts[1]._id}`).send();
      expect(response.statusCode).to.be.equal(200);
    });
    
    it('Add prod in cart', async function(){
      let prod = await requester.get('/api/products').send();
      prod = JSON.parse(prod.text).payload[0];
      prodToDeleteFromCart = prod;

      await requester.get('/api/sessions/logout').send();      

      const responseLogin = await requester.post('/api/sessions/login').send(user);      
      const cookieResponseUser = responseLogin.header['set-cookie'][0];
     
      const response = await requester.post(`/api/carts/${carts[0]._id}/products/${prod._id}`).set('Cookie', [cookieResponseUser]).send();
      expect(JSON.parse(response.text).error).to.be.equal(false);
    });

    it('Get cart by Id', async function(){
      const response = await requester.get(`/api/carts/${carts[0]._id}`).send();
      expect(JSON.parse(response.text).error).to.be.equal(false);
      // console.log( JSON.parse(response.text));
    });

    it('Delete prod in cart', async function(){
      const responseLogin = await requester.post('/api/sessions/login').send(user);      
      const cookieResponseUser = responseLogin.header['set-cookie'][0];
     
      const response = await requester.delete(`/api/carts/${carts[0]._id}/products/${prodToDeleteFromCart._id}`).set('Cookie', [cookieResponseUser]).send();
      expect(JSON.parse(response.text).error).to.be.equal(false);

      const getcarts = await requester.get('/api/carts').send();
      // console.log( JSON.parse(getcarts.text));
    });
  });
});
