const User = require('./user.model');

let users = [new User({name : "Init_user", login : 'init', password : 'pass'})];

const getAll = async () => users;

const getById = async (id) => {
    const list = users.filter((user) => id === user.id);
    return list.length ? list[0] : null;
}

const save = async (params) => {
    const user = new User(params);
    users.push(user);
    return user;
};

const remove = (id) => {
    users = users.filter((user) => user.id !== id);
};

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

module.exports = { getAll, getById, save, remove, update };
