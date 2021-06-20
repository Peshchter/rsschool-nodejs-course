import * as uuid from 'uuid';
import {Entity, Column as clm, PrimaryColumn} from 'typeorm';
import {Column} from '../columns/column.model';

/**
 * @class Board
 * @property {string} id
 * @property {string} title
 * @property {Column[]} columns
 */
@Entity("boards")
export class Board {
    @PrimaryColumn()
    id: string;

    @clm()
    title: string;

    @clm({
        type: 'jsonb',
        nullable: true,
    })
    columns?: Column[];

    constructor(params?: Partial<Board>
                // {
                //     id = uuid.v4(),
                //     title = 'Board_title',
                //     columns: [],
                // } = {}
    ) {
        this.id = uuid.v4();
        this.title = 'Board_title';
        // if (columns.length) {
        //     this.columns = columns.map((item) => new Column(item));
        // } else {
        //     this.columns = columns;
        // }
        Object.assign(this, params);
    }

    /**
     * prepare model to response
     * @param {Board} board - board to response
     * @returns {{ string, string, Columns[] }} { id, title, columns } - fields of model to represent
     */
    static toResponse(board: Board) {
        const {id, title, columns} = board;
        return {id, title, columns};
    }
}

