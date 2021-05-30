const uuid = require('uuid');

export interface IUserFields {
  name: string;
  login: string;
  password: string;
}
/**
 * @class User
 * @property {string} id
 * @property {string} name
 * @property {string} login
 * @property {string} password
 */
export class User implements IUserFields{
  id: string;
  login: string;
  name: string;
  password: string;

  /**
   * @constructor
   * @param {User} [body] - request body containing required fields
   */
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

/**
 * prepare model to response
 * @param {User} user - User to response
 * @returns {{ string, string, string }} { id, name, login } - fields of model to represent
 */
  static toResponse(user : User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
