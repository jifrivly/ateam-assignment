import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services';
import { Todo } from 'src/app/models';
import { DashboardService } from 'src/app/services';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoComponent } from './info/info.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort!: MatSort;

    todos: Todo[] = [];
    todoDataSource!: MatTableDataSource<Todo>;
    todoTableRows: string[] = ['id', 'userId', 'title', 'status'];

    constructor(
        private authService: AuthService,
        private snackBarService: MatSnackBar,
        private dashboardService: DashboardService,
        private modalService: NgbModal
    ) {
        this.todoDataSource = new MatTableDataSource(this.todos);
    }

    ngOnInit(): void {
        this.dashboardService.getTodoList().subscribe({
            next: (res) => {
                this.todos = res?.length ? res : [];
                this.todoDataSource.data = this.todos;
                this.todoDataSource.sort = this.sort;
            },
            error: (err) => console.error('Error while fetching Todos list', err),
        });
    }

    ngAfterViewInit(): void {
        this.todoDataSource.paginator = this.paginator;
        // this.todoDataSource.sort = this.sort;
    }

    searchTodos(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.todoDataSource.filter = filterValue.trim().toLowerCase();
    }

    openDetails(todo: Todo) {
        console.log(todo);
        const modalRef = this.modalService.open(InfoComponent, {
            backdrop: false,
            centered: false,
            keyboard: false,
            size: 'lg',
        });
        modalRef.componentInstance.todo = todo;
    }

    logout() {
        this.authService.logout();
        this.snackBarService.open('You Are LoggedOut', 'OK', { duration: 2000 });
    }
}
