import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TipoRendimientoORM } from "../../../models/interfaces";
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

export class TipoRendimientoService {
    header = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    getAllTipoRendimiento(): Observable<BodyListResponse<TipoRendimientoORM>>{
        return this.http.get<BodyListResponse<TipoRendimientoORM>>(API_URL + '/api/tipo-rendimiento');
    }

    getTipoRendimientoById(id: string): Observable<BodyListResponse<TipoRendimientoORM>>{
        return this.http.get<BodyListResponse<TipoRendimientoORM>>(API_URL + '/api/tipo-rendimiento/' + id);
    }

    createTipoRendimiento(tipoRendimiento: TipoRendimientoORM): Observable<BodyResponse<TipoRendimientoORM>>{
        return this.http.post<BodyResponse<TipoRendimientoORM>>(API_URL + '/api/tipo-rendimiento/', tipoRendimiento);
    }

}