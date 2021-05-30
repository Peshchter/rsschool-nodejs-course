/**
 * @namespace BoardRepo
 */
const Board = require('./board.model');

/**
 * Array of boards
 * @type Board[]
 * @memberof BoardRepo
 */
let boards = [new Board({title : "test_board"})];

/**
 * Get all boards from database
 * @memberof BoardRepo
 * @returns {Board[]}
 */
const getAll = async () => boards;

/**
 * Get board by its ID
 * @memberof BoardRepo
 * @param {string} id - ID number of board
 * @returns {Board}
 */
const getById = async (id) => {
    const list = boards.filter((board) => id === board.id);
    return list.length ? list[0] : null;
}

/**
 * Creates the Board and saves to DB
 * @memberof BoardRepo
 * @param {...Board} params - Object with required fields for creating Board
 * @returns {Board}
 */
const save = async (params) => {
    const board = new Board(params);
    boards.push(board);
    return board;
};

/**
 * Removes the Board from DB by his ID
 * @memberof BoardRepo
 * @param {string} id - ID of Board for delete
 */
const remove = (id) => {
    boards = boards.filter((board) => board.id !== id);
};

/**
 * Update Board fields in DB
 * @memberof BoardRepo
 * @param {string} id - ID of Board to update
 * @param {Object<Board>} body - Object with updating fields
 * @returns {Board} - Updated Board
 */
const update = (id, body) => {
    const position = boards.map( (element) => element.id ).indexOf(id);
    if (body.title) {
        boards[position].title = body.title;
    }
    return boards[position];
};

/**
 * Exports functions from the module
 */
module.exports = { getAll, getById, save, remove, update };
