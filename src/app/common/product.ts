export class Product {
    sku: string;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    active: boolean;
    unitsInStock: number;
    dateCreated: Date;
    lastUpdated: Date;
    id: string;


    // all properties in this class is from the JSON data from the Spring Boot Service
    // from http://localhost:8080/api/products page
    // We want to match it with all the JSON data coming from Spring Boot
    // Also matches the variable names in Product.java file

}
