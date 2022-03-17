import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserRoles } from 'src/app/models/enums/user-roles';
import { RegisterUser } from 'src/app/models/register-user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  

  userType: string = '';
  isUpdate: boolean = false;
  totalRecords: number = 0;
  registerCreateForm!: FormGroup;
  companyId: string = '';
  register: RegisterUser | null = null;
  userId: string = '';
  existRole: string = 'User'
  sectorData:Array<any>=[
    {
      id:1,
      text:'Tencere-cookware'
    },
    {
      id:2,
      text:'Fırın gereçleri'
    }, 
    {
      id:3,
      text:'Bakeware'
    },
    {
      id:4,
      text:'SDA'
    }, 
    {
      id:5,
      text:'Tetailer'
    }, 
      {
      id:6,
      text:'trader'
    },
  ]
  show: boolean = false;
  isSubmit: boolean = false;

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,

  ) { }
  ngOnInit() {

    this.companyId = this.userService.currentUserValue != undefined ? this.userService.currentUserValue.companyId : "";

    this.addUserForm();
  }


  addUserForm(): void {
    this.registerCreateForm = this.formBuilder.group({
      username: new FormControl(null, []),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, Validators.compose([Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])),
      phone: new FormControl(null, [Validators.required]),

      companyName: new FormControl(null, [Validators.required]),
      companySector: new FormControl(null, [Validators.required]),
      companyPosition: new FormControl(null, [Validators.required]),
      companyAdress: new FormControl(null, [Validators.required]),

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
      userType: new FormControl(UserRoles.User, [Validators.required, Validators.minLength(2)]),
      statu: new FormControl('User', [Validators.required, Validators.minLength(2)]),
      isSendMail: new FormControl(true, [Validators.required]),
    });
  }



  saveUser() {
    this.isSubmit = true;
    if (this.registerCreateForm.invalid) {
      this.isSubmit = false;
      return;
    }
    if (this.registerCreateForm.valid) {
      let data = Object.assign({}, this.registerCreateForm.value);
     
 
      this.userService
        .register(data)
        .pipe(first())
        .subscribe(
          (res) => {

            if (res.succeeded) {
              let title = "Kulllanıcı Oluşturuldu";
              let message = "Lütfen kullanıcıya ait e-posta adresine gönderilen doğrulama linki başarılı bir şekilde gönderildi.";
              this.alertifyService.success(title, message);
              this.isUpdate = false;
              this.router.navigate(["/panel/user"]);
              this.isSubmit = false;
            }
            else {
              let title = "Kayıt Oluşturulamadı";
              let message = "";

              if (res.errors.includes("user.exist"))
                message = 'Email zaten kayıtlı.';

              if (res.errors.includes("2"))
                message = 'İşlem sırasında hata oluştu.';

              this.alertifyService.error(title, message);
            }
          },
          (error:any) => {
            let title = "Kayıt Oluşturulamadı";
            let message = "İşlem sırasında hata oluştu.";


            this.alertifyService.error(title, message);
            this.isSubmit = false;

          }
        );



    }
  }


}
