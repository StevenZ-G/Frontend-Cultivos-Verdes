import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InsumoORM } from '../../../@shared/models/interfaces';
import { InsumoService } from '../../../@shared/services/general/insumo/insumo.service';
import { TipoInsumoORM } from '../../../@shared/models/interfaces';
import { TipoInsumoService} from '../../../@shared/services/general/tipoInsumo/tipoInsumo.service'
import { CardComponent, CardHeaderComponent, CardBodyComponent  } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-insumos_us',
  templateUrl: './insumos_us.component.html',
  styleUrls: ['./insumos_us.component.scss'],
  standalone: true,
  imports: [FormsModule, 
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    ReactiveFormsModule,
    CardBodyComponent
  ],
})
export class InsumosUSComponent implements OnInit{
  
  public insumos: InsumoORM[] = [];
  public insumosUS: InsumoORM[] = [];
  public insumoSeleccionado?: InsumoORM[];
  public insumoSeleccionadoUS?: InsumoORM[];
  public tipoInsumos: TipoInsumoORM[] = [];
  public formulario!: FormGroup;
  public banderaMostrarDetalles = false;
  public banderaEditar = false;

  nuevoInsumo: InsumoORM = {
    id_insumo: '',
    id_tipo_insumo: 0,
    nombre: '',
    costo: '',
  }

  displayedColumns: string[] = ['nombre', 'costo', 'acciones'];

  pageSizeOptions = [5, 10, 20, 50];
  pageSize = 100;
  pageIndex = 0;
  totalItems = 0;

  private _data: InsumoORM[] = [];
  insumoView: InsumoORM[] = [];

  sortColumn: keyof InsumoORM | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private insumoService: InsumoService,
    private tipoInsumoService: TipoInsumoService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarInsumos();
    this.cargarTipoInsumos();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      id_insumo: [0],   // importante para que el backend decida
      id_tipo_insumo: [2],  
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
    });
  }

  cargarInsumos(): void {
    this.insumoService.getAllInsumo().subscribe({
      next: (data) => {
        this._data = data.data.filter(i => i.id_tipo_insumo === 2);
        this.insumos = this._data;
        this.totalItems = this._data.length;
        this.pageIndex = 0;
        this.refreshView();
      },
      error: (err) => {
        console.error('Error cargando Insumos:', err);
      }
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
    this.insumoView = arr.slice(start, end);
    this.totalItems = this._data.length;
  }

  cargarTipoInsumos(): void {
    this.tipoInsumoService.getAllTipoInsumo().subscribe({
      next: (data) => {
        this.tipoInsumos = data.data;
      },
      error: (err) => {
        console.error('Error cargando Tipo Insumos:', err);
      }
    });
  }

  toggleSort(col: keyof InsumoORM): void {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
    this.pageIndex = 0;
    this.refreshView();
  }

  getSortIndicator(col: keyof InsumoORM): 'asc' | 'desc' | null {
    return this.sortColumn === col ? this.sortDirection : null;
  }
  
  onTableAction(evt: { tipo: 'editar'; value: InsumoORM }) {
    if (evt.tipo === 'editar') {
      this.seleccionarGrupo(evt.value);
    }
  }

  // ====== TrackBy (performance) ======
  trackById = (_: number, item: InsumoORM) => item.id_insumo;

  seleccionarGrupo(grupo: InsumoORM) {
    this.banderaEditar = true;
    this.formulario.patchValue(grupo);
    this.banderaMostrarDetalles = false;
  }

  guardar(grupo: InsumoORM, isValid: boolean) {
    if (isValid) {
      console.log('Grupo a guardar', grupo);
      this.insumoService.createinsumo(grupo).subscribe({
        next: () => {
          this.cargarInsumos();
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
