import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from 'src/app/models';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
    @Input() todo!: Todo;

    constructor(private activeModal: NgbActiveModal) {}

    ngOnInit(): void {}

    close() {
        this.activeModal.close();
    }
}
