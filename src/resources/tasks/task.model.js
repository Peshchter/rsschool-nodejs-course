const uuid = require('uuid');

/**
 * @class Task
 * @property {string} id
 * @property {string} title
 * @property {number} order
 * @property {string} description
 * @property {string} userId
 * @property {string} boardId
 * @property {string} columnId
 */

class Task {
  constructor({
    id = uuid.v4(),
      title = 'Simple_Task',
      order = 1,
      description = '',
      userId,
      boardId,
      columnId
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId } = task;
    return { id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId};
  }
}

module.exports = Task;
