import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";

interface Produto {
  nome_produto: string;
  quantidade: number;
  valor: number;
}

interface Pedido {
  nome_cliente: string;
  mesa_id: number;
  produtos: Produto[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router) { }

  public realizarPedido(pedido: Pedido): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'pedido', pedido);
  }

  public historicoPedidos(mesa_id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'historico/' + mesa_id);
  }
  public alterarStatusPedido(pedido_id: any, status: string): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'statuspedido/' + pedido_id, { status });
  }
  public mesasAtivas(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'mesas_ativas');
  }

  public deletarHistoricoMesa(mesa_id: any): Observable<any> {
    return this.http.delete(this.apiUrl + `historico/${mesa_id}`);
  }
}
