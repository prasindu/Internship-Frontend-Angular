import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  
  
  private apiUrl = `${environment.apiUrl}/Customer`;

 
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

 
  updateCustomer(id: number, customer: Customer): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, customer);
  }


  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}