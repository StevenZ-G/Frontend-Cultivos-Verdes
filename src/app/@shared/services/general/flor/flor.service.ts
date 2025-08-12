import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FlorORM } from "../../../models/interfaces";
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

export class FlorService {
    header = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    getAllFlor(): Observable<BodyListResponse<FlorORM>>{
        return this.http.get<BodyListResponse<FlorORM>>(API_URL + '/api/flores');
    }

    getFlorById(id: string): Observable<BodyListResponse<FlorORM>>{
        return this.http.get<BodyListResponse<FlorORM>>(API_URL + '/api/flores/' + id);
    }

    createFlor(flor: FlorORM): Observable<BodyResponse<FlorORM>>{
        return this.http.post<BodyResponse<FlorORM>>(API_URL + '/api/flores/', flor);
    }

}