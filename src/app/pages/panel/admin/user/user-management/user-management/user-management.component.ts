import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { debounce } from 'lodash';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserFilter } from 'src/app/models/dto/user-filter';
import { UserListFilter } from 'src/app/models/filter/user/user-list-filter';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementComponent implements OnInit {

  loading: boolean = true;
  destroyed$ = new Subject();
  articleList: Array<any> = [];
  isActive: boolean = true;
  ColumnMode: any = ColumnMode;
  filter: UserListFilter = new UserListFilter();

  rows: Array<any> = [

  ];
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  userList: Array<any> = [];

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.filter.filterRoles.push('User')
    this.getUserListByFilter();
    this.updateFilter = debounce(this.updateFilter, 500)
  }


  getUserListByFilter() {


    this.userService.getUserListByFilter(this.filter).subscribe(res => {
      this.userList = res.data;
      this.rows = res.data;
      this.loading = false
      this.cdr.markForCheck();
    })
  }

  newUser() {
    this.router.navigate(['/panel/user/list/create'])
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    this.filter.name = val;
    this.filter.surname = val;
    this.filter.email = val;
    this.getUserListByFilter();
  }


  onPage(event: any) {

    this.filter.pageSize = parseInt(event.limit);
    this.filter.pageNumber = parseInt(event.offset);
    this.getUserListByFilter();

  }

  changeFilter(event: any) {
    const val = event.target.value.toLowerCase();
    this.filter.pageNumber = val;

    this.getUserListByFilter();
  }


  removeUser(userId: any) {
    this.userService
      .delete(userId)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.alertifyService.success('Başarılı', 'Kayıt başarılı bir şekilde silindi.');
          this.getUserListByFilter();
        },
        (error) => {
          this.alertifyService.error();

        }
      );
  }

  showSwal(id: number = 0) {


    Swal.fire({
      title: "Uyarı",
      text: "Silmek istediğinizden emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeUser(id);
      }
    })
  }









}
