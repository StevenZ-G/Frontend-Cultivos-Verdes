import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GrupoCotizacionORM } from "../../../models/interfaces";
import { environment } from "../../../../../environments/environment.prod";
import { Observable } from "rxjs";
import { BodyListResponse } from "../../../models/general/body-list-response"
import { BodyResponse } from "../../../models/general/body-response"

const API_URL = environment.apiURL

@Injectable(
    {
        providedIn: 'root',
    }
)

export class GrupoCotizacionService {
    header = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    getAllGrupoCotizacion(): Observable<BodyListResponse<GrupoCotizacionORM>>{
        return this.http.get<BodyListResponse<GrupoCotizacionORM>>(API_URL + '/api/grupos-cotizacion');
    }

    getGrupoActivos(): Observable<BodyListResponse<GrupoCotizacionORM>>{
        return this.http.get<BodyListResponse<GrupoCotizacionORM>>(API_URL + '/api/grupos-cotizacion/activos');
    }

    getGrupoCotizacionById(id: string): Observable<BodyListResponse<GrupoCotizacionORM>>{
        return this.http.get<BodyListResponse<GrupoCotizacionORM>>(API_URL + '/api/grupos-cotizacion/' + id);
    }

    createGrupoCotizacion(grupoCotizacion: GrupoCotizacionORM): Observable<BodyResponse<GrupoCotizacionORM>>{
        return this.http.post<BodyResponse<GrupoCotizacionORM>>(API_URL + '/api/grupos-cotizacion/', grupoCotizacion);
    }

}