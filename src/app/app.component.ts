import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AkcoatClient';
  
  constructor(
    private route:ActivatedRoute,
    private userService: UserService,
    private translate: TranslateService,
    private http: HttpClient,
   ) {
     
   }
 

  ngOnInit(): void {


    const browserLang ='tr';

    let currentLang=JSON.stringify(this.userService.currentLangValue)!='{}'?this.userService.currentLangValue:browserLang;
 
    this.translate.use(currentLang);

    this.translate.setDefaultLang(currentLang);
    this.userService.currentLangSetValue(currentLang);

    
  }
}
