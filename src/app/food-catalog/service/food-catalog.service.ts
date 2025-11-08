import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL_FOOD_CATALOG } from '../../constants/url/url';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = API_URL_FOOD_CATALOG + '/foodCatalog/fetchItemsByRestaurantId/'; 

    constructor(private http: HttpClient) { }

    getItemsByRestaurant(id:number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl+id}`)
          .pipe(
            catchError(this.handleError)
          );
      }
    
      private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => error.message || error);
      }

}