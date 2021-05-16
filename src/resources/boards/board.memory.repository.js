const Board = require('./board.model');

let boards = [new Board({title : "test_board"})];

const getAll = async () => boards;

const getById = async (id) => {
    const list = boards.filter((board) => id === board.id);
    return list.length ? list[0] : null;
}

const save = async (params) => {
    const board = new Board(params);
    boards.push(board);
    return board;
};

const remove = (id) => {
    boards = boards.filter((board) => board.id !== id);
};

const update = (id, body) => {
    const position = boards.map( (element) => element.id ).indexOf(id);
    if (body.title) {
        boards[position].title = body.title;
    }
    return boards[position];
};

module.exports = { getAll, getById, save, remove, update };
