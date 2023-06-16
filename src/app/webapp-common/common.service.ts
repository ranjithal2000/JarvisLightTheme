import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { 
  }

  addtoPortal(){
    
    //   this.http.post("local:3000/clearml/pipeline",{}).subscribe(response => {   
    // })
    }
}
