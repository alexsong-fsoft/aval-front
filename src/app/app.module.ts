import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing,appRoutingProviders } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';

import { ShowProductoComponent } from './components/show-producto/show-producto.component';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ShowProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
