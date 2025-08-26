import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RendimientoORM } from '../../../@shared/models/interfaces';
import { RendimientoService } from '../../../@shared/services/general/rendimiento/rendimiento.service';
import { TipoRendimientoORM } from '../../../@shared/models/interfaces';
import { TipoRendimientoService } from '../../../@shared/services/general/tipoRendimiento/tipoRendimiento.service';
import { CardComponent, CardHeaderComponent, CardBodyComponent  } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navs',
  templateUrl: './rendimientos.component.html',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    ReactiveFormsModule,
    CardBodyComponent
  ],
})
export class RendimientosComponent implements OnInit {

  public rendimientos: RendimientoORM[] = [];
  public rendimientoSeleccionado?: RendimientoORM[];
  public tipoRendimiento: TipoRendimientoORM[] = [];
  public tipoRendimientoSeleccionado?: TipoRendimientoORM[] = [];
  public formulario!: FormGroup;
  public banderaMostrarDetalles = false;
  public banderaEditar = false;

  displayedColumns: string[] = ['nombre_rendimiento', 'rendimiento','costoR', 'costoT', 'costoL', 'acciones'];
  
  pageSizeOptions = [5, 10, 20, 50];
  pageSize = 100;
  pageIndex = 0;
  totalItems = 0;

  nuevoRendimiento: RendimientoORM = {
    id_rendimiento: '',
    id_tipo_rendimiento: '',
    nombre_rendimiento: '',
    costoL: '',
    costoR: '',
    costoT: '',
    rendimiento: '',
  }

  private _data: RendimientoORM[] = [];
  rendimientoView: RendimientoORM[] = [];
  
  sortColumn: keyof RendimientoORM | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private rendimientoService: RendimientoService,
    private tipoRendimientoService: TipoRendimientoService,
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarRendimientos();
    this.cargarTipoRendimiento();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      id_rendimiento: [0],   // importante para que el backend decida
      id_tipo_rendimiento: ['', Validators.required],
      nombre_rendimiento: ['', Validators.required],
      rendimiento: ['', Validators.required],
      costoR: ['', Validators.required],
      costoT: ['', Validators.required],
      costoL: ['', Validators.required],
    });
  }

  cargarRendimientos(): void {
    this.rendimientoService.getAllRendimiento().subscribe({
      next: (data) => {
        this._data = data.data;
        this.rendimientos = this._data;
        this.totalItems = this._data.length;
        this.pageIndex = 0;
        this.refreshView();
      },
      error: (err) => {
        console.error('Error cargando Rendimientos:', err);
      }
    });
  }

  cargarTipoRendimiento(): void{
    this.tipoRendimientoService.getAllTipoRendimiento().subscribe({
      next: (data) => {
        this.tipoRendimiento = data.data;
      },
      error: (err) => {
        console.error('Error cargando Tipo Rendimientos:', err);
      }
    })
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
    this.rendimientoView = arr.slice(start, end);
    this.totalItems = this._data.length;
  }

  toggleSort(col: keyof RendimientoORM): void {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
    this.pageIndex = 0;
    this.refreshView();
  }

  getSortIndicator(col: keyof RendimientoORM): 'asc' | 'desc' | null {
  return this.sortColumn === col ? this.sortDirection : null;
  }

  onTableAction(evt: { tipo: 'editar'; value: RendimientoORM }) {
    if (evt.tipo === 'editar') {
      this.seleccionarGrupo(evt.value);
    }
  }

  // ====== TrackBy (performance) ======
  trackById = (_: number, item: RendimientoORM) => item.id_rendimiento;

  seleccionarGrupo(grupo: RendimientoORM) {
    this.banderaEditar = true;
    this.formulario.patchValue(grupo);
    this.banderaMostrarDetalles = false;
  }

  guardar(grupo: RendimientoORM, isValid: boolean) {
    if (isValid) {
      console.log('Grupo a guardar', grupo);
      this.rendimientoService.createRendimiento(grupo).subscribe({
        next: () => {
          this.cargarRendimientos();
          this.resetFormulario();
          alert('✅ Registro guardado con éxito');
        },
        error: (err) => console.error('Error al guardar grupo de cotización', err)
      });
    }
  }

  resetFormulario() {
    this.formulario.reset({
      id_caja: 0,
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
