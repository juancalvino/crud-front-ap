import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  backIcon = faArrowLeft;
  producto!:Producto; 

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: HotToastService
    ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.getDetail$(id).subscribe({
      next: (producto)=> this.producto = producto,
      error: (err)=>{
        this.toast.error(err.mensaje);
        this.router.navigate(['/']);
      }
    })
  }

}
