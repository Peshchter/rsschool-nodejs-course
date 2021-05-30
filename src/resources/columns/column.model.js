const uuid = require('uuid');

/**
 * @class Column
 * @property {string} id
 * @property {string} title
 * @property {number} order
 */
class Column {
    constructor({
                    id = uuid.v4(),
                    title = 'column_title',
                    order = 1

                } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
    }

    /**
     * prepare model to response
     * @param {Column} column - column to response
     * @returns {{ string, string, number }} { id, title, order } - fields of model to represent
     */
    static toResponse(column) {
        const {id, title, order} = column;
        return {id, title, order};
    }
}

module.exports = Column;
