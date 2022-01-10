import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(public http: HttpClient, private router: Router) {}

    login(emailId: string, password: string): Observable<User> {
        // const userData: User = { emailId, password };
        return this.http.get<User[]>('assets/data/users.json', { responseType: 'json' }).pipe(
            map((users) => {
                console.log(users);
                const loginUser = users.find((user) => user.emailId === emailId && user.password === password);
                if (loginUser) {
                    this.saveUserSession(loginUser);
                    return loginUser;
                } else {
                    throw new Error('Invalid User');
                }
            })
        );
    }

    logout() {
        this.removeUserSession();
        this.router.navigate(['login']);
    }

    saveUserSession(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        // sessionStorage.setItem('user', JSON.stringify(user));
    }

    removeUserSession() {
        localStorage.clear();
        // sessionStorage.clear();
    }

    isLoggedIn(): boolean {
        console.log('Is Logged In checking', localStorage.getItem('user'));
        const user = localStorage.getItem('user');
        if (user) {
            // console.log('User exist.', <User>JSON.parse(user) instanceof User)
            // return <User>JSON.parse(user) instanceof User;
            return true;
        } else {
            console.log('No user found.');
            return false;
        }
    }
}
