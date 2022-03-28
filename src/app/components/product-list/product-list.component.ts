import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html',  used to be this file but we changed the template to the one above this line
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] =[];  //products are an array of Product, products array is used in html components to loop thru the array
  currentCategoryId: number = 1; //variable currentCategoryId which is a number type
  previousCategoryId: number = 1;
  currentCategoryName: string;
  searchMode: boolean = false; //for search component

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = null;
  


  
  constructor(private productService: ProductService, private route: ActivatedRoute ) // Inject our ProductService and ActivatedRoute(The current active route that loaded the component. Useful for accessing route parameters
  {

  }

  ngOnInit(): void {  // once an angular Products method(whcomponent is initialized we call this method
    this.route.paramMap.subscribe(() => {
    this.listProducts(); // calls listProducts is created below)
    });
  }



  listProducts() { //call method 1 if it's true, else call method 2

    this.searchMode = this.route.snapshot.paramMap.has('keyword'); //checking to see if this route has a parameter for keyword
    //keyword parameter came from the route 'search' in app.module.ts file / also passed in from navigateByUrl (search.component.ts)
    //just a true or false check, searchMode will be true or false

    if (this.searchMode) { //if there is a searchMode, then run handleSearchProducts, if not run the other method
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }




  handleSearchProducts() {
    
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword'); //getting the search keyword/value the user passed in

    //if we have a diff keyword than previous, then set thePageNumber to 1
    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    // now search for the products using the keyword/value
    this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword).subscribe( //calling productService above in constructor. Then using searchProductsPaginate method in product.service.ts class
      this.processResult());

  }

    



  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id'); //this.route is the activated route. snapshot is the state of the route at this given moment in time. paramMap is the map of all the route parameters. 'has' reads the id parameter. 'id' is the first route in app.module.ts file.

    if( hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      //'+' symbol is used to convert string to number since route will be a string. 

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else {
      // no category id available...default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than the previous, then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(this.processResult()); 
    // its saying, hey service, get me the product list for this cateogory id
    // uses getProductList method from product.services.ts class. Method is invoked once you "subscribe"
  }     // Assign results to Product array.  Integrating our Angular service with our Angular component

  


    processResult() { // Map data from JSON response to the properties here for this class
      return data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      } //left hand side are properties defined in this class. right hand side is data from spring data REST JSON
    }


    updatePageSize(pageSize: number){
      this.thePageSize = pageSize;
      this.thePageNumber = 1;
      this.listProducts(); // this will refresh the page after choosing the page size
    }



}
