import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import {ListProductImages } from 'src/app/contracts/listproductimages';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:SelectProductImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService
  ) {
    super(dialogRef);
  }

  images :ListProductImages[];
  async ngOnInit(){
   this.spinner.show(SpinnerType.BallAtom);
  this.images=await this.productService.readImages(this.data as string, () => this.spinner.hide(SpinnerType.BallAtom));
  }
 
  //imageleri cekmek için ürüne karsılık
  

  @Output() options:Partial<FileUploadOptions>={ //dısarıya deger gönderen değişken 
    accept:".png, .jpg, .jpeg, .gif",
    action:"upload",
    controller:"products",
    explanation:"Ürün Resmini seçin veya sürükleyin",
    isAdminPage:true,
    queryString:`id=${this.data}`

  };
}
export enum SelectProductImageState {
  Close
}
