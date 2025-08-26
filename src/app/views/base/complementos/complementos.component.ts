import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComplementosORM } from '../../../@shared/models/interfaces';
import { ComplementosService } from '../../../@shared/services/general/complementos/complementos.service';
import { CardComponent, CardHeaderComponent, CardBodyComponent  } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-complementos',
  templateUrl: './complementos.component.html',
  styleUrls: ['./complementos.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule,
    CardComponent,
    CardHeaderComponent,
    ReactiveFormsModule,
    CardBodyComponent
  ],
})
export class ComplementosComponent implements OnInit {
  
  public complementos: ComplementosORM[] = [];
  public complementoSeleccionado?: ComplementosORM[];
  public formulario!: FormGroup;
  public banderaMostrarDetalles = false;
  public banderaEditar = false;

  displayedColumns: string[] = ['nombre_complemento', 'costo_complemento', 'acciones'];

  pageSizeOptions = [5, 10, 20, 50];
  pageSize = 100;
  pageIndex = 0;
  totalItems = 0;

  nuevoComplemento: ComplementosORM = {
    id_complemento: '',
    nombre_complemento: '',
    costo_complemento: '',
  }

  private _data: ComplementosORM[] = [];
  complementoView: ComplementosORM[] = [];

  sortColumn: keyof ComplementosORM | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private complementoService: ComplementosService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarComplementos();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      id_complemento: [0],   // importante para que el backend decida
      nombre_complemento: ['', Validators.required],
      costo_complemento: ['', Validators.required],
    });
  }

  cargarComplementos(): void {
    this.complementoService.getAllComplementos().subscribe({
      next: (data) => {
        this._data = data.data;
        this.complementos = this._data; 
        this.totalItems = this._data.length;
        this.pageIndex = 0;
        this.refreshView();
      },
      error: (err) => {
        console.error('Error cargando complementos:', err);
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
    this.complementoView = arr.slice(start, end);
    this.totalItems = this._data.length;
  }

  toggleSort(col: keyof ComplementosORM): void {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
    this.pageIndex = 0;
    this.refreshView();
  }

  getSortIndicator(col: keyof ComplementosORM): 'asc' | 'desc' | null {
    return this.sortColumn === col ? this.sortDirection : null;
  }
  
  onTableAction(evt: { tipo: 'editar'; value: ComplementosORM }) {
    if (evt.tipo === 'editar') {
      this.seleccionarGrupo(evt.value);
    }
  }

  // ====== TrackBy (performance) ======
  trackById = (_: number, item: ComplementosORM) => item.id_complemento;

  seleccionarGrupo(grupo: ComplementosORM) {
    this.banderaEditar = true;
    this.formulario.patchValue(grupo);
    this.banderaMostrarDetalles = false;
  }

  guardar(grupo: ComplementosORM, isValid: boolean) {
    if (isValid) {
      console.log('Grupo a guardar', grupo);
      this.complementoService.createComplemento(grupo).subscribe({
        next: () => {
          this.cargarComplementos();
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
