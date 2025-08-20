import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GrupoCotizacionORM } from '../../@shared/models/interfaces';
import { GrupoCotizacionService } from '../../@shared/services/general/grupoCotizacion/grupoCotizacion.service';
import { environment } from '../../../environments/environment.prod';
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

  pageSizeOptions = [5, 10, 20, 50];
  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;

  private _data: GrupoCotizacionORM[] = [];
  grupoCotizacionView: GrupoCotizacionORM[] = [];

  sortColumn: keyof GrupoCotizacionORM | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

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
        this._data = resp.data ?? [];
        this.grupoCotizacion = this._data;
        this.totalItems = this._data.length;
        this.pageIndex = 0;
        this.refreshView();
      },
      error: (err) => console.error('Error al cargar grupos de cotización', err)
    });
  }

  private refreshView(): void {
    let arr = [...this._data];

    // sort
    if (this.sortColumn) {
      const col = this.sortColumn;
      const dir = this.sortDirection === 'asc' ? 1 : -1;
      arr.sort((a: any, b: any) => {
        const av = (a[col] ?? '').toString().toLowerCase();
        const bv = (b[col] ?? '').toString().toLowerCase();
        if (av > bv) return 1 * dir;
        if (av < bv) return -1 * dir;
        return 0;
      });
    }

    // paginate
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.grupoCotizacionView = arr.slice(start, end);
    this.totalItems = this._data.length;
  }

  toggleSort(col: keyof GrupoCotizacionORM): void {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
    this.pageIndex = 0;
    this.refreshView();
  }

  getSortIndicator(col: keyof GrupoCotizacionORM): 'asc' | 'desc' | null {
  return this.sortColumn === col ? this.sortDirection : null;
}

// ====== Paginación ======
  setPage(page: number): void {
    const totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));
    this.pageIndex = Math.min(Math.max(0, page), totalPages - 1);
    this.refreshView();
  }

  nextPage(): void {
    this.setPage(this.pageIndex + 1);
  }

  prevPage(): void {
    this.setPage(this.pageIndex - 1);
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.pageIndex = 0;
    this.refreshView();
  }

  // ====== Acciones de la tabla (menú) ======
  onTableAction(evt: { tipo: 'editar'; value: GrupoCotizacionORM }) {
    if (evt.tipo === 'editar') {
      this.seleccionarGrupo(evt.value);
    }
  }

  // ====== TrackBy (performance) ======
  trackById = (_: number, item: GrupoCotizacionORM) => item.id_grupo_cotizacion;

  seleccionarGrupo(grupo: GrupoCotizacionORM) {
    this.banderaEditar = true;
    this.formulario.patchValue(grupo);
    this.banderaMostrarDetalles = false;
  }

  guardar(grupo: GrupoCotizacionORM, isValid: boolean) {
    if (isValid) {
      console.log('Grupo a guardar', grupo);
      this.grupoCotizacionService.createGrupoCotizacion(grupo).subscribe({
        next: () => {
          this.cargarGrupoCotizacion();
          this.resetFormulario();
          alert('✅ Registro guardado con éxito');
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
    this.inicializarFormulario();
  }
}
