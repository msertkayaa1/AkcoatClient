import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.scss']
})

export class PanelLayoutComponent implements OnInit {
  menuItems: any;
  menuSuperadminItems: any = [

    {
      path: "/panel/user",
      title: "Kullanıcılar",
      type: "sub",
      icontype: "fas fa-users",
      children: [
        {
          path: "list",
          title: "Kullanıcı Listesi",
          type: "link",
          ab: 'KU'
        },
        {
          path: "pending",
          title: "Onay Bekleyenler",
          type: "link",
          ab: 'OB'
        },

      ]
    },
    {
      path: "/panel/product",
      title: "Ürünler",
      type: "sub",
      icontype: "fas fa-boxes",
      children: [
        {
          path: "list",
          title: "Parametreler",
          type: "link",
          ab: 'KU'
        },

      ]
    }
  ];

  menuUserItems: any = [

    {
      path: "/panel/user",
      title: "Dashboard",
      type: "sub",
      icontype: "fas fa-users",

    },

  ];

  user:any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user=this.userService.currentUserValue;

    let isRole = this.userService.hasRole('Superadmin');

    if (isRole)
      this.menuItems = this.menuSuperadminItems;
    else
      this.menuItems = this.menuUserItems;
  }

  logout() {
    this.userService.logout()
  }

    
  logoutAlert() {

     
    Swal.fire({
      title: "Uyarı",
      text: "Çıkmak istediğinizden emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    })
}


}
