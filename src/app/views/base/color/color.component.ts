import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ColorORM } from '../../../@shared/models/interfaces';
import { ColorService } from '../../../@shared/services/general/color/color.service';
import { CardComponent, CardHeaderComponent, CardBodyComponent  } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  standalone: true,
  imports: [FormsModule, 
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    ReactiveFormsModule,
    CardBodyComponent
  ],
})
export class ColorComponent implements OnInit {
  
  public colores: ColorORM[] = [];
  public colorSeleccionado?: ColorORM[];
  public formulario!: FormGroup;
  public banderaMostrarDetalles = false;
  public banderaEditar = false;

  displayedColumns: string[] = ['nombre', 'codigo', 'acciones'];

  pageSizeOptions = [5, 10, 20, 50];
  pageSize = 100;
  pageIndex = 0;
  totalItems = 0;

  nuevoColor: ColorORM = {
    id_color: '',
    nombre: '',
    codigo: '',
  }

  private _data: ColorORM[] = [];
  colorView: ColorORM[] = [];

  sortColumn: keyof ColorORM | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private colorService: ColorService,
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarColores();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      id_color: [0],   // importante para que el backend decida
      nombre: ['', Validators.required],
      codigo: ['ffff', Validators.required],
    });
  }

  cargarColores(): void {
    this.colorService.getAllColors().subscribe({
      next: (data) => {
        this._data = data.data ?? [];
        this.colores = this._data; 
        this.totalItems = this._data.length;
        this.pageIndex = 0;
        this.refreshView();
      },
      error: (err) => {
        console.error('Error cargando color:', err);
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
    this.colorView = arr.slice(start, end);
    this.totalItems = this._data.length;
  }

  toggleSort(col: keyof ColorORM): void {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
    this.pageIndex = 0;
    this.refreshView();
  }

  getSortIndicator(col: keyof ColorORM): 'asc' | 'desc' | null {
    return this.sortColumn === col ? this.sortDirection : null;
  }
  
  onTableAction(evt: { tipo: 'editar'; value: ColorORM }) {
    if (evt.tipo === 'editar') {
      this.seleccionarGrupo(evt.value);
    }
  }

  // ====== TrackBy (performance) ======
  trackById = (_: number, item: ColorORM) => item.id_color;

  seleccionarGrupo(grupo: ColorORM) {
    this.banderaEditar = true;
    this.formulario.patchValue(grupo);
    this.banderaMostrarDetalles = false;
  }

  guardar(grupo: ColorORM, isValid: boolean) {
    if (isValid) {
      console.log('Grupo a guardar', grupo);
      this.colorService.createColor(grupo).subscribe({
        next: () => {
          this.cargarColores();
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