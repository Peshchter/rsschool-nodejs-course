import * as uuid from 'uuid';
import {Entity, Column, PrimaryColumn}  from 'typeorm';

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
@Entity("tasks")
export class Task {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    order: number;

    @Column()
    description: string;

    @Column({type:"varchar",nullable: true})
    userId: string | null = null;

    @Column({type:"varchar",nullable: true})
    boardId: string | null = null;

    @Column({type:"varchar",nullable: true})
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

