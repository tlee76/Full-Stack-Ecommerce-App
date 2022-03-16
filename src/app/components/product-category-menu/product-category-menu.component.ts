import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[]; //defining property
  constructor(private productService: ProductService) { //injecting our product service

  }

  ngOnInit(): void {
    this.listProductCategories();  //method created to call our service
  }


  listProductCategories() { //method
    this.productService.getProductCategories().subscribe( //invoke the service
      data => {
        console.log('Product Categories=' + JSON.stringify(data));  //Log data returned from the service / takes a object and display it in JSON format
        this.productCategories = data; //assign the data to our property
      }
    ); 
  }

}
