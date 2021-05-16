const uuid = require('uuid');
const Column = require('../columns/column.model');

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

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
