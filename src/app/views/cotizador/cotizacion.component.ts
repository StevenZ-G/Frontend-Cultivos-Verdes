import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective, CardComponent, CardBodyComponent } from '@coreui/angular';
import { ToastBodyComponent, ToastComponent, ToastHeaderComponent, ToasterPlacement } from '@coreui/angular';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';


// Interfaces
import { 
  CajaORM,
  ColorORM,
  ComplementosORM,
  FlorORM,
  FlorFormORM,
  GrupoCotizacionORM,
  InsumoORM,
  RendimientoORM,
  RendimientoPersonaORM,
  TipoInsumoORM,
  TipoRendimientoORM
 } from '../../@shared/models/interfaces';

// Servicos
import { CajaService } from '../../@shared/services/general/caja/caja.service';
import { ColorService } from '../../@shared/services/general/color/color.service';
import { ComplementosService} from '../../@shared/services/general/complementos/complementos.service';
import { FlorService } from '../../@shared/services/general/flor/flor.service';
import { GrupoCotizacionService } from '../../@shared/services/general/grupoCotizacion/grupoCotizacion.service';
import { InsumoService} from '../../@shared/services/general/insumo/insumo.service';
import { RendimientoService } from '../../@shared/services/general/rendimiento/rendimiento.service';
import { RendimientoPersonaService } from '../../@shared/services/general/rendimientoPersona/rendimientoPersona.service';
import { TipoInsumoService } from '../../@shared/services/general/tipoInsumo/tipoInsumo.service';
import { TipoRendimientoService } from '../../@shared/services/general/tipoRendimiento/tipoRendimiento.service';



@Component({
  selector: 'app-cotizacion',
  standalone: true,
  templateUrl: './cotizacion.component.html',
  imports: [
    CommonModule,
    ButtonDirective,
    CardComponent,
    CardBodyComponent,
    ReactiveFormsModule,
  ]
})
export class CotizacionComponent implements OnInit{

  cotizacionForm!: FormGroup;

  public grupoCotizacion: GrupoCotizacionORM[] = [];
  public grupoCotizacionSeleccionado: GrupoCotizacionORM[] = [];
  public cajas: CajaORM[] = [];
  public cajaSeleccionada: CajaORM[] = [];
  public flores: FlorORM[] = [];
  public florSeleccionada: FlorORM[] = [];
  public colores: ColorORM[] = [];
  public colorSeleccionado: CajaORM[] = [];
  public complementos: ComplementosORM[] = [];
  public complementoSeleccionado: ComplementosORM[] = [];
  public insumos: InsumoORM[] = [];
  public insumoSeleccionado: InsumoORM[] = [];
  public tipoInsumos: TipoInsumoORM[] = [];
  public tipoInsumoSeleccionado: TipoInsumoORM[] = [];
  public rendimientos: RendimientoORM[] = [];
  public rendimientoSeleccionado: RendimientoORM[] = [];
  public rendimientoPersonas: RendimientoPersonaORM[] = [];
  public rendimientoPersonaSeleccionada: RendimientoPersonaORM[] = [];
  public tipoRendimientos: TipoRendimientoORM[] = [];
  public tipoRendimientoSeleccionado: TipoRendimientoORM[] = [];

  // public formularios: FlorFormORM[] = Array.from({ length: 5 }, () =>({
  //   id_flor: '',
  //   id_color: '',
  //   tallos: 0,
  //   costo: 0,
  //   cambiarCostoFlor: false,
  // }));

  // temporada
  public temporada?: string = '';
  public tallos?: number = 0;

  // Banderas random
  public cambiarCostoFlor: boolean = false;
  public cambiarCostoCaja: boolean = false;
  public cambiarTallosCaja: boolean = false;

  constructor(
    private fb: FormBuilder,
    private grupoCotizacionService: GrupoCotizacionService,
    private cajaService: CajaService,
    private florService: FlorService,
    private colorService: ColorService,
    private complementoService: ComplementosService,
    private insumoService: InsumoService,
    private tipoInsumoService: TipoInsumoService,
    private rendimientoService: RendimientoService,
    private rendimientoPersonaService: RendimientoPersonaService,
    private tipoRendimientoService: TipoRendimientoService,
  ){}

  ngOnInit(): void {

    this.cotizacionForm = this.fb.group({
      paso1: this.fb.group({
        grupoCotizacion: [''],
        nombreCotizacion: ['', Validators.required],
        margenOperativo: [0, [Validators.required, Validators.min(1)]],
        tipoInsumo: [''],
        temporada: [''],
      }),
      flores: this.fb.array([]),
      paso3: this.fb.group({
        costoCaja: [''],
        numeroTallos: [''],
        costoComplemento: [''],
      }),
      insumos: this.fb.array([]),
    });

    // Generar los 5 formularios iniciales
    for (let i = 0; i < 5; i++) {
      this.addFlorForm();
    }

    this.cargarGrupoCotizacion();
    this.cargarTipoInsumos();
    this.cargarInsumos();
    this.cargarFlores();
    this.cargarColores();
    this.cargarCajas();
    this.cargarComplementos();
  }

