const Task = require('./task.model');

let tasks = [new Task({title : "test_task"})];

const getAll = async () => tasks;

const getById = async (id) => {
    const list = tasks.filter((task) => id === task.id);
    return list.length ? list[0] : null;
}

const save = async (params) => {
    const task = new Task({...params});
    tasks.push(task);
    return task;
};

const remove = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
};

const removeUserId = (userId) => {
    tasks = tasks.map((task) => {
        if (task.userId === userId){
            return {...task, userId: null};
        }
        return task;
});
};

const update = (id, body) => {
    const position = tasks.map( (element) => element.id ).indexOf(id);
    if (body.title) {
        tasks[position].title = body.title;
    }
    return tasks[position];
};

module.exports = { getAll, getById, save, remove, update, removeUserId };
