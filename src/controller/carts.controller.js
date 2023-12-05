import { CartsService } from '../services/carts.service.js';
import { v4 as uuidv4} from 'uuid';
import { ProductsService } from '../services/products.service.js';
import { TicketsService } from '../services/tickets.service.js';
import { transport } from '../config/gmail.js';
import { config } from '../config/config.js';

export class CartsController {

  static create = async (req,res) => {
    try{
      const result = await CartsService.create(); //object
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
  
  static getById = async (req,res) => {
    try{
      const result = await CartsService.getById(req.params.cid); //object
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
  
  static addProduct = async (req,res) => {
    try{
      const { quantity } = req.body;

      const productRes = await ProductsService.getById(req.params.pid);
      if ( productRes ){
        
        const newProduct = {
          product: req.params.pid,
          quantity: quantity ?? 1
        };
        const result = await CartsService.addProduct(req.params.cid, newProduct); //object
        res.json({error: false, data: result, message: ''});
      }

    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };
  
  static deleteProduct = async (req,res) => {
    try{
      const result = await CartsService.deleteProduct(req.params.cid, req.params.pid); //object
      res.json({error: false, data: result, message: ''});
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static getAllCarts = async (req,res) => {
    try{
      const result = await CartsService.getAllCarts(); //array
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static deleteCart = async (req,res) => {
    try {
      const result = await CartsService.deleteCart(req.params.id);
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  };

  static purchaseCart = async (req,res) => {
    try {
      const cart = await CartsService.getById(req.params.cid); //object
      
      const successProducts = [];
      let totalAmount = 0;
      const rejectedProducts = [];

      if ( cart.products.length ){
        cart.products.forEach(prodInCart => {
          if ( prodInCart.product.stock >= prodInCart.quantity ){
            totalAmount += prodInCart.quantity * prodInCart.product.price;
            const updateProdDB = {...prodInCart.product, stock: prodInCart.product.stock - prodInCart.quantity};
            ProductsService.update(prodInCart.product._id, updateProdDB);
            successProducts.push(prodInCart);
          } else {
            rejectedProducts.push(prodInCart);
          }
        });

        const newTicket = {
          code: uuidv4(),
          purchase_datetime: new Date(),
          amount: totalAmount,
          purchaser: req.user?.email ?? ''
        };

        TicketsService.add(newTicket);

        if ( req.user.email ){
          const template = `<div>
            <h4> ${req.user?.first_name ?? ''} </h4><br>
            <img src="https://i.pinimg.com/736x/e8/de/a9/e8dea964ee60ba898cbeb98bd92659cb.jpg" alt=""> <br><br>
            <b>Codigo de seguimiento: <b> <span>${newTicket.code}</span> <br><br>
            <b>Total de la compra: <b> <span>${newTicket.amount}</span> <br><br>
            ${successProducts}
            </div>
          `;
  
          transport.sendMail({
            from: config.gmail.account,
            to: req.user.email,
            subject: 'Realizaste la compra',
            html: template
          });
        }

        if ( rejectedProducts.length ){
          if ( successProducts.length ){
            res.json({erorr: false, message: 'Algunos productos no tienen stock', data: {ticket: newTicket, success: successProducts, reject: rejectedProducts}});

          } else {

            res.json({erorr: true, message: 'El/Los productos no tienen stock', data: {ticket: newTicket, success: null, reject: rejectedProducts}});
          }
        } else {
          res.json({error: false, message: 'Compra hecha', data: {ticket: newTicket, success: successProducts, reject: null}})
        }

      } else {
        res.json({error: true, message: 'carrito vacio', data: null});
      }
     
      
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
      
    }
  }

  static getTickets = async (req,res) => {
    try{
      const result = await TicketsService.get(); 
      res.json({error: false, data: result, message: ''});
  
    } catch (error) {
      res.status(500).json({error: true, data: null, message: error.message});
    }
  }
}
