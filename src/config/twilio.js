import twilio from 'twilio';
import { config } from './config.js';

export const twilioCliente = twilio(config.twilio.account, config.twilio.token);

// app.post('/sms', async(req,res) => {
//   try {
//     const result = await twilioCliente.messages.create({
//       from: config.twilio.phone,
//       to: config.client.phone,
//       body: 'Te hackie la cuenta'
//     });
//     console.log(result);
//     res.json({error: false, message: 'Sms enviado correctamente'});

//   } catch (error) {
//     console.log(error);
//     res.json({error: true, message: 'Error al enviar sms'});
//   }
// })
