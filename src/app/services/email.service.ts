import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EmailService {
    freeEmailGistLink: string =
        'https://gist.githubusercontent.com/tbrianjones/5992856/raw/93213efb652749e226e69884d6c048e595c1280a/free_email_provider_domains.txt';

    constructor(private http: HttpClient) {}

    getGistFreeEmailList() {
        return this.http.get(this.freeEmailGistLink, { responseType: 'text' as 'json' }).pipe(
            map((rawText) => {
                return rawText.toString().split('\n');
            })
        );
    }
}
