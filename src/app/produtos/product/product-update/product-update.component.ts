import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../../services/product.service";
import { CommonModule, Location } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-product-update",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.scss"],
})
export class ProductUpdateComponent implements OnInit {
  produto: any = {}; 
  selectedFile: File | null = null;
  previewImage: string | null = null;
  apiUrl = environment.apiUrl;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const produtoId = this.route.snapshot.paramMap.get("id"); // mudar para pegar o id pela url

    console.log("📢[product-update.component.ts:31]: produtoId: ", produtoId);

    if (produtoId) {
      this.productService.getProductById(produtoId).subscribe(
        (produto) => {
          if (!produto) {
            console.error("Produto não encontrado!");
            alert("Erro: Produto não encontrado!");
            return;
          }

          this.produto = produto.produto;
         
          if (this.produto.imagem) {
            this.previewImage = this.apiUrl + "storage/" + this.produto.imagem;
          }
          
          if (!this.produto.id) {
            this.produto.id = produtoId; 
          }
        },
        (error) => {
          console.error("Erro ao carregar produto:", error);
          alert(
            "Erro ao carregar os dados do produto. Por favor, tente novamente."
          );
        }
      );
    } else {
      console.error("ID do produto não encontrado na rota.");
      alert("Erro: ID do produto não encontrado na rota.");
    }
  }
  
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const maxSize = 5 * 1024 * 1024; 

      if (file.size > maxSize) {
        alert("O arquivo é muito grande. O tamanho máximo permitido é 5 MB.");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione um arquivo de imagem válido.");
        return;
      }

      
      const reader = new FileReader();
      reader.onloadend = () => {
        this.previewImage = reader.result as string;
        this.selectedFile = file;
      };
      reader.readAsDataURL(file);
    }
  }

  atualizarProduto(): void {
    console.log("📢[product-update.component.ts:92]: this.produto: ", this.produto);
    if (!this.produto.id) {
      console.error("Erro: ID do produto não está definido.");
      alert("Erro: ID do produto não está definido. Atualização cancelada.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo_produto", this.produto.titulo_produto);
    formData.append("descricao", this.produto.descricao);
    formData.append("valor", this.produto.valor);

    if (this.selectedFile) {
      formData.append("imagem", this.selectedFile); // Adiciona a imagem, se houver
    }

    console.log("FormData a ser enviado:", formData); // Adicione este log para verificar

    this.productService.updateProduct(this.produto.id, formData).subscribe(
      (response) => {
        console.log("Produto atualizado com sucesso:", response);
        this.router.navigate(["/product-read"]); // Redireciona após atualização
      },
      (error) => {
        console.error("Erro ao atualizar o produto:", error);
        alert("Erro ao atualizar o produto. Tente novamente.");
      }
    );
  }

  navigateToProductCreate(): void {
    this.router.navigate(["product-create"]);
  }

  servico(): void {
    this.router.navigate(["service-area"]);
  }

  cardapio(): void {
    this.router.navigate(["cadastrarProdutos"]);
  }
}