  // flores 
  get floresArray() {
    return this.cotizacionForm.get('flores') as FormArray;
  }

  addFlorForm() {
    const florGroup = this.fb.group({
      id_flor: [''],
      id_color: [''],
      tallos: [0, Validators.min(1)],
      cambiarCostoFlor: [false],
      costo: [0],
    });
    this.floresArray.push(florGroup);
  }

  removeFlorForm(index: number) {
    this.floresArray.removeAt(index);
  }

  finish() {
    console.log(this.cotizacionForm.value);
    alert('Cotización finalizada ✅');
  }

  // Insumos

  loadInsumos() {
    const insumosFormArray = this.cotizacionForm.get('insumos') as FormArray;
    insumosFormArray.clear();

    this.insumos.forEach(insumo => {
      insumosFormArray.push(
        new FormGroup({
          id_insumo: new FormControl(insumo.id_insumo),
          nombre: new FormControl(insumo.nombre),
          seleccionado: new FormControl(insumo.nombre === 'LIGAS' || insumo.nombre === 'ETIQUETA VARIEDAD') // ✅ marcar LIGAS por defecto
        })
      );
    });
  }

  get insumosFormArray(): FormArray {
    return this.cotizacionForm.get('insumos') as FormArray;
  }

  // Agregar o quitar insumo
  toggleInsumo(insumo: string, checked: boolean) {
    const formArray = this.insumosFormArray;

    if (checked) {
      formArray.push(new FormControl(insumo));
    } else {
      const index = formArray.controls.findIndex(x => x.value === insumo);
      formArray.removeAt(index);
    }
  }

  // Añadir insumo fijo
  private addInsumo(insumo: string, checked: boolean) {
    if (checked) {
      this.insumosFormArray.push(new FormControl(insumo));
    }
  }

  //Add and remove formularios
  // addFormulario() {
  //   this.formularios.push({
  //     id_flor: '',
  //     id_color: '',
  //     tallos: 0,
  //     costo: 0,
  //     cambiarCostoFlor: false,
  //   })
  // }

  // removeFormulario(index: number) {
  //   this.formularios.splice(index, 1);
  // }
  
  //Cargar datos necesarios para cada paso
  cargarGrupoCotizacion() {
    this.grupoCotizacionService.getAllGrupoCotizacion().subscribe({
      next: (data) => {
        this.grupoCotizacion = data.data ?? [];
      }
    });
  }
  cargarCajas() {
    this.cajaService.getAllCajas().subscribe({
      next: (data) => {
        this.cajas = data.data ?? [];
      }
    });
  }
  cargarFlores() {
    this.florService.getAllFlor().subscribe({
      next: (data) => {
        this.flores = data.data ?? [];
      }
    });
  }
  cargarColores() {
    this.colorService.getAllColors().subscribe({
      next: (data) => {
        this.colores = data.data ?? [];
      }
    });
  }
  cargarComplementos() {
    this.complementoService.getAllComplementos().subscribe({
      next: (data) => {
        this.complementos = data.data ?? [];
      }
    });
  }
  cargarInsumos() {
    this.insumoService.getAllInsumo().subscribe({
      next: (data) => {
        this.insumos = data.data.filter(i => i.id_tipo_insumo === 1);
        this.loadInsumos();
      }
    });
    
  }
  cargarTipoInsumos() {
    this.tipoInsumoService.getAllTipoInsumo().subscribe({
      next: (data) => {
        this.tipoInsumos = data.data ?? [];
      }
    });
  }
  cargarRendimientos() {
    this.rendimientoService.getAllRendimiento().subscribe({
      next: (data) => {
        this.rendimientos = data.data ?? [];
      }
    });
  }
  cargarRendimientoPersonas() {
    this.rendimientoPersonaService.getAllRendimientoPersona().subscribe({
      next: (data) => {
        this.rendimientoPersonas = data.data ?? [];
      }
    });
  }
  cargarTipoRendimientos() {
    this.tipoRendimientoService.getAllTipoRendimiento().subscribe({
      next: (data) => {
        this.tipoRendimientos = data.data ?? [];
      }
    });
  }

  step = 1;
  nextStep() {
    if (this.step < 5) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  // finish() {
  //   alert('Cotización finalizada ✅');
  // }
}
