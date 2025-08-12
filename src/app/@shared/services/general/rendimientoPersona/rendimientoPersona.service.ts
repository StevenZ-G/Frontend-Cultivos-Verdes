import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RendimientoPersonaORM } from "../../../models/interfaces";
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

export class RendimientoPersonaService {
    header = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    getAllRendimientoPersona(): Observable<BodyListResponse<RendimientoPersonaORM>>{
        return this.http.get<BodyListResponse<RendimientoPersonaORM>>(API_URL + '/api/rendimientos-persona');
    }

    getRendimientoPersonaById(id: string): Observable<BodyListResponse<RendimientoPersonaORM>>{
        return this.http.get<BodyListResponse<RendimientoPersonaORM>>(API_URL + '/api/rendimientos-persona/' + id);
    }

    createRendimientoPersona(rendimiento: RendimientoPersonaORM): Observable<BodyResponse<RendimientoPersonaORM>>{
        return this.http.post<BodyResponse<RendimientoPersonaORM>>(API_URL + '/api/rendimiento-persona/', rendimiento);
    }

}