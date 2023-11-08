import fs from 'fs';
import { randomUUID } from 'crypto';

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct = async(object) => { 
        try{
            if (object.title && object.description && object.price && object.status && object.thumbnails && object.stock
                && object.category && object.code) {

                const allProducts = await this.getProducts();

                if (this.isValidCode(object.code, allProducts)){

                    do {
                        object = { ...object, id: randomUUID() };
                    } while (!this.isValidId(object.id, allProducts));

                    allProducts.push(object);
                    await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'));
                    return {error: false, product: object};
                } else {
                    return {error: true, message:`Error: Codigo ${object.code} ya existente`};
                }
            } else {
                return {error: true, message:'Faltan datos'};
            } 
        } catch (error) {
            throw new Error(error.message);
        }
    }

    isValidCode = (code, allProducts) => {
        const product = allProducts.find(ele => ele.code === code);
        if (product) {
            return false;
        } else {
            return true;
        }
    }

    isValidId = (id, allCarts) => {
        const cart = allCarts.find(ele => ele.id === id);
        if (cart) {
          return false;
        } else {
          return true;
        }
    }

    getProducts = async() => {
        try{
            const allProducts =  await fs.promises.readFile(this.path, 'utf-8');
            if (!allProducts) {
                return [];
            } else {
                return JSON.parse(allProducts);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    getProductById = async(id) => {
        try{
            const allProducts = await this.getProducts();
            const productById = allProducts.find(ele => ele.id === id);
    
            if (productById){
                return {error: false, product: productById};
            } else {
                return {error: true, message: 'Id no encontrado'};
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    updateProduct = async (id, objectModify) => {
        try {
            if (objectModify.title && objectModify.description && objectModify.price && objectModify.status && objectModify.thumbnails && objectModify.stock
                && objectModify.category && objectModify.code && !objectModify.id) {

                const allProducts = await this.getProducts();

                let productExist = false;
                let codeExist = false;

                allProducts.forEach(prod => {
                    if (prod.id === id){
                        productExist = true;

                        if (objectModify.code !== prod.code && !this.isValidCode(objectModify.code, allProducts)){
                            codeExist = true;
                            return false;
                        }

                        prod.code = objectModify.code;
                        prod.title = objectModify.title;
                        prod.description = objectModify.description;
                        prod.price = objectModify.price;
                        prod.status = objectModify.status;
                        prod.stock = objectModify.stock;
                        prod.category = objectModify.category;
                        prod.thumbnails = objectModify.thumbnails;
                    }
                });

                if (productExist){
                    if (codeExist){
                        return {error: true, message:`Error: Codigo ${objectModify.code} ya existente`};
                    } else {
                        await fs.promises.writeFile(this.path, JSON.stringify(allProducts, null, '\t'));
                        return {error: false, product: {...objectModify, id}};
                    }
                } else {
                    return {error: true, message:`Id no encontrado`};
                }
            } else {
                return {error: true, message:'Faltan datos'};
            } 
        } catch (error) {
            throw new Error(error.message);
        }
    }

    deleteProduct = async (id) => {
        try{
            let products = await this.getProducts();
            const deleteP = products.find(p => p.id === id);
            
            if (deleteP){
                products = products.filter(prod => prod.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return {error: false, product: deleteP};
            } else {
                return {error: true, message:`Id no encontrado`};
            }
        } catch (error){
            throw new Error(error.message);
        }
    }
}

  