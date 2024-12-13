import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/produto'; // URL do seu backend

  constructor(private http: HttpClient) { }

  // Método para obter todos os produtos
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para excluir produto pelo ID
deleteProduct(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

createProduct(formData: FormData): Observable<any> {
  return this.http.post(this.apiUrl, formData);
}

// Método para obter um produto pelo ID
getProductById(id: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}
// Método para atualizar um produto pelo ID
updateProduct(id: string, formData: FormData): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, formData); // Remover /produto/
}

}
