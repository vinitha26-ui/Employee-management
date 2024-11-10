import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeList:any[] = [];
  editedEmployeeDetails :any;
  editedRow :any;
  navSelected = new BehaviorSubject('Overview');

  constructor(private http: HttpClient) { }

  public getEmployeeListCall():Observable<any>{ 
    return this.http.get(`./assets/json/employee-list.json`);
  
  }
  public setEmployeeList(list: any){
    this.employeeList = list;
  }
  public getEmployeeList():any[]{
    return this.employeeList;
  }

  public editedEmployee(editEmployee:any,index:any){
    this.editedEmployeeDetails = editEmployee;
    this.editedRow = index;
  }
  public getEditedEmployee(){
    return this.editedEmployeeDetails;
  }
  public saveData(data:any){
    let employeeArray :any[]=[];
    if(this.editedRow){
      this.employeeList.forEach((val ,index)=>{
        if(index === this.editedRow){
         employeeArray.push(data);
        }else{
          employeeArray.push(val);
        }
      });
      this.employeeList = employeeArray;
    }else{
      this.employeeList.push(data);
    }
   

  }
  public setSelectedNav(title: any){
    this.navSelected.next(title);
  }
  
}
