import * as uuid from 'uuid';
import {Entity, Column, PrimaryColumn}  from 'typeorm';

/**
 * @class User
 * @property {string} id
 * @property {string} name
 * @property {string} login
 * @property {string} password
 */
@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  name: string;

  @Column()
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
  static toResponse(user : User): {id: string, name: string, login: string} {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export type UserDTO = Omit<User, 'id'>
