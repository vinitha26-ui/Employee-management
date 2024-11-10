import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  employeeList: any[] = [];
  rowSelected: number = 0;
  showEmployeePopup: boolean = false;
  hideEmployeeList: boolean = false;
  searchSelected = false;
  employeeListData: any[] = [];
  search:any;
  filterSelected = false;
  filterOptions :any[] = [];
  selectedValue: any[]=[];


  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.filterOptions = [
      {
        title: 'Designation',
        options:[
          {
            code:'SV',
            description:'Select Value'
          },
          {
            code:'SD',
            description:'Software Developer'
          },
          {
            code:'SSD',
            description:'Senior Software Developer'
          },
          {
            code:'QA',
            description:'Quality Assurance'
          },
          {
            code:'TL',
            description:'Technical Lead'
          },
          {
            code:'M',
            description:'Manager'
          }
        ]
      },
      {
        title:'Current Team',
        options:[
          {
            code:'SV',
            description:'Select Value'
          },
          {
            code:'PT',
            description:'Product Team'
          },
          {
            code:'IDC',
            description:'IDC'
          },
          {
            code:'OCBC',
            description:'OCBC Singapore'
          },
          {
            code:'RADIAN',
            description:'Radian'
          },
          {
            code:'RUSTIFY',
            description:'Rustify'
          }
        ]
      }
    ];
    this.filterOptions.forEach((val:any,i:number)=>{
      this.selectedValue[i] = 'SV'
    });
   this.employeeService.navSelected.subscribe(val =>{
    this.searchSelected = val === 'Search' ? true : false;
    this.filterSelected = val === 'Filter' ? true :  false;
      this.hideEmployeeList = false;
   });
    this.employeeList = this.employeeService.getEmployeeList() ? this.employeeService.getEmployeeList():[];
 this.employeeListData = this.employeeList;
   if(this.employeeList?.length == 0)
    this.employeeService.getEmployeeListCall().subscribe((val:any) => {
      if(val && val.employeeList && val.employeeList.length > 0)
      this.employeeList = val.employeeList;
 this.employeeListData = this.employeeList;
      this.employeeService.setEmployeeList(this.employeeList);
    
    });
  }

  

  deleteEmployee(i:number){
    this.employeeList.splice(i,1);
 this.employeeListData = this.employeeList;
    this.employeeService.setEmployeeList(this.employeeList);
  }

  editEmployee(employee:any,index: any){
    this.employeeService.editedEmployee(employee,index);
    this.hideEmployeeList = true;
    this.router.navigate(['/edit-employee']);
  }

  addEmployee(){
    this.employeeService.editedEmployee(null,null);
    this.hideEmployeeList = true;
    this.router.navigate(['/edit-employee']);
  }

  searchedValue(){
    const dataList = this.employeeListData;
    this.employeeList = dataList.filter(res => (res?.name?.toLowerCase().includes(this.search.toLowerCase()) || res?.email.toLowerCase().includes(this.search.toLowerCase())));
  }

  onChange(event:Event,i:number){
    this.selectedValue[i]=event;
  }
  onClear(){
    this.selectedValue.forEach((val: any,i:number)=>{
    this.selectedValue[i] = 'SV'
    });
  }
  onSubmit(){
    const dataList = this.employeeListData;
    const selectedDesignation = this.filterOptions[0]?.options.filter((val:any) => val.code === this.selectedValue[0]);
    const selectedTeam = this.filterOptions[1]?.options.filter((val:any) => val.code === this.selectedValue[1]);
  if(selectedDesignation[0].code !== 'SV' && selectedTeam[0].code !== 'SV'){
      this.employeeList = dataList.filter(res => ((res?.designation?.code === selectedDesignation[0].code) && (res?.currentTeam?.code === selectedTeam[0].code)));
  }else if(selectedDesignation[0].code === 'SV'){
    this.employeeList = dataList.filter(res => (res?.currentTeam?.code === selectedTeam[0].code));
}else if(selectedTeam[0].code === 'SV'){
  this.employeeList = dataList.filter(res => (res?.designation?.code === selectedDesignation[0].code) );
}
  }


}
