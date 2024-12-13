import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ServiceAreaComponent } from "./service-area/service-area.component";
import { CartItensComponent } from "./components/cart-itens/cart-itens.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, ServiceAreaComponent, CartItensComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cardapio-digital';
}
