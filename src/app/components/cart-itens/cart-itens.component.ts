import { CommonModule, DecimalPipe, JsonPipe } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ServicesService } from "../../services/services.service";

@Component({
  selector: "app-cart-itens",
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, JsonPipe],
  templateUrl: "./cart-itens.component.html",
  styleUrl: "./cart-itens.component.scss",
})
export class CartItensComponent implements OnInit {
  cart: any[] = [];
  nameUser: string = "";
  telefone: string = "";
  mesaId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private services: ServicesService,
    private dialogRef: MatDialogRef<CartItensComponent>
  ) {
    this.cart = data.items;
    console.log("📢[cart-itens.component.ts:30]: data.items: ", data);
    this.mesaId = data.mesaId;
    this.agroupItems();
  }

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.cart);
    });
  }

  agroupItems() {
    let items: any = [];
    this.cart.forEach((item: any) => {
      let exists = items.find(
        (i: any) => i.titulo_produto === item.titulo_produto
      );
      if (exists) {
        exists.quantity += item.quantity || 1;
      } else {
        items.push({ ...item, quantity: item.quantity || 1 });
      }
    });
    this.cart = items;
    console.log("📢[cart-itens.component.ts:52]: items: ", items);
  }

 
  removeItem(item: any) {
    const foundItem = this.cart.find(
      (i: any) => i.titulo_produto === item.titulo_produto
    );
    console.log("📢[cart-itens.component.ts:57]: foundItem: ", foundItem);
    if (foundItem) {
      if (foundItem.quantity > 1) {
        foundItem.quantity--;
      } else {
        this.cart = this.cart.filter(
          (i: any) => i.titulo_produto !== item.titulo_produto
        );
        console.log("📢[cart-itens.component.ts:63]: this.cart: ", this.cart);
      }
    }
  }

  closeDialog() {
    this.dialogRef.close(this.cart);
  }

  calcularTotal(): number {
    return this.cart.reduce(
      (acc: number, item: any) => acc + item.valor * item.quantity,
      0
    );
  }

  realizarPedido() {
    const pedido = {
      nome_cliente: this.nameUser,
      telefone: this.telefone,
      mesa_id: this.mesaId,
      produtos: this.cart.map((item: any) => {
        console.log("📢[cart-itens.component.ts:99]: item: ", item);
        return {
          nome_produto: item.titulo_produto,
          quantidade: item.quantity,
          valor: item.valor,
          id: item.id,
        };
      }),
    };

    this.services.realizarPedido(pedido).subscribe((response: any) => {
      this.cart = [];
      this.dialogRef.close(this.cart);
    });
  }
  pedidoEValido() {
    return this.nameUser && this.mesaId && this.cart.length > 0;
  }

  validarNumeroTelefone(telefone: string) {
    if (telefone.length === 0) {
      return true;
    }
    // Expressão regular para números de telefone válidos
    const regex = /^(?:\+?\d{1,3})?[ ]?(?:\(?\d{2,3}\)?)[ ]?\d{4,5}[- ]?\d{4}$/;
    return regex.test(telefone);
  }
}
