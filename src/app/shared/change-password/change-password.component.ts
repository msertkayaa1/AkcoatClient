import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MustMatch } from 'src/app/helpers/password-match';
import { ResetPassword } from 'src/app/models/reset-password';
import { AlertifyService } from 'src/app/services/alertify.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

 

  isSaveSuccess: boolean = false;
  resetPasswordForm!: FormGroup;
  errorMessage = '';
  message = '';
  loading = false;
  isSubmit = false;
  resetPassword: ResetPassword = new ResetPassword();
  id: string | null=null;

  focus1:boolean=false;
  focus2:boolean=false;
  focus3:boolean=false;

  show:boolean=false;
  show1:boolean=false;
  show2:boolean=false;

  userId:string | null=null;
  returnUrl:string | null=null;

  constructor(
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.resetPasswordAddForm();
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')?this.activatedRoute.snapshot.paramMap.get('id'):'';
  
    if(!this.userId){
      this.alertifyService.error('Hata','Kullanıcı bulunamadı.');

    }

    this.sharedService.backUrlSubject.subscribe(res=>{
      this.returnUrl=res;
    })
  }

  resetPasswordAddForm() {
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      password: new FormControl('', Validators.compose([
        Validators.required,
        // check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, {
          hasNumber: true
        }),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        }),
        // check whether the entered password has a lower case letter
        CustomValidators.patternValidator(/[a-z]/, {
          hasSmallCase: true
        }),
        // check whether the entered password has a special character
        CustomValidators.patternValidator(
          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          {
            hasSpecialCharacters: true
          }
        ),
        Validators.minLength(8)
      ])),
      passwordConfirm: new FormControl('', Validators.compose([
        Validators.required,
        // check whether the entered password has a number

      ])),
    },
    {
      validator: MustMatch('password', 'passwordConfirm')
    }
    );

    this.resetPasswordForm.controls.password.valueChanges.subscribe(() => {
      this.resetPasswordForm.controls.passwordConfirm.updateValueAndValidity();
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }


  clearError() {
   
    this.message = '';
    let password = this.resetPasswordForm.get('password')?.value.trim();
    this.resetPasswordForm.controls['password'].setValue(password);
    let passwordConfirmation = this.resetPasswordForm.get('passwordConfirmation')?.value.trim();
    this.resetPasswordForm.controls['passwordConfirmation'].setValue(passwordConfirmation);

  }



  async resetPasswordSubmit() {
    this.isSubmit = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.resetPasswordForm.valid && this.userId) {
      this.resetPassword = Object.assign({}, this.resetPasswordForm.value);
      let data = new ResetPassword();

      // data.Id = this.userId;
      // data.currentPassword = this.resetPassword.currentPassword;
      // data.password = this.resetPassword.password;



      this.userService
        .profileResetPassword(data)
        .pipe(first())
        .subscribe(
          (result) => {
            if (result.succeeded) {
              this.isSaveSuccess = true;
              this.message = result.message;
           
              this.alertifyService.success('Başarılı',result.message);

              this.router.navigate([this.returnUrl])
            }
            else {
              this.alertifyService.error('Hata',result.message);
              this.isSaveSuccess = false;
              this.message = result.message;
           
            }
            this.loading = false;

          },
          (error) => {

            this.errorMessage = error
            this.loading = false;

          }
        );


    }
  }

}
