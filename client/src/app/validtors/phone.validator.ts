import {  FormControl, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
        if (control.value) {
            if (control.value[0] == 0) {
                if (control.value[1] == 2 || control.value[1] == 3 || control.value[1] == 4 || control.value[1] == 8 || control.value[1] == 5 || control.value[1] == 7) {


                    if (control.value[1] == 5) {
                        if (control.value[2] == 3 || control.value[2] == 2 || control.value[2] == 4 || control.value[2] == 0|| control.value[2] == 5) {
                            return null;
                        }
                        else {
                            return { phoneError: { requiredValue: '2' } };
                        };
                    }
                    else {
                        return null;
                    }

                }
                else {
                    return { phoneError: { requiredValue: '1' } };
                }
            }


            return { phoneError: { requiredValue: '0' } };
        }


    };

}







