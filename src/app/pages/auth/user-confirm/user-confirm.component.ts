import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserConfirm } from 'src/app/models/dto/user-confirm';
import { ResetPassword } from 'src/app/models/reset-password';
import { AlertifyService } from 'src/app/services/alertify.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.scss']
})
export class UserConfirmComponent implements OnInit {


  isSaveSuccess: number=-1;
  resetPasswordForm!: FormGroup;
  errorMessage = '';
  message =  "Kullanıcı doğrulanamadı.";
  loading = false;
  isSubmit = false;
  resetPassword: ResetPassword = new ResetPassword();
  
  id: string | null=null;
  token: string | null=null;

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
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')?this.activatedRoute.snapshot.paramMap.get('id'):'';
    this.token = this.activatedRoute.snapshot.paramMap.get('token')?this.activatedRoute.snapshot.paramMap.get('token'):'';

    this.activatedRoute.queryParams.subscribe(params => {
  

      this.token  = params['token'];

      let data=new UserConfirm();
      data.token=this.token;
      data.userId=this.userId;

      this.confirmUser(data);
    });

  }






  confirmUser(data:any) {


    this.loading = true;



      this.userService
        .userConfirm(data)
        .pipe(first())
        .subscribe(
          (result) => {
            if (result.succeeded) {
              this.isSaveSuccess = 1;
              this.message ="Hesabınız başarılı bir şekilde doğrulandı.Yönetim tarafından hesabınız onaylandıktan sonra giriş yapabilirsiniz.";
              this.loading = false;
            
              setTimeout(() => {
                this.router.navigate(['/auth/signin'])
              }, 3000);
            
            }
            else {
            
              this.isSaveSuccess = 0;
              this.loading = false;
              this.message =  "Kullanıcı doğrulanamadı.";
           
            }
         

          },
          (error) => {

            this.errorMessage = error
            this.loading = false;

          }
        );


        }
}
