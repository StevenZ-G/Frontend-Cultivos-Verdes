import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ComplementosORM } from "../../../models/interfaces";
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

export class ComplementosService {
    header = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    getAllComplementos(): Observable<BodyListResponse<ComplementosORM>>{
        return this.http.get<BodyListResponse<ComplementosORM>>(API_URL + '/api/complementos');
    }

    getComplementoById(id: string): Observable<BodyListResponse<ComplementosORM>>{
        return this.http.get<BodyListResponse<ComplementosORM>>(API_URL + '/api/complementos/' + id);
    }

    createComplemento(complemento: ComplementosORM): Observable<BodyResponse<ComplementosORM>>{
        return this.http.post<BodyResponse<ComplementosORM>>(API_URL + '/api/complementos/', complemento);
    }

}