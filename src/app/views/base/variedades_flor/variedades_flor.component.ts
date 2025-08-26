import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlorORM } from '../../../@shared/models/interfaces';
import { FlorService } from '../../../@shared/services/general/flor/flor.service';
import { CardComponent, CardHeaderComponent, CardBodyComponent  } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-variedades_flor',
  templateUrl: './variedades_flor.component.html',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    ReactiveFormsModule,
    CardBodyComponent
  ],
})
export class VariedadesFlorComponent implements OnInit{
  
  public flores: FlorORM[] = [];
  public florSeleccionada?: FlorORM[];
  public formulario!: FormGroup;
  public banderaMostrarDetalles = false;
  public banderaEditar = false;

  displayedColumns: string[] = ['nombre', 'costoR', 'costoA', 'costoL', 'acciones'];
  
  pageSizeOptions = [5, 10, 20, 50];
  pageSize = 100;
  pageIndex = 0;
  totalItems = 0;

  nuevaFlor: FlorORM = {
    id_flor: '',
    nombre: '',
    costoA:'',
    costoL:'',
    costoR:'',
  }

  private _data: FlorORM[] = [];
  florView: FlorORM[] = [];

  sortColumn: keyof FlorORM | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private florService: FlorService,
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarFlores();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      id_flor: [0],   // importante para que el backend decida
      nombre: ['', Validators.required],
      costoR: ['', Validators.required],
      costoA: ['', Validators.required],
      costoL: ['', Validators.required],
    });
  }

  cargarFlores(): void {
    this.florService.getAllFlor().subscribe({
      next: (data) => {
        this._data = data.data;
        this.flores = this._data;
        this.totalItems = this._data.length;
        this.pageIndex = 0;
        this.refreshView();
      },
      error: (err) => {
        console.error('Error cargando flores:', err);
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
    this.florView = arr.slice(start, end);
    this.totalItems = this._data.length;
  }

  toggleSort(col: keyof FlorORM): void {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
    this.pageIndex = 0;
    this.refreshView();
  }

  getSortIndicator(col: keyof FlorORM): 'asc' | 'desc' | null {
  return this.sortColumn === col ? this.sortDirection : null;
  }

  onTableAction(evt: { tipo: 'editar'; value: FlorORM }) {
    if (evt.tipo === 'editar') {
      this.seleccionarGrupo(evt.value);
    }
  }

  // ====== TrackBy (performance) ======
  trackById = (_: number, item: FlorORM) => item.id_flor;

  seleccionarGrupo(grupo: FlorORM) {
    this.banderaEditar = true;
    this.formulario.patchValue(grupo);
    this.banderaMostrarDetalles = false;
  }

  guardar(grupo: FlorORM, isValid: boolean) {
    if (isValid) {
      console.log('Grupo a guardar', grupo);
      this.florService.createFlor(grupo).subscribe({
        next: () => {
          this.cargarFlores();
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
