import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { ServicesService } from "../services/services.service";

@Component({
  selector: 'app-service-area',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './service-area.component.html',
  styleUrl: './service-area.component.scss'
})
export class ServiceAreaComponent implements OnInit{
statusPorZap(_t17: any) {
throw new Error('Method not implemented.');
}
  mesas: any = []
  selectedTable: any = 1;
  historico: any;

  constructor(private AuthService: AuthService, private Services: ServicesService, private router: Router) {
  }

  ngOnInit() {
    this.getMesas()
  }

  logout(){
    this.AuthService.logout();
  }

  alterHistory(selectedTable: number) {
    this.selectedTable = selectedTable
    this.Services.historicoPedidos(selectedTable).subscribe({
      next: (response: any) => {
        this.historico = response.historico;
      },
      error: (error) => {
        this.historico = []
        alert('Não foi possível carregar o histórico de pedidos. Tente novamente mais tarde.');
      }
    });

  }
  getMesas() {
    this.Services.mesasAtivas().subscribe({
      next: (res: any) => {
        this.mesas = res.mesas;
        if (!this.selectedTable && this.mesas.length > 0) {
          this.selectedTable = this.mesas[0];
          this.alterHistory(this.mesas[0]);
        } else if (this.selectedTable) {
          const mesaSelecionada = this.mesas.filter((mesa: any) => mesa === this.selectedTable);
          if (mesaSelecionada.length === 0) {
            this.selectedTable = this.mesas[0];
            this.alterHistory(this.mesas[0]);
          }
        }
      },
      error: (error) => {
        alert('Não foi possível carregar as mesas ativas. Tente novamente mais tarde.');
      }
    });
  }

  deleteHistory(){
    this.Services.deletarHistoricoMesa(this.selectedTable).subscribe(() => {
      this.historico = [];
      this.selectedTable = null;
      this.getMesas()
    })
  }

  cozinha(){
    this.router.navigate(['cozinha-area']);

  }
  cardapio(){
    this.router.navigate(['home']);

  }

  cadastrarProdutos(){
    this.router.navigate(['cadastrarProdutos']);

  }

  
  comprovantePorZap(pedido: any){
    const { nome_cliente, valor_total, produtos, telefone } = pedido;

    let mensagem = `Olá ${nome_cliente},\n\n`;
    mensagem += `Agradecemos pelo seu pedido! Aqui estão os detalhes:\n\n`;
    mensagem += `Valor Total: R$ ${valor_total}\n\n`;
    mensagem += `Itens Consumidos:\n`;

    produtos.forEach((produto: any) => {
        mensagem += `- ${produto.quantidade}x ${produto.nome_produto} (R$ ${produto.valor})\n`;
    });

    mensagem += `\nAgradecemos pela preferência!`;

    
    const mensagemEncoded = encodeURIComponent(mensagem);

    
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=55${telefone}&text=${mensagemEncoded}`;

    
    window.open(urlWhatsApp, '_blank');

  }

  alterarStatus(order: number, status: string) {

    this.Services.alterarStatusPedido(order, status).subscribe((response: any) => {
      console.log("📢[cozinha-area.component.ts:86]: response: ", response);
      
      this.getMesas()
      this.alterHistory(this.selectedTable)
    },
      () => {
        this.historico = [];
      })
  }

}
