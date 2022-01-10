import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
    @Output() getPassword: EventEmitter<string> = new EventEmitter<string>();
    // regexPattern: string = '(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.?/~_+-=|])';
    regexPattern: RegExp = /^(?=.*[A-Z])(?=.*[1-9])(?=.*\W).*$/;
    passwordInput: string = '';

    passwordForm: FormGroup = new FormGroup({
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(this.regexPattern),
        ]),
    });

    public get password() {
        return this.passwordForm.get('password');
    }

    constructor() {}

    ngOnInit(): void {
        this.password?.valueChanges
            .pipe(
                map((value) => {
                    if (this.password?.valid) {
                        this.getPassword.emit(value);
                    } else {
                        this.getPassword.emit('');
                    }
                })
            )
            .subscribe();
    }
}
