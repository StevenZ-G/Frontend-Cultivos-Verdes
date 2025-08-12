import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ColorORM } from "../../../models/interfaces";
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

export class ColorService {
    header = new Headers({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) { }

    getAllColors(): Observable<BodyListResponse<ColorORM>>{
        return this.http.get<BodyListResponse<ColorORM>>(API_URL + '/api/color');
    }

    getColorById(id: string): Observable<BodyListResponse<ColorORM>>{
        return this.http.get<BodyListResponse<ColorORM>>(API_URL + '/api/color/' + id);
    }

    createColor(color: ColorORM): Observable<BodyResponse<ColorORM>>{
        return this.http.post<BodyResponse<ColorORM>>(API_URL + '/api/color/', color);
    }

}