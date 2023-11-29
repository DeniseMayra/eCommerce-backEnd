const response = {
  accepted: [ 'deniiise.mayra@gmail.com' ],
  rejected: [],
  ehlo: [
    'SIZE 35882577',
    '8BITMIME',
    'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
    'ENHANCEDSTATUSCODES',
    'PIPELINING',
    'CHUNKING',
    'SMTPUTF8'
  ],
  envelopeTime: 638,
  messageTime: 1669,
  messageSize: 168076,
  response: '250 2.0.0 OK  1700697205 v3-20020aa78503000000b006cb5bf76772sm35925pfn.136 - gsmtp',
  envelope: {
    from: 'deniiise.mayra@gmail.com',
    to: [ 'deniiise.mayra@gmail.com' ]
  },
  messageId: '<4cfa891c-78ba-450f-b61a-a694e0558b4e@gmail.com>'
}

// const template = `<div>
//   <h1>Bienvenido a la app</h1><br>
//   <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.postermywall.com%2Findex.php%2Fart%2Ftemplate%2F8c69d752fc403768150adddaa3571a46%2Fonline-welcome-design-template&psig=AOvVaw3bkLwPRNhXMdMQA5DoS9p4&ust=1700694995435000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjuiduc1oIDFQAAAAAdAAAAABAF" alt="">
//   <img src="cid:yamaha"/>
//   </div>
// `;

// app.post('/send-mail', async(req,res) => {
//   try {
//     const result = await transport.sendMail({
//       from: config.gmail.account,
//       to: 'deniiise.mayra@gmail.com',
//       subject: 'Registro exitoso',
//       html: template,
//       attachments: [
//         {
//           filename: 'r6.jpg',
//           path: path.join(__dirname, '/assets/images/r6.jpg'),
//           cid: 'yamaha'
//         },
//         {
//           filename: 'conditions.doc',
//           path: path.join(__dirname, '/assets/documents/conditions.doc')
//         }
//       ]
//     });
//     console.log(result);
//     res.json({error: false, message: 'Enviado'});

//   } catch (error) {
//     console.log(error);
//     res.json({error: true, message: 'Error al enviar mail'});
//   }
// })
