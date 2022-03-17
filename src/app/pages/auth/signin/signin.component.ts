
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CompanyService } from '../../../services/company.service';
import { UploadService } from '../../../services/upload.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isSubmit = false;
  // tslint:disable-next-line:no-inferrable-types
  returnUrl: string = '';
  error = '';
  loginForm!: FormGroup;
  errorMessage:string='';
  isAuth:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.loginAddForm();

    if (this.userService.currentUserValue) {
      
      
      this.isAuth=false;

    }
    else{
      this.isAuth=true;
    }


  }

  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params => {
  

      this.returnUrl  = params['returnUrl'];
    });

  }

  ngViewInit(){
    
  }

  // tslint:disable-next-line:typedef
  loginAddForm() {
    this.loginForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]

      ],
      password: ['',
        [
          Validators.required,

        ]]
    });
  }

  logIn() {
    this.isSubmit = true;
    if (this.loginForm.invalid) {
      this.isSubmit = false;
      return;
    }



    if (this.loginForm.valid) {
     
      let data = Object.assign({}, this.loginForm.value);


      this.userService
        .login(data)
        .pipe(first())
        .subscribe(
          (result) => {

            var data = result.data;
           
            if (result.succeeded && data != null) {
            
                if ( data) {

                  
                  localStorage.setItem('currentUser', JSON.stringify(data));
                  localStorage.setItem('token', data.token);
                  this.userService.currentUserSetValue(data);
                  this.isSubmit=false;
                  this.router.navigate(['/'])

                }
                else {
                  this.errorMessage = 'Email veya şifre yanlış'
                  this.isSubmit=false;

                }
              }
            
            else {
              this.errorMessage = 'Email veya şifre yanlış'
              this.isSubmit=false;

            }
          },
          (error) => {


            this.error = error;
            this.isSubmit = false;
          }
        );


    }
  }




  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.userService.currentUserSetValue(null);
  }

}
