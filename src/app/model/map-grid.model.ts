import { Row } from './row.model';

export class MapGrid {
    constructor(rows: Row[]) {
        this.rows = rows;
    }
    rows: Row[];
}
