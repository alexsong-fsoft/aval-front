import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { ShowProductoComponent } from './components/show-producto/show-producto.component';



const appRoute: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: InicioComponent },
  { path: 'producto/:slug', component: ShowProductoComponent },
  //{ path: '**', component: ErrorComponent },
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<AppRoutingModule> = RouterModule.forRoot(appRoute);


