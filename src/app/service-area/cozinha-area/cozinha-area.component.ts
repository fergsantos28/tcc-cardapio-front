import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-cozinha-area',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cozinha-area.component.html',
  styleUrl: './cozinha-area.component.scss'
})
export class CozinhaAreaComponent {
  selectedTable: any = null;
  historico: any;
  mesas: any = []


  constructor(private AuthService: AuthService, private Services: ServicesService, private router: Router) {
  }

  ngOnInit() {
    this.getMesas()

  }

  logout() {
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

  hideOrder(item: any) {
    item.hidden = true; // Define a propriedade 'hidden' como true para esconder o pedido
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
  servico() {
    this.router.navigate(['service-area']);

  }
  cardapio() {
    this.router.navigate(['home']);

  }

  cadastrarProdutos() {
    this.router.navigate(['cadastrarProdutos']);

  }

  statusPorZap(pedido: any) {
    const { nome_cliente, produtos, telefone, statusPedido } = pedido;
    let mensagem = `Olá ${nome_cliente},\n\n`;
    if (statusPedido.toUpperCase() === 'PRONTO') {
      mensagem += `Seu pedido está pronto e logo estará a caminho!\n\n`;
      mensagem += `Status: Indo ate vc <3\n\n`;
    } else {
      mensagem += `Seu pedido está sendo preparado com carinho. Segue o status atualizado:\n\n`;
      mensagem += `Status: ${statusPedido.toUpperCase()}\n\n`;
    }
    mensagem += `Itens do pedido:\n`;
    produtos.forEach((produto: any) => {
      mensagem += `- ${produto.quantidade}x ${produto.nome_produto}\n`;
    });

    if (statusPedido.toUpperCase() === 'PRONTO') {
      mensagem += `\nAgradecemos pela preferência e desejamos uma ótima refeição!`;
    } else {
      mensagem += `\nAgradecemos pela sua preferência! Em breve seu pedido estará a caminho.!`;
    }
    const mensagemEncoded = encodeURIComponent(mensagem);
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=55${telefone}&text=${mensagemEncoded}`;
    window.open(urlWhatsApp, '_blank');
  }

}
