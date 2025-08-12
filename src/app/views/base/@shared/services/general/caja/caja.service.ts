import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CajaORM } from "../../../models/interfaces";
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

export class CajaService {
    header = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    getAllCajas(): Observable<BodyListResponse<CajaORM>>{
        return this.http.get<BodyListResponse<CajaORM>>(API_URL + '/api/cajas');
    }

    getCajaById(id: string): Observable<BodyListResponse<CajaORM>>{
        return this.http.get<BodyListResponse<CajaORM>>(API_URL + '/api/cajas/' + id);
    }

    createCaja(caja: CajaORM): Observable<BodyResponse<CajaORM>>{
        return this.http.post<BodyResponse<CajaORM>>(API_URL + '/api/cajas/', caja);
    }

}