import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { ProductoDto } from '../models/ProductoDto';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {

  producto!: ProductoDto;
  formProduct = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(0)]]
  });

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.getDetail$(Number(id)).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.formProduct = this.formBuilder.group({
          nombre: [this.producto.nombre, [Validators.required]],
          precio: [this.producto.precio, [Validators.required, Validators.min(0)]]
        });
      },
      error: (err) => {
        this.router.navigate(["/"]);
        this.toast.error(err);
      }
    })


  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.producto = this.formProduct.value;
    this.productoService.update$(Number(id), this.producto).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
        this.toast.success(data.mensaje);
      },
      error: (err) => this.toast.error(err.mensaje)
    }
    )
  }

}
