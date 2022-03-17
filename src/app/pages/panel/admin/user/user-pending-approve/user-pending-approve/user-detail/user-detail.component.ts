import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterUser } from 'src/app/models/register-user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

 

  userType: string = '';
  isUpdate: boolean = false;
  totalRecords: number = 0;
  registerCreateForm!: FormGroup;
  companyId: string = '';
  register: RegisterUser | null = null;
  userId: string = '';
  existRole: string = 'User'
  sectorData: Array<any> = [
    {
      id: 1,
      text: 'Tencere-cookware'
    },
    {
      id: 2,
      text: 'Fırın gereçleri'
    },
    {
      id: 3,
      text: 'Bakeware'
    },
    {
      id: 4,
      text: 'SDA'
    },
    {
      id: 5,
      text: 'Tetailer'
    },
    {
      id: 6,
      text: 'trader'
    },
  ]
  show: boolean = false;
  isSubmit: boolean = false;

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) {
    this.addUserForm();
  }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id') ? this.activatedRoute.snapshot.paramMap.get('id') : '';

    if (id)
      this.getUser(id);


  }

  getUser(id: string) {
    this.userService.getUserById(id).subscribe((res: any) => {
      let data = res.data;

      this.registerCreateForm.patchValue({
        id: data.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,

        companyName: data.companyName,
        companySector: data.companySector,
        companyPosition: data.companyPosition,
        companyAdress: data.companyAdress,

      });
    });
  }


  addUserForm(): void {
    this.registerCreateForm = this.formBuilder.group({
      id: new FormControl(null, [Validators.required]),
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
      companyAdress: new FormControl(null, [Validators.required])
    });
  }



  saveUser() {
  
  }

}
