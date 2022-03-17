import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() show: boolean = false;
  show1:boolean=false;
  private subscription: Subscription = new Subscription();
  constructor(
    private loaderService: LoaderService,
    private sharedService:SharedService,
    private spinner: NgxSpinnerService,
  ) { }
  ngOnInit() {
  this.sharedService.loadingSubject
     .pipe()
      .subscribe((res) => {
        this.show = res;
      
        if (this.show)
          this.spinner.show();
        else
          this.spinner.hide();
      });
   
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
