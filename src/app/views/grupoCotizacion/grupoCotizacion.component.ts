import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GrupoCotizacionORM } from 'src/app/@shared/models/interfaces';
import { GrupoCotizacionService } from '../../@shared/services/general/grupoCotizacion/grupoCotizacion.service';
import { environment } from 'src/environments/environment.prod';
import { CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';
import { CommonModule } from '@angular/common';

const tituloMensaje = environment.tituloSistema;
const tiempoEspera = environment.tiempoEspera;


@Component({
  selector: 'app-grupoCotizacion',
  templateUrl: './grupoCotizacion.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    ReactiveFormsModule,
    CardBodyComponent
  ]
})

export class GrupoCotizacionComponent implements OnInit {

  public grupoCotizacion: GrupoCotizacionORM[] = [];
  public grupoCotizacionPaginados: GrupoCotizacionORM[] = [];
  public formulario!: FormGroup;
  public banderaMostrarDetalles = false;
  public banderaEditar = false;

  public opcionesEstado = [
    { nombre: 'Activo', estado: 'A', color: 'Green' },
    { nombre: 'Inactivo', estado: 'I', color: 'Red' },
  ];

  displayedColumns: string[] = ['id_grupo_cotizacion', 'nombre_grupo', 'mnemonico', 'estado', 'acciones'];

  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private grupoCotizacionService: GrupoCotizacionService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarGrupoCotizacion();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      id_grupo_cotizacion: [0],   // importante para que el backend decida
      nombre_grupo: ['', Validators.required],
      mnemonico: ['', Validators.required],
      estado: ['A', Validators.required],
    });
  }

  cargarGrupoCotizacion() {
    this.grupoCotizacionService.getAllGrupoCotizacion().subscribe({
      next: (resp) => {
        this.grupoCotizacion = resp.data;
        this.totalItems = this.grupoCotizacion.length;
        this.paginar();
      },
      error: (err) => {
        console.error('Error al cargar grupos de cotización', err);
      }
    });
  }

  paginar() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.grupoCotizacionPaginados = this.grupoCotizacion.slice(start, end);
  }

  siguientePagina() {
    if ((this.pageIndex + 1) * this.pageSize < this.totalItems) {
      this.pageIndex++;
      this.paginar();
    }
  }

  anteriorPagina() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.paginar();
    }
  }

  ordenar(columna: keyof GrupoCotizacionORM) {
    this.grupoCotizacion.sort((a, b) => 
      (a[columna] ?? '') > (b[columna] ?? '') ? 1 : -1
    );
    this.paginar();
  }

  seleccionarGrupo(grupo: GrupoCotizacionORM) {
    this.banderaEditar = true;
    this.formulario.patchValue(grupo);
    this.banderaMostrarDetalles = true;
  }

  guardar(grupo: GrupoCotizacionORM, isValid: boolean) {

    if (isValid) {
      console.log('Grupo a guardar', grupo);
      this.grupoCotizacionService.createGrupoCotizacion(grupo).subscribe({
        next: () => {
          this.cargarGrupoCotizacion();
          this.resetFormulario();
        },
        error: (err) => console.error('Error al guardar grupo de cotización', err)
      });
    }
  }

  resetFormulario() {
    this.formulario.reset({
      id_grupo_cotizacion: 0,
      estado: 'A'
    });
    this.banderaEditar = false;
    this.banderaMostrarDetalles = false;
  }

  verDetalle() {
    if (this.banderaMostrarDetalles === true) {
      this.banderaMostrarDetalles = false;
      this.nuevo();
    } else {
      this.banderaMostrarDetalles = true;
    }
  }

  back() {
    this.banderaMostrarDetalles = false;
  }

  mensajeSuccess(msg: String) {
    console.log(msg);
  } 
  nuevo() {
    this.mensajeSuccess("Listo Para Crear un Nuevo Registro")
    this.banderaEditar = false;
  }
}
