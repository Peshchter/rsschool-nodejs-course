const uuid = require('uuid');

/**
 * @class User
 */
class User {
  /**
   * @constructor
   * @param {Object} [body] - request body containing required fields
   */
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    /**
    * @property {number} id
    */
    this.id = id;
    /**
    * @property {string} name
    */
    this.name = name;
    /**
    * @property {string} login
    */
    this.login = login;
    /**
    * @property {string} password
    */
    this.password = password;
  }

/**
 * prepare model to response
 * @param {User} user - User to response
 * @returns {...User} - fields of model to represent
 */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
