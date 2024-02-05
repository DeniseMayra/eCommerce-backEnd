let cartId = '';
const totalPrice = document.getElementById('total-price');

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const response = await fetch('/api/sessions/cart', {
      headers: {
        "Content-type": 'application/json'
      },
      method: 'get'
    });
    const result = await response.json();
    if (!result.error){
      cartId = result.user.cartId;
      
      let price = 0;
      if ( result.cart.products ){
        result.cart.products.forEach(prod => {
          price += prod.quantity * prod.product.price;
        })
      }
      totalPrice.innerHTML = price;
    }
    
  } catch (error) {
    console.log(error);
  }
})

const deleteProductFromCart = async (pid) => {
  try {
    const options = {headers: {
        "Content-type": 'application/json'
      },
      method: 'DELETE'
    }
    const response = await fetch(`/api/carts/${cartId}/products/${pid}`, options);
    const result = await response.json();

    if ( !result.error ){
      alert('Producto Eliminado');
      location.reload();
    }

  } catch (error) {
    console.log(error);
  }
}

const purchase = async () => {
  try {
    const options = {headers: {
        "Content-type": 'application/json'
      },
      method: 'post'
    }
    const response = await fetch(`/api/carts/${cartId}/purchase`, options);
    const result = await response.json();

    if ( result.error ){
      alert('Hubo un error: ' + result.message);

    } else {
      alert(result.message + '. Se envio un email con los detalles de la compra.');
      window.location.href = '/products';
    }

  } catch (error) {
    console.log(error);
  }
}
