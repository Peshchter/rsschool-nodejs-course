const uuid = require('uuid');
const Column = require('../columns/column.model');

/**
 * @class Board
 * @property {string} id
 * @property {string} title
 * @property {Column[]} columns
 */
class Board {
    constructor({
                    id = uuid.v4(),
                    title = 'Board_title',
                    columns = [],
                } = {}) {
        this.id = id;
        this.title = title;
        if (columns.length) {
            this.columns = columns.map((item) => new Column(item));
        } else {
            this.columns = columns;
        }
    }

    /**
     * prepare model to response
     * @param {Board} board - board to response
     * @returns {{ string, string, Columns[] }} { id, title, columns } - fields of model to represent
     */
    static toResponse(board) {
        const {id, title, columns} = board;
        return {id, title, columns};
    }
}

module.exports = Board;
