import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageUploadComponent } from './image-uplaod/image-upload.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDropzoneModule
  ],
  declarations: [
    ImageUploadComponent
    ],
  exports:[
    ImageUploadComponent
  ]
})
export class SharedModule { }
