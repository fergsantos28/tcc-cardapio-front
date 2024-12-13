import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductReadComponent } from '../product/product-read/product-read.component';
import { ProductCreateComponent } from '../product/product-create/product-create.component';

@Component({
  selector: 'app-crud-produtos',
  standalone: true,
  imports: [ProductReadComponent],  // Inclua ProductReadComponent nas imports
  templateUrl: './crud-produtos.component.html',
 styleUrls: ['./crud-produtos.component.scss']
})
export class CrudProdutosComponent implements OnInit {
  produto = { nome: '', descricao: '', preco: 0, imagem: '' };
  produtos: any[] = [];

  constructor(private router: Router, private AuthService: AuthService) {}

  ngOnInit(): void {
  
  }


  navigateToProductCreate() {
    this.router.navigate(['product-create']);

  }

  logout(): void {
    this.AuthService.logout();
  }

  servico(): void {
    this.router.navigate(['service-area']);
  }

  cardapio(): void {
    this.router.navigate(['home']);
  }
}
