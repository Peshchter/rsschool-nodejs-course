import * as uuid from 'uuid';

/**
 * @class Column
 * @property {string} id
 * @property {string} title
 * @property {number} order
 */
export class Column {
    id: string;

    title: string;

    order: number;

    constructor({
                    id = uuid.v4(),
                    title = 'column_title',
                    order = 1

                } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
}
