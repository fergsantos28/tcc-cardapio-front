import { Component, OnInit } from "@angular/core";
// @ts-ignore
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { menuItems } from "../../assets/itemsMenu.js";
import { CartItensComponent } from "../components/cart-itens/cart-itens.component";
import { OrderItensComponent } from "../components/order-itens/order-itens.component";
import { ProductService } from "../services/product.service.js";
import { firstValueFrom } from "rxjs";
import { environment } from "../environments/environment.js";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  apiUrl = environment.apiUrl
  mesas: any = [];
  cartCounter = 0;
  Itens: any[] = [];
  itemsSelected: any = [];
  mesaId: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private ProductService: ProductService
  ) {}

  addToCart(item: any) {
    this.itemsSelected.push(item);
    this.cartCounter++;
  }

  ngOnInit() {
    this.getMesaId();
    this.getProducts();
  }
  async getProducts() {
    this.Itens = await firstValueFrom(this.ProductService.getProducts());
    console.log("📢[home.component.ts:44]: this.Itens: ", this.Itens);
  }
  getMesaId() {
    this.route.paramMap.subscribe((params) => {
      this.mesaId = params.get("id");
      if (!this.mesaId) {
        this.gerarMesas();
      }
    });
  }

  openCart() {
    const dialogRef = this.dialog.open(CartItensComponent, {
      width: "600px",
      height: "800px",
      data: {
        items: this.itemsSelected,
        mesaId: this.mesaId,
      },
    });

    dialogRef.afterClosed().subscribe((updatedCart) => {
      if (updatedCart) {
        this.itemsSelected = updatedCart;
        this.cartCounter = this.itemsSelected.length;
      }
    });
  }

  openOrders() {
    this.dialog.open(OrderItensComponent, {
      width: "600px",
      height: "600px",
      data: this.mesaId,
    });
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }

  gerarMesas() {
    for (let i = 0; i < 50; i++) {
      this.mesas.push(i);
    }
  }

  irParaMesa(mesa: number) {
    this.router.navigate([`home/${mesa}`]);
  }
  servico() {
    this.router.navigate(["service-area"]);
  }
  cozinha() {
    this.router.navigate(["cozinha-area"]);
  }
}
