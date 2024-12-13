import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Adicione esta importação
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Adicione FormsModule aqui
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent {
  produto = {
    titulo_produto: '',
    descricao: '',
    valor: '',
    imagem: null as File | null,
  };

  previewImage: string | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  
  onSubmit(): void {
    this.criarProduto();
  }

  
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Limitar para de 5 MB pq deu merda 
      const maxSize = 5 * 1024 * 1024;

      if (file.size > maxSize) {
        alert('O arquivo é muito grande. O tamanho máximo permitido é 5 MB.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem válido.');
        return;
      }

     
      const reader = new FileReader();
      reader.onloadend = () => {
        this.previewImage = reader.result as string;
        this.produto.imagem = file;
      };
      reader.readAsDataURL(file);
    }
  }

  // Função para criar o produto
  criarProduto(): void {
    const formData = new FormData();
    formData.append('titulo_produto', this.produto.titulo_produto);
    formData.append('descricao', this.produto.descricao);
    formData.append('valor', this.produto.valor);

    // Verifica se a imagem foi selecionada
    if (this.produto.imagem) {
      formData.append('imagem', this.produto.imagem, this.produto.imagem.name);
    }

    // Agora envia a requisição para o backend
    this.productService.createProduct(formData).subscribe(
      (response) => {
        console.log('Produto criado com sucesso:', response);
        alert('Produto salvo com sucesso!');
        this.previewImage = null; // Limpar a imagem após o envio
        this.router.navigate(['/cadastrarProdutos']); // Redireciona após salvar
      },
      (error) => {
        console.error('Erro ao criar produto:', error);
        alert('Erro ao salvar o produto. Tente novamente.');
      }
    );
  }

  logout() {
    console.log('Usuário deslogado');
    // Adicione lógica de logout, como limpar tokens ou redirecionar
  }

  servico(): void {
    this.router.navigate(['service-area']);
  }

  cardapio(): void {
    this.router.navigate(['home']);
  }


}
