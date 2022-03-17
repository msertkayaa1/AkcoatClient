import { FormControl, ValidationErrors } from '@angular/forms';

export class NotOnlyWhiteSpace {
    // whitespace validation
    static notOnlyWhitespace(control: FormControl): any {

        // check if string only containes whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {
            // invalid , return erro object
            // tslint:disable-next-line: object-literal-key-quotes
            return { 'notOnlyWhitespace': true };
        } else {
            // valid return null
            return null;
        }


    }
}
