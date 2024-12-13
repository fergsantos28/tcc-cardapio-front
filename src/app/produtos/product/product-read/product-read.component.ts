import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProductService } from '../../../services/product.service'; 
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-product-read',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss'],
})
export class ProductReadComponent implements OnInit{
  apiUrl = environment.apiUrl
  produtos: any[] = [];  
  isLoading: boolean = true;  

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
  }
async getProducts(){
  try {
    this.produtos= await firstValueFrom( this.productService.getProducts()).then((r)=>{
      this.isLoading = false;
      return r
    })
  } catch (error) {
    this.isLoading = false;
  }
}
  editarProduto(produtoId: number): void {
    // Navegar para a página de edição com o ID do produto
    this.router.navigate(['/product-update', produtoId]);
  }
  
  excluirProduto(id: number) {
    if (confirm(`Tem certeza que deseja excluir o produto?`)) {
      this.productService.deleteProduct(id).subscribe(
        (response) => {
          console.log('Produto excluído:', response);
          
          this.produtos = this.produtos.filter((produto) => produto.id !== id);
        },
        (error) => {
          console.error('Erro ao excluir produto:', error);
        }
      );
    }
  }
}
