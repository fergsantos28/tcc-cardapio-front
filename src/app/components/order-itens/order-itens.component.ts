import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ServicesService } from "../../services/services.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-itens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-itens.component.html',
  styleUrl: './order-itens.component.scss'
})
export class OrderItensComponent {

  historico: any = [];
  mesaId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private services: ServicesService) {
    this.mesaId = data;
    this.getItens();
  }

  getItens() {
    this.services.historicoPedidos(this.mesaId).subscribe((res: any) => {
      this.historico = res.historico;
    });

  }
 
}
