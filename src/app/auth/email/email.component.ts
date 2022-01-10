import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { EmailService } from 'src/app/services';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
    @Output() getEmail: EventEmitter<string> = new EventEmitter<string>();

    formGroup: FormGroup;
    freeEmails: string[] = [];

    public get emailId() {
        return this.formGroup.get('emailId');
    }

    constructor(private formBuilder: FormBuilder, private emailService: EmailService) {
        this.formGroup = new FormGroup({
            emailId: new FormControl('', [Validators.required, Validators.email]),
        });
        // this.emailService
        //     .getGistFreeEmailList()
        //     .subscribe((emails) => (this.freeEmails = emails));
        this.freeEmails = [
            '1033edge.com',
            '11mail.com',
            '123.com',
            '123box.net',
            '123india.com',
            '123mail.cl',
            '123qwe.co.uk',
            '126.com',
            '150ml.com',
            '15meg4free.com',
            '163.com',
            '1coolplace.com',
            '1freeemail.com',
            '1funplace.com',
            '1internetdrive.com',
            '1mail.net',
            '1me.net',
            '1mum.com',
            '1musicrow.com',
            '1netdrive.com',
            '1nsyncfan.com',
            '1under.com',
            '1webave.com',
            '1webhighway.com',
            '212.com',
            '24horas.com',
            '2911.net',
            '2bmail.co.uk',
            '2d2i.com',
            '2die4.com',
            '3000.it',
            '321media.com',
            '37.com',
            '3ammagazine.com',
            '3dmail.com',
            '3email.com',
            '3xl.net',
            '444.net',
            '4email.com',
            '4email.net',
            '4mg.com',
            '4newyork.com',
            '4x4man.com',
            '5iron.com',
            '5star.com',
            '88.am',
            '8848.net',
            'jifri@gmail.com',
        ];
    }

    ngOnInit(): void {
        this.emailId?.setValidators([Validators.required, Validators.email, this.freeEmailValidation(this.freeEmails)]);

        this.emailId?.valueChanges
            .pipe(
                map((value) => {
                    if (this.emailId?.valid) {
                        this.getEmail.emit(value);
                    } else {
                        this.getEmail.emit('');
                    }
                })
            )
            .subscribe();
    }

    freeEmailValidation(emails: string[]): ValidatorFn {
        return (controller: AbstractControl): ValidationErrors | null => {
            // 1st required --> 2nd email --> 3rd free mail list
            if (
                controller.dirty &&
                !controller.hasError('required') &&
                !controller.hasError('email') &&
                emails.includes(controller.value)
            ) {
                return { freeEmail: true };
            }
            return null;
        };
    }
}
