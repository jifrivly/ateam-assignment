import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
    email: string = '';
    password: string = '';
    loginErrorMessage: string = '';

    constructor(private authService: AuthService, private snackBarService: MatSnackBar, private router: Router) {}

    ngOnInit(): void {}

    getEmail(emailId: string) {
        this.email = emailId;
    }

    getPassword(password: string) {
        this.password = password;
    }

    login() {
        this.loginErrorMessage = '';
        if (this.email && this.password) {
            this.authService.login(this.email, this.password).subscribe({
                next: (res) => {
                    console.log('Login Succesful.', res);
                    this.router.navigate(['dashboard']);
                    this.snackBarService.open('Login Success', 'OK', { duration: 2000 });
                },
                error: (err) => {
                    console.log('Error occured while Login.', err);
                    this.loginErrorMessage = err;
                    this.snackBarService.open('Login Failed', 'OK', { duration: 2000 });
                },
            });
        } else {
            console.warn('Username and Password required');
        }
    }
}
