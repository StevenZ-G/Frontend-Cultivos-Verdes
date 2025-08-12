import { BodyResponse } from "./body-response";

export class VariablesGenerales {

  constructor() {}

  static VALOR_NO_ENCONTRADO: string = 'No Definido';

  // PARAMETROS DE LOS BOTONES
  static btn_ver_detalles: string = 'verDetalles';
  static btn_ocultar_detalles: string = 'OcultarDetalles';
  static btn_nuevo: string = 'nuevo';
  // PARAMESTROS_OPCIONIES_TABLA
  static btn_editar_tabla: string = 'editar';
  static btn_ver_adjunto_tabla: string = 'ver_adjunto';
  static btn_eliminar_tabla: string = 'eliminar';

  // TIPO DE DATOS
  static tipoDatoNumero: string = 'number';
  static tipoDatoCadena: string = 'string';
  static tipoDatoFecha: string = 'date';
  static tipoDatoFechaHora: string = 'date_full';
  static tipoDatoObjeto: string = 'object';
  static tipoDatoBoleano: string = 'boolean';
  static tipoDatoEstado: string = 'estado';
  static tipoDatoAdjunto: string = 'adjunto';
  static tipoUbicacionGeografica: string = 'ubicacion-geografica';

}
