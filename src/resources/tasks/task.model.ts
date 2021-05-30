import * as uuid from 'uuid';

/**
 * @class Task
 * @property {string} id
 * @property {string} title
 * @property {number} order
 * @property {string} description
 * @property {string | null} userId
 * @property {string| null} boardId
 * @property {string| null} columnId
 */

export class Task {
    id: string;

    title: string;

    order: number;

    description: string;

    userId: string | null = null;

    boardId: string | null = null;

    columnId: string | null = null;

    constructor(params?: Partial<Task>
                // {
                //             id = uuid.v4(),
                //             title = 'Simple_Task',
                //             order = 1,
                //             description = '',
                //             userId ,
                //             boardId,
                //             columnId,
                //         } = {}
    ) {
        this.id = uuid.v4();
            this.title = 'Simple_Task';
            this.order = 1;
            this.description = '';
            Object.assign(this, params);
        // this.id = id;
        // this.title = title;
        // this.order = order;
        // this.description = description;
        // this.userId = userId;
        // this.boardId = boardId;
        // this.columnId = columnId;
    }

    static toResponse(task: Task) {
        const {
            id,
            title,
            order,
            description,
            userId,
            boardId,
            columnId
        } = task;
        return {
            id,
            title,
            order,
            description,
            userId,
            boardId,
            columnId
        };
    }
}

