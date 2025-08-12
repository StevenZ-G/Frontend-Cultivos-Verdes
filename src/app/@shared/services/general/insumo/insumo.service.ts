import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { InsumoORM } from "../../../models/interfaces";
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

export class InsumoService {
    header = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    getAllInsumo(): Observable<BodyListResponse<InsumoORM>>{
        return this.http.get<BodyListResponse<InsumoORM>>(API_URL + '/api/insumo');
    }

    getInsumoById(id: string): Observable<BodyListResponse<InsumoORM>>{
        return this.http.get<BodyListResponse<InsumoORM>>(API_URL + '/api/insumo/' + id);
    }

    createinsumo(insumo: InsumoORM): Observable<BodyResponse<InsumoORM>>{
        return this.http.post<BodyResponse<InsumoORM>>(API_URL + '/api/insumo/', insumo);
    }

}