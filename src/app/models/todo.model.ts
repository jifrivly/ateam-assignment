export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export class Todo implements ITodo {
    constructor(public userId: number, public id: number, public title: string, public completed: boolean) {}
}
