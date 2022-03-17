import { HttpClient, HttpEventType } from '@angular/common/http';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  public progress: number = 0;
  public message: string = '';

  formData: any;
  @Output() images = new EventEmitter<Array<string>>();
  @Input() multiple: boolean = false;
  imageList: Array<string> = [];
  imagePathList: Array<string> = [];
  image: any;
  selectedFile: File | null = null;
  uploadData = new FormData();
  files: File[] = [];

  @ViewChild("imagesDropZone") imagesDropZone: any;

 

  constructor(private http: HttpClient, private uploadService: UploadService) { }

  ngOnInit() {

    
  }


  onSelect(event: any) {
    if (!this.multiple)
      this.files = [];

    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      // IMPORTANT: 'files' must match parameter name in controller's action
      formData.append("filesObject", file, file.name);
    }



    this.uploadService
      .IMAGE_UPLOAD(formData)
      .pipe(first())
      .subscribe((res) => {
        this.imageList = res;
        this.images.emit( this.imageList)
      });


  }

  onRemove(event: any) {

    this.files.splice(this.files.indexOf(event), 1);
    this.imageList =[];
    this.images.emit(this.imagePathList)
  }




}
