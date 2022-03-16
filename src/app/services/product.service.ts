import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
 

  private baseUrl = 'http://localhost:8080/api/products'; //link for backend Spring Boot api and JSON data. Can add "?size=100" to the end of link. Changes page to return 100 items instead of the default 20 items by Spring data rest

  private categoryUrl = 'http://localhost:8080/api/product-category'; //same as variable above this one


  constructor(private httpClient: HttpClient) { } //Inject HttpClient



  getProduct(theProductId: number): Observable<Product> //return type of Observable product, because we will return 1 product
  {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    // call the Rest api based on this product URL
    return this.httpClient.get<Product>(productUrl);
  }


  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number ): Observable<GetResponseProducts> {  // new method we wrote.  Returns an observable of Product and then Maps the JSON Data from Spring DataRest to Product Array

    // need to build URL based on category id, page and page size in backend.
      const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                        + `&page=${thePage}&size=${thePageSize}`; //theCategoryId is the parameter passed into this method
  
      return this.httpClient.get<GetResponseProducts>(searchUrl); 
     
    }


  
  getProductList(theCategoryId: number): Observable<Product[]> {  // new method we wrote.  Returns an observable of Product and then Maps the JSON Data from Spring DataRest to Product Array

  // need to build URL based on category id in backend.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`; //theCategoryId is the parameter passed into this method

    return this.getProducts(searchUrl); //calling getProducts method below. Did it this way to clean up code (called refactoring code)
   
  }




  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on keyword in backend.
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`; //theKeyword is the parameter passed into this method. findByNameContaining can be found on backend (ProductRepository.java)

    return this.getProducts(searchUrl); //calling getProducts method below. Did it this way to clean up code (called refactoring code)
  }


  private getProducts(searchUrl: string): Observable<Product[]> { //basic call to backend REST api
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe( 
      map(response => response._embedded.products)
    );
  }




  getProductCategories(): Observable<ProductCategory[]> {  //same as getProductList method above, just different names
    
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(  //call REST API
      map(response => response._embedded.productCategory) //returns observable. Maps Json data from Spring data REST to ProductCategory array
      );
    }


  
  

}


interface GetResponseProducts { // Support Interface to help with the mapping. Unwraps JSON from spring data REST _embedded entry. So it will take the JSON named _embedded: {products:} and will access the array of products. Look at the JSON on localhost:8080/api/products
  _embedded: {
    products: Product[];  
  },
    page: {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number;

    }
}


interface GetResponseProductCategory { // Support Interface to help with the mapping. Unwraps JSON from spring data REST _embedded entry. So it will take the JSON named _embedded: {product-cateogry:} and will access the array of products. Look at the JSON on localhost:8080/api/product-category
  _embedded: {
    productCategory: ProductCategory[];  
  }
}