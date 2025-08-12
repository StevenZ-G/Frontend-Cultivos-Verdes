import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RendimientoORM } from "../../../models/interfaces";
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

export class RendimientoService {
    header = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    getAllRendimiento(): Observable<BodyListResponse<RendimientoORM>>{
        return this.http.get<BodyListResponse<RendimientoORM>>(API_URL + '/api/rendimientos');
    }

    getRendimientoById(id: string): Observable<BodyListResponse<RendimientoORM>>{
        return this.http.get<BodyListResponse<RendimientoORM>>(API_URL + '/api/rendimientos/' + id);
    }

    createRendimiento(rendimiento: RendimientoORM): Observable<BodyResponse<RendimientoORM>>{
        return this.http.post<BodyResponse<RendimientoORM>>(API_URL + '/api/rendimientos/', rendimiento);
    }

}