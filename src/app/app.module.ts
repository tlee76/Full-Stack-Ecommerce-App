import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';


const routes: Routes = [  //defining routes
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id/:name', component: ProductListComponent}, //Path to match is "category/:id", then when path matches, create new instance of component(ProductListComponent)
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products' , pathMatch: 'full'}, // Empty path, if nothing then redirect to Products page, also match the full path
  {path: '**', redirectTo: '/products', pathMatch: 'full'} // generic wildcard, it will match anything that didn't match the above routes
  // The last paths mean if they don't give a path or don't match any paths, then go to the Products page
  //Order of routes is important(From Top to Bottom). First match wins. Start from most specific to most generic
]; 
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes), //Configure Router based on our routes. "routes" in forRoot, is the array of Routes from above
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],

  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
