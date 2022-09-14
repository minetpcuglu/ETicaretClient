import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/createproduct';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, private productService:ProductService,private alertify:AlertifyService) {
    super(spinner)
   }

  ngOnInit(): void {
  }
  
  @Output() createdProduct:EventEmitter<CreateProduct>=new EventEmitter();
//   @Output() fileUploadOptions:Partial<FileUploadOptions> = //dısarıya gönderdigimiz icin yani html output olarak tanımladık
// { SelectProductImageDialogComponent tasındı
// action:"upload",
// controller:"products",
// explanation:"Resim dosyalarını secin veya sürükleyin",
// isAdminPage:true,
// accept:".png, .jpg, .jpeg, .json" //hangi dosyalar yüklenmek için sec'te gözüksün
// }
  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    const createProduct : CreateProduct = new CreateProduct();
    createProduct.name=name.value;
    createProduct.unitInStock=parseInt(stock.value);
    createProduct.Price=parseFloat(price.value);

    this.productService.create(createProduct,()=>{
    this.hideSpinner(SpinnerType.BallAtom); //success call back ile product servise gönderdik
    this.alertify.message("ürün başarı ile eklendi",{
      dismissOthers:true,
      messageType:MessageType.Success,
      positionType:PositionType.TopRigth
    });
    this.createdProduct.emit(createProduct); //sayfalama yapıldıgında eklenen her veri sayfaya eklenmesı icin
  },errorMessage =>{
    this.alertify.message(errorMessage,{
      dismissOthers:true,
      messageType:MessageType.Error,
      positionType:PositionType.TopRigth
    });
  });
  }
}
