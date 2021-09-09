import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs'
import { MeasuresModel } from '../model/MeasuresModel';

@Injectable({
  providedIn: 'root'
})
export class MeasureService {

constructor(public Http : HttpClient) {}

    getDistinctList():Observable<any>{
      return this.Http.get("http://localhost:42165/SysUnitsOfMeasure/DistinctList")
    }

    getMeasures(caption:string):Observable<any>{
      return this.Http.get(`http://localhost:42165/SysUnitsOfMeasure/GetMeasures?caption=${caption}`)
    }

    addNewMeasures(data:{}):Observable<any>{
      return this.Http.post("http://localhost:42165/SysUnitsOfMeasure/AddNew" , data)
    }

    updateMeasures(data:{}):Observable<any>{
      return this.Http.patch("http://localhost:42165/SysUnitsOfMeasure/UpdateMeasures" , data)
    }

}
