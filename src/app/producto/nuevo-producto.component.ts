import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Producto } from '../models/producto.model';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.scss']
})
export class NuevoProductoComponent implements OnInit {

  productoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required, Validators.min(0)])
  })


  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    let producto: Producto = this.productoForm.value;
    this.productoService.create$(producto)
      .subscribe({
        next: (data) => {
          this.router.navigate(['/']);
          this.toast.success(data);
        },
        error: (err) => {
          this.toast.error(err);
        }
      })
  }
}
