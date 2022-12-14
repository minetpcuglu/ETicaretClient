import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import {  NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListProducts } from 'src/app/contracts/listproducts';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $ :any; // jquery talebi
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{

  constructor(
    spinner :NgxSpinnerService,
     private productService:ProductService ,
     private alertifyService:AlertifyService,
     private dialogService:DialogService) { 
    super(spinner)
  }

displayedColumns: string[] = ['name','price', 'unitInStock',  'createdDate', 'updatedDate','images','edit','delete'];
dataSource: MatTableDataSource<ListProducts> = null;
@ViewChild(MatPaginator) paginator: MatPaginator;

async getProducts() {
  this.showSpinner(SpinnerType.BallAtom);
  const allProducts: { totalCount: number; products: ListProducts[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage, {
    dismissOthers: true,
    messageType: MessageType.Error,
    positionType: PositionType.TopRigth
  }))
  this.dataSource = new MatTableDataSource<ListProducts>(allProducts.products);
  this.paginator.length = allProducts.totalCount;
}

// delete(id,event){ //directive kullan??lmadan 
//   const img : HTMLImageElement=event.srcElement;
//  $(img.parentElement.parentElement).fadeOut(2000);
// }


addProductImages(id: string){
this.dialogService.openDialog({
componentType:SelectProductImageDialogComponent,
data:id,
options:{
  width:"1400px"
}
});
}


 async pageChanged(){
    await this.getProducts();
  }

  async ngOnInit() {
  await this.getProducts();
  }

}

