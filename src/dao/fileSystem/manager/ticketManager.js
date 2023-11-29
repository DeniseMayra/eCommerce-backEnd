
const ticket = {
  code: 'c373115f-1215-4d9a-aaa3-c0bcff5b2a00',
  purchase_datetime: '2023-11-28T23:29:28.245Z',
  amount: 100,
  purchaser: 'dm@gmail.com'
};

export class TicketManager {

  addTicket = () => {
    return ticket;
  }

  getTickets = async() => {
    return [ticket];
  }
}
