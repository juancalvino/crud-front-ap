import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';

//Bottons
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.scss']
})
export class ListaProductoComponent implements OnInit {
  // Bottons
  viewIcon = faEye;
  editIcon = faEdit;
  removeIcon = faTrash;

  listaProductos$ !: Observable<Producto[]>;

  constructor(
    private productoService: ProductoService,
    private toast: HotToastService) { }

  ngOnInit(): void {
    this.updateListaProductos();
  }

  private updateListaProductos() {
    this.listaProductos$ = this.productoService.listaProductos$();
  }

  borrar(id: number) {
    this.productoService.delete$(id)
      .subscribe({
        next: (data) => {
          this.toast.success(data.mensaje);
          this.updateListaProductos();
        },
        error: (err) => {
          this.toast.error(err);
        }
      })
  }
}
