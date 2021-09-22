import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ProductoService } from "src/app/services/producto.service";
// import { GaleriaService } from "src/app/services/galeria.service";
// import { ColorService } from "src/app/services/color.service";
// import { SelectorService } from "src/app/services/selector.service";
// import Drift from 'drift-zoom';
// import { UserService } from "src/app/services/user.service";
// import { CarritoService } from 'src/app/services/carrito.service';
// import * as io from "socket.io-client";
// import { PostalService } from "src/app/services/postal.service";
import { ComentarioService } from "src/app/services/comentario.service";
// import { VentaService } from 'src/app/services/venta.service';
// import { environment } from 'src/environments/environment';

declare var jQuery: any;
declare var $: any;

interface Tree {
	root: TreeNode;
}

interface TreeNode {
	label: string;
	children: TreeNode[];
}

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.css']
})
export class ShowProductoComponent implements OnInit {

  // public data: Tree;
	// public selectedTreeNode: TreeNode | null;

  public data: any;
	public selectedTreeNode: any | null;

  public url;
  public identity;
  // public socket = io(environment.socketUrl);
  
  public slug;
  public producto: any = {};
  
  public galeria: any = [];
  public first_img;
  public comentarios: any = [];
  public colores: any = [];
  public selectores: any = [];
  public postales;
  
  // public img_select;
  public cantidad_to_cart = 1;
  public precio_to_cart;
  public color_to_cart = '#16537e';
  public selector_to_cart = ' ';
  
  public err_stock = '';
  public selector_error = false;


  /*COMENTARIOS DATA */
  public cinco_estrellas = 0;
  public cuatro_estrellas = 0;
  public tres_estrellas = 0;
  public dos_estrellas = 0;
  public una_estrella = 0;

  public cinco_porcent = 0;
  public cuatro_porcent = 0;
  public tres_porcent = 0;
  public dos_porcent = 0;
  public uno_porcent = 0;
  public raiting_porcent = 0;
  public total_puntos = 0;
  public max_puntos = 0;
  public raiting_puntos = 0;

  /*PAGINATE COMENTS */
  public page = 1;
  public pageSize = 5;
  public count_cat;
  public sort_data_coment = 'raiting';

  /*FORM RESEÑA */
  public id_review_producto;
  public review_comentario = '';
  public review_name = '';
  public review_parent = '';
  public review_estrellas = '';
  public msm_error_review = '';

  public get_state_user_producto_coment = false;

  /*NEWST */
  public news_productos: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _comentarioService: ComentarioService,
    private _router: Router,
  ) {
    this.selectedTreeNode = null;
		// this.data = {
		// 	root: {
		// 		label: "first",
		// 		children: [
		// 			{
		// 				label: "second-a",
		// 				children: [
		// 					{
		// 						label: "third-first",
		// 						children: [
		// 							{
		// 								label: "ferth",
		// 								children: [
		// 									{
		// 										label: "fiver",
		// 										children: []
		// 									}
		// 								]
		// 							}
		// 						]
		// 					}
		// 				]
		// 			},
		// 			{
		// 				label: "second-b",
		// 				children: [
		// 					{
		// 						label: "third",
		// 						children: []
		// 					}
		// 				]
		// 			}
		// 		]
		// 	}
		// }
  }


  public selectNode( node: TreeNode ) : void {

		this.selectedTreeNode = node;

		console.group( "Selected Tree Node" );
		console.log( "Label:", node.label );
		console.log( "Children:", node.children.length );
		console.groupEnd();

	}


  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.slug = params['slug'];
        this.data_comentarios();
      }
    );
  }

  

  // sort_coments() {
  //   this._comentarioService.get_data(this.producto._id, this.sort_data_coment).subscribe(
  //     response => {
  //       this.comentarios = response.comentarios;
  //       this.count_cat = this.comentarios.length;
  //       this.page = 1;
  //       this.comentarios.forEach(element => {
  //         this._comentarioService.get_likes(element._id).subscribe(
  //           response => {
  //             element.likes = response.data.length;
  //           },
  //           error => {
  //             console.log(error);
  //           }
  //         );
  //         this._comentarioService.get_dislikes(element._id).subscribe(
  //           response => {
  //             element.dislikes = response.data.length;
  //           },
  //           error => {
  //             console.log(error);
  //           }
  //         );
  //       });
  //       console.log(this.comentarios);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }


  data_comentarios() {
    this._comentarioService.get_data(this.slug).subscribe(
      response => {
        this.comentarios = response;
        console.log(this.comentarios);
        this.data = {
          root: response
        }
      },
      error => {
        console.log(error);
      }
    );
  }



  saveComent(reviewForm) {
    if (reviewForm.valid) {
      let data = {
        user: reviewForm.value.review_name,
        comentario: reviewForm.value.review_comentario,
        estrellas: reviewForm.value.review_estrellas,
        parentId: this.review_parent ? this.review_parent : null,
        producto: this.slug,
      }

      console.log('data', data);
      this._comentarioService.registro(data).subscribe(
        response => {
          this.data_comentarios();
          this.msm_error_review = '';
          this.id_review_producto = '';
          this.review_comentario = '';
          //this.review_name = '';
          this.review_parent = '';
          this.review_estrellas = '';
          $('#preview-1').modal('hide');
          $('.modal-backdrop').removeClass('show');
        },
        error => {
          this.msm_error_review = error.error.message;
          this.id_review_producto = '';
          this.review_comentario = '';
          //this.review_name = '';
          this.review_parent = '';
          this.review_estrellas = '';
        }
      );
    } else {
      this.msm_error_review = 'Complete correctamente los campos.';
    }
  }


  add_parentId(parentId){
    this.review_parent = parentId
  }
  // close_alert() {
  //   this.msm_error_review = '';
  // }


  // close_toast() {
  //   $('#dark-toast').removeClass('show');
  //   $('#dark-toast').addClass('hide');
  // }

}
