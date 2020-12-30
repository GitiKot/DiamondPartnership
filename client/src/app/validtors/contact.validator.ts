import { FormGroup, ValidatorFn } from '@angular/forms';

export function ContactNumberValidator(ctrls: any): ValidatorFn {
    return (form: FormGroup): { [key: string]: any } | null => {

        for (const ctrl of ctrls) {
            if (form.controls[ctrl].value) {
                if (form.controls[ctrl].value.trim() !== '') {
                    return null;
                }
            }
        }
        return { contactnumber: true };

    };

}



