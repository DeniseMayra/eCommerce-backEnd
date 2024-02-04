import Jwt  from 'jsonwebtoken';
import { config } from '../config/config.js';
import { transport } from '../config/gmail.js';

export const generateEmailToken = ( email, expireTime ) => {
  const token = Jwt.sign({email}, config.gmail.token, {expiresIn: expireTime});
  return token;
};

export const sendChangePasswordEmail = async ( req, userEmail, token) => {
  const domain = `${req.protocol}://${req.get('host')}`; // el host puede ser www.algo.com
  const link = `${domain}/reset-password?token=${token}`;

  await transport.sendMail({
    from: 'Ecommerce',
    to: userEmail,
    subject: 'Restablecer contrasena',
    html: `
    <div>
      <h2>Hola !!</h2>
      <p>para Restablecer contrasena hacer click en siguiente enlace</p>
      <a href="${link}">
        <button>Restabecer</button>
      </a>
    </div>`
  });
};

export const verifyEmailToken = ( token ) => {
  try {
    const info = Jwt.verify(token, config.gmail.token);
    return info.email;

  } catch (error) {
    return null;
  }
}

export const sendDeleteUserEmail = async (user, userEmail, message) => {
  await transport.sendMail({
    from: 'Ecommerce',
    to: userEmail,
    subject: 'Usuario Eliminado',
    html: `
    <div>
      <h2>Hola !!</h2>
      <p>Nos comunicamos para informarle que su usuario ${user} ha sido eliminado.</p>
      <p>${message}</p>
    </div>`
  });
}

export const sendDeleteProductEmail = async (product, userEmail) => {
  await transport.sendMail({
    from: 'Ecommerce',
    to: userEmail,
    subject: 'Producto Eliminado',
    html: `
    <div>
      <h2>Hola !!</h2>
      <p>Nos comunicamos para informarle que el siguiente producto (creado por usted) ha sido eliminado:</p>
      <p>PRODUCTO: ${product.title}</p>
      <p>DESCRIPCION: ${product.description}</p>
      <p>CODIGO: ${product.code}</p>
    </div>`
  });
}
