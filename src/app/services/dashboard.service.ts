import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Todo } from 'src/app/models';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com/todos';

    constructor(private http: HttpClient) {}

    getTodoList(): Observable<Todo[] | null> {
        return this.http.get<Todo[]>(this.jsonPlaceHolderUrl, { observe: 'response' }).pipe(map((res) => res.body));
    }
}
