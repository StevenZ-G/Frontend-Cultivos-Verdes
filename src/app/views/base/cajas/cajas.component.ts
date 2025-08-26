import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CajaORM } from '../../../@shared/models/interfaces';
import { CajaService } from '../../../@shared/services/general/caja/caja.service';
import { CardComponent, CardHeaderComponent, CardBodyComponent  } from '@coreui/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrls: ['./cajas.component.scss'],
  standalone: true,
  imports: [FormsModule, 
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    ReactiveFormsModule,
    CardBodyComponent
  ] // Si CajaService es providedIn: root no necesitas importarlo aquí
})
export class CajasComponent implements OnInit {

  public cajas: CajaORM[] = [];
  public cajaSeleccionada?: CajaORM[];
  public formulario!: FormGroup;
  public banderaMostrarDetalles = false;
  public banderaEditar = false;

  displayedColumns: string[] = ['nombre', 'costo', 'tallos', 'volumen', 'peso', 'descripcion', 'acciones'];

  pageSizeOptions = [5, 10, 20, 50];
  pageSize = 100;
  pageIndex = 0;
  totalItems = 0;

  nuevaCaja: CajaORM = {
    id_caja: '',
    nombre: '',
    costo: 0,
    tallos: 0,
    volumen: '',
    peso: 0,
    descripcion: '',
  }

  private _data: CajaORM[] =[];
  cajaView: CajaORM[] =[];

  sortColumn: keyof CajaORM | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private cajaService: CajaService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarCajas();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      id_caja: [0],   // importante para que el backend decida
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      tallos: ['', Validators.required],
      volumen: ['', Validators.required],
      peso: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  cargarCajas(): void {
    this.cajaService.getAllCajas().subscribe({
      next: (data) => {
        this._data = data.data ?? [];
        this.cajas = this._data; 
        this.totalItems = this._data.length;
        this.pageIndex = 0;
        this.refreshView();
      },
      error: (err) => {
        console.error('Error cargando cajas:', err);
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
    this.cajaView = arr.slice(start, end);
    this.totalItems = this._data.length;
  }

  toggleSort(col: keyof CajaORM): void {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
    this.pageIndex = 0;
    this.refreshView();
  }

  getSortIndicator(col: keyof CajaORM): 'asc' | 'desc' | null {
  return this.sortColumn === col ? this.sortDirection : null;
  }

  onTableAction(evt: { tipo: 'editar'; value: CajaORM }) {
    if (evt.tipo === 'editar') {
      this.seleccionarGrupo(evt.value);
    }
  }

  // ====== TrackBy (performance) ======
  trackById = (_: number, item: CajaORM) => item.id_caja;

  seleccionarGrupo(grupo: CajaORM) {
    this.banderaEditar = true;
    this.formulario.patchValue(grupo);
    this.banderaMostrarDetalles = false;
  }

  guardar(grupo: CajaORM, isValid: boolean) {
    if (isValid) {
      console.log('Grupo a guardar', grupo);
      this.cajaService.createCaja(grupo).subscribe({
        next: () => {
          this.cargarCajas();
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
