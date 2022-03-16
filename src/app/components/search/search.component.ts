import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  //Inject the router into our component
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  //method on search.component html page
  doSearch(value: string) {
    console.log(`value=${value}`); //for debugging purposes if we need it
    this.router.navigateByUrl(`/search/${value}`); 
    //calling the route, "search" (in app.module.ts) with a given keyword/value. Routing the data to our search route (navigateByUrl).  It will be handled by the ProductListComponent because that is what the 'search' route says in app.module.ts file
  }

}
