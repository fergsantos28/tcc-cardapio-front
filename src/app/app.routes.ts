import { Routes } from '@angular/router';
import {ServiceAreaComponent} from "./service-area/service-area.component";
import {AuthGuard} from "./guards/auth.guard";
import { CozinhaAreaComponent } from './service-area/cozinha-area/cozinha-area.component';
import { HomeComponent } from './home/home.component';
import { CrudProdutosComponent } from './produtos/crud-produtos/crud-produtos.component';
import { ProductReadComponent } from './produtos/product/product-read/product-read.component';
import { ProductCreateComponent } from './produtos/product/product-create/product-create.component';
import { ProductUpdateComponent } from './produtos/product/product-update/product-update.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },

  {
    path: 'service-area',
    component: ServiceAreaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cozinha-area',
    component: CozinhaAreaComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'services-area',
    component: ServiceAreaComponent,
    canActivate: [AuthGuard]
  },

   {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  
  //Rota para cadastrar produtos
  {
    path: 'cadastrarProdutos', 
    component: CrudProdutosComponent,
  
  },

  
  //Rota para lista de produtos
  {
    path: 'product-read',
    component: ProductReadComponent
  
    
  }
  ,

  
  //Rota para criar de produtos
  {
    path: 'product-create',
    component: ProductCreateComponent
  
    
  },

  
  //Rota para atualizar produtos
  {
    path: 'product-update/:id',
    component: ProductUpdateComponent
  
    
  }
  
  

  


];
