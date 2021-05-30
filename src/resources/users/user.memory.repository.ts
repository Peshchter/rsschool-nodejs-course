/**
 * @namespace UserRepo
 */
import {User} from './user.model';

/**
 * Array of users
 * @type User[]
 * @memberof UserRepo
 */
let users = [new User({name : "Init_user", login : 'init', password : 'pass'})];

/**
 * Get all users from database
 * @memberof UserRepo
 * @returns {User[]}
 */
const getAll = async () => users;

/**
 * Get user by its ID
 * @memberof UserRepo
 * @param {string} id - ID number of user
 * @returns {User}
 */
const getById = async (id: string) => {
    const list = users.filter((user) => id === user.id);
    return list.length ? list[0] : null;
}

/**
 * Creates the User and saves to DB
 * @memberof UserRepo
 * @param {...User} params - Object with required fields for creating User
 * @returns {User}
 */
const save = async (params: User) => {
    const user = new User(params);
    users.push(user);
    return user;
};

/**
 * Removes the User from DB by his ID
 * @memberof UserRepo
 * @param {string} id - ID of User for delete
 */
const remove = (id: string) => {
    users = users.filter((user) => user.id !== id);
};

/**
 * Update User fields in DB
 * @memberof UserRepo
 * @param {string} id - ID of User to update
 * @param {Object<User>} body - Object with updating fields 
 * @returns {User} - Updated User
 */
const update = (id: string, body: User) => {
    const position = users.map( (element) => element.id ).indexOf(id);
    if(position) {
        if (body.name) {
            users[position]!.name = body.name;
        }
        if (body.login) {
            users[position]!.login = body.login;
        }
        if (body.password) {
            users[position]!.password = body.password;
        }
    }
    return users[position];
};

/**
 * Exports required functions
 */
module.exports = { getAll, getById, save, remove, update };
