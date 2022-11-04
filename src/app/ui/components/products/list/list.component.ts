import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListProducts } from 'src/app/contracts/listproducts';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute) { }

currentPageNo:number;
totalCount:number;
totalPageCount:number;
pageSize:number=12;
pageList:number[]=[];

  products:ListProducts[];
 async ngOnInit()  {
  this.activatedRoute.params.subscribe(async params=>{
this.currentPageNo=params["pageNo"] ?? 1;

    const data:{totalCount:number,products:ListProducts[]}= await
     this.productService.read(this.currentPageNo -1,this.pageSize,
      ()=>{
  
      },
      errorMessage => {
  
      });
      this.totalCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++)
          this.pageList.push(i);

      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);

      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
    });

  }
}
