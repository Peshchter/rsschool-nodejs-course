/**
 * @namespace UserRepo
 */
const User = require('./user.model');

/**
 * Array of users
 * @type User[]
 * @memberof UserRepo
 */
let users = [new User({name : "Init_user", login : 'init', password : 'pass'})];

/**
 * get all users from database
 * @memberof UserRepo
 * @returns {User[]}
 */
const getAll = async () => users;

/**
 * get user by its ID
 * @param {number} id - ID number of user
 * @returns {User}
 */
const getById = async (id) => {
    const list = users.filter((user) => id === user.id);
    return list.length ? list[0] : null;
}

/**
 * Creates the User and saves to DB
 * @param {...User} params - Object with reqiured fields for creating User
 * @returns {User}
 */
const save = async (params) => {
    const user = new User(params);
    users.push(user);
    return user;
};

/**
 * removes the User from DB by his ID
 * @param {number} id - ID of User for delete
 */
const remove = (id) => {
    users = users.filter((user) => user.id !== id);
};

/**
 * update User fields in DB
 * @param {number} id - ID of User to update
 * @param {Object<User>} body - Object with updating fields 
 * @returns {User} - Updated User
 */
const update = (id, body) => {
    const position = users.map( (element) => element.id ).indexOf(id);
    if (body.name) {
        users[position].name = body.name;
    }
    if (body.login) {
        users[position].login = body.login;
    }
    if (body.password) {
        users[position].password = body.password;
    }
    return users[position];
};

/**
 * Exports reqiured functions
 */
module.exports = { getAll, getById, save, remove, update };
