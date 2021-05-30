/**
 * @namespace TaskRepo
 */
const Task = require('./task.model');

/**
 * Array of tasks
 * @type Task[]
 * @memberof TaskRepo
 */
let tasks = [new Task({title : "test_task"})];

/**
 * Get all tasks from database
 * @memberof TaskRepo
 * @returns {Task[]}
 */
const getAll = async () => tasks;

/**
 * Get task by its ID
 * @memberof TaskRepo
 * @param {string} id - ID number of Task
 * @returns {Task}
 */
const getById = async (id) => {
    const list = tasks.filter((task) => id === task.id);
    return list.length ? list[0] : null;
}

/**
 * Creates the Task and saves to DB
 * @memberof TaskRepo
 * @param {...Task} params - Object with required fields for creating Task
 * @returns {Task}
 */

const save = async (params) => {
    const task = new Task({...params});
    tasks.push(task);
    return task;
};

/**
 * Removes the Task from DB by his ID
 * @memberof TaskRepo
 * @param {string} id - ID of Task for delete
 */
const remove = async (id) => {
    tasks = tasks.filter((task) => task.id !== id);
};


/**
 * Set UserId of the Task to NULL when User was deleted
 * @memberof TaskRepo
 * @param {string} userId - ID of User for delete
 * @returns {Task} task - Updated Task
 */
const removeUserId = async (userId) => {
    tasks = tasks.map((task) => {
        if (task.userId === userId){
            return {...task, userId: null};
        }
        return task;
});
};

/**
 * removes Task on Board when deleted Board
 * @memberof TaskRepo
 * @param {string} boardId - ID of Board for delete
 * @returns {void}
 */
const removeOnBoard = async (boardId) => {
    tasks = tasks.filter((task) => task.boardId !== boardId);
};

/**
 * Update Task fields in DB
 * @memberof TaskRepo
 * @param {string} id - ID of Task to update
 * @param {Object<Task>} body - Object with updating fields
 * @returns {Task} - Updated Task
 */
const update = async (id, body) => {
    const position = tasks.map( (element) => element.id ).indexOf(id);
    if (body.title) {
        tasks[position].title = body.title;
    }
    return tasks[position];
};

/**
 * Exports required functions from module
 */
module.exports = { getAll, getById, save, remove, update, removeUserId, removeOnBoard };
