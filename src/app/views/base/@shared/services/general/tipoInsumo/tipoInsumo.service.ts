import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TipoInsumoORM } from "../../../models/interfaces";
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

export class TipoInsumoService {
    header = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    getAllTipoInsumo(): Observable<BodyListResponse<TipoInsumoORM>>{
        return this.http.get<BodyListResponse<TipoInsumoORM>>(API_URL + '/api/tipo-insumo');
    }

    getTipoInsumoById(id: string): Observable<BodyListResponse<TipoInsumoORM>>{
        return this.http.get<BodyListResponse<TipoInsumoORM>>(API_URL + '/api/tipo-insumo/' + id);
    }

    createTipoInsumo(tipoInsumo: TipoInsumoORM): Observable<BodyResponse<TipoInsumoORM>>{
        return this.http.post<BodyResponse<TipoInsumoORM>>(API_URL + '/api/tipo-insumo/', tipoInsumo);
    }

}