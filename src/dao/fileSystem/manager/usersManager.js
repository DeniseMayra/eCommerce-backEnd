const user = [
  {
    _id: '652d4bb28be86625fbdadfdb',
    first_name: 'denise',
    last_name: 'mayra',
    email: 'denichula@g.com',
    age: null,
    password: '$2b$10$ThJzQdsGac8VBjML8x5/nu6Ockz.NMQXP3AbGcfvPFMYwIBj4zpl2',
    cartId: '651f6661f0f110960f1f1dfb',
    role: 'admin'
  }
];


export class UserManager {
  constructor(path) {
    this.path = path;
  }

  signupNewUser = async(object) => {
    try {
      // To Do
      return user[0];
      
    } catch (error) {
      throw new Error(error.message);
    }
  };

  loginUser = async(object) => {
    try {
      // To Do
      return { status: SUCCESS,  data: user[0], message: ''};
      
    } catch {
      throw new Error(error.message);
    }
  };

  findByEmail = async (email) => {
    try {
      // To Do
      return user[0];

    } catch (error) {
      throw new Error(error.message);
    }
  };

  createNewUser = async(newUser) => {
    try {
      // To Do
      return user[0];

    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateUser = async(newUser) => {
    try {
      // To Do
      return user[0];

    } catch (error) {
      throw new Error(error.message);
    }
  };
}
