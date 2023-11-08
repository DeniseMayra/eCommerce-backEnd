const cartId = '651f6661f0f110960f1f1dfb';
const url = 'http://localhost:8080';

function addToCart(pid) {
  const options = {
    method: 'POST',
    body: JSON.stringify({quantity: 1})
  }
  fetch(`${url}/api/carts/${cartId}/products/${pid}`, options)
  .then(function(response){
    if (response.status === 200){
      alert('Producto Agregado');
    }
  });
}

function deleteProductFromCart(pid) {
  const options = {
    method: 'DELETE',
  }
  fetch(`${url}/api/carts/${cartId}/products/${pid}`, options)
  .then(function(response){
    if (response.status === 200){
      alert('Producto Eliminado');
    }
    location.reload();
  });
}
