const message = [
  {
    _id: '651ca30ad210bac88d4f85c3',
    user: 'lade',
    message: 'hola'
  }
];

export class MessagesManager {
  constructor(path) {
    this.path = path;
  }

  newMessage = async(msg) => { 
    try{
      // To Do
      return message[0];

    } catch (error) {
      throw new Error(error.message);
    }
  }

  getAllMessage = async() => {
    try{
      // To Do
      return message;

    } catch (error) {
      throw new Error(error.message);
    }
  }

  deleteMessage = async (id) => {
    try{
      // To Do
      return message[0];

    } catch (error) {
      throw new Error(error.message);
    }
  }
}
