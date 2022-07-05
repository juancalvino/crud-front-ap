import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoDto } from '../models/ProductoDto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  apiUrl = 'http://localhost:8080/producto';

  constructor(private httpClient: HttpClient) { }


  listaProductos$(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(`${this.apiUrl}/lista`);
  }

  getDetail$(id: number): Observable<Producto> {
    return this.httpClient.get<Producto>(`${this.apiUrl}/details/${id}`);
  }

  getDetailName$(nombre: string): Observable<Producto> {
    return this.httpClient.get<Producto>(`${this.apiUrl}/detailname/${nombre}`);
  }

  create$(producto: Producto): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/create`, producto, httpOptions);
  }

  update$(id: number, productoDto: ProductoDto): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/update/${id}`, productoDto, httpOptions);
  }

  delete$(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

}
