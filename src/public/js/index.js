const userCartId = document.getElementById('cart-id').innerHTML;


const addToCart = async (pid) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify({quantity: 1})
    }
    const response = await fetch(`/api/carts/${userCartId}/products/${pid}`, options)
    
    const result = await response.json();
  
    let showAlertMesasage = 'Producto Agregado';
    if (result.error){
      showAlertMesasage = `Error al agregar en el carrito. ${result.message}`;
    }
    alert(showAlertMesasage);
    
  } catch (error) {
    console.log(error);
  }
}


