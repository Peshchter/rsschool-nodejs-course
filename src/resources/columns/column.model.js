const uuid = require('uuid');

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

  static toResponse(column) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}

module.exports = Column;
