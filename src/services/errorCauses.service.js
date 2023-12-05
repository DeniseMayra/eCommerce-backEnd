export const userCreateError = (user) => {
  return `mensaje del eerror`;
}

export const idNotFound = (id) => {
  return `El ID ingresado: ${id} no fue encontrado en DB`;
}

export const productRequired = (body) => {
  return `Los siguientes campos son requeridos:
    title: ${body.title},
    price: ${body.price},
    stock: ${body.stock},
    category: ${body.category},
    code: ${body.code}
  `;
}

export const notProductById = (id) => {
  return `El Id: ${id}, ingresado por parametro es incorrecto`;
}
