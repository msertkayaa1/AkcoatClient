import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  
  loading: boolean = false;
  destroyed$ = new Subject();
  articleList: Array<any> = [];
  isActive: boolean = true;
  existRightMessage = 'You have completed your user creation right for this month';
  ColumnMode: any = ColumnMode;

 
  rows: Array<any> = [
    {
      "typeId": 1,
      "typeName": "Yüzey Tipi",
      "value": "Düz"
    },
    {
      "typeId": 1,
      "typeName": "Yüzey Tipi",
      "value": "Metalik"
    },
    {
      "typeId": 1,
      "typeName": "Yüzey Tipi",
      "value": "Özel Efekt"
    },
    {
      "typeId": 2,
      "typeName": "Etiket",
      "value": "PC2"
    },
     {
      "typeId": 2,
      "typeName": "Etiket",
      "value": "PC3"
    },
    {
      "typeId": 2,
      "typeName": "Etiket",
      "value": "PC3+"
    },

    {
      "typeId": 3,
      "typeName": "Material",
      "value": "Silikon"
    },
    {
      "typeId": 3,
      "typeName": "Material",
      "value": "Sol-Gel"
    },
   
   
  ];


  @ViewChild(DatatableComponent) table!: DatatableComponent;

  
  constructor(
   
  ) { }

  ngOnInit(): void {
   

  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    if (val) {
      // filter our data
      // const temp = this.articleList.filter(function (d) {
      //   return ((d.title.toLowerCase().indexOf(val)) !== -1 || !val);
      // });
      // this.rows = temp;
    } else {


      this.rows = this.articleList;
    }

    // // update the rows

    // // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


  onPage(event: any) {
  }


  



}
