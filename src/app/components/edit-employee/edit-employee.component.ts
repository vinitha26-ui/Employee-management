import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  form: any;
  designationList : any[] =[];
  teamList : any[] = [];
  selectedEmployee: any;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router) { 

  }

  ngOnInit(): void {
    this.designationList = [
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
    ];
    this.teamList = [
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
    ];
    
  this.selectedEmployee = this.employeeService.getEditedEmployee();
  this.buildForm(this.selectedEmployee);
    
  }
  buildForm(val?: any): void {
    this.form  = this.formBuilder.group({
      name: this.formBuilder.control(val && val.name? val.name:null,Validators.required),
      designation: this.formBuilder.control(val && val.designation ? val.designation.code:null,Validators.required),
      experience: this.formBuilder.control(val && val.experience ? val.experience:null,Validators.required),
      rating: this.formBuilder.control(val && val.rating ? val.rating:5.4,Validators.required),
      yearOfJoining: this.formBuilder.control(val && val.yearOfJoining ? val.yearOfJoining:null,Validators.required),
      currentTeam: this.formBuilder.control(val && val.currentTeam ? val.currentTeam.code:null,Validators.required),
      reportingManager: this.formBuilder.control(val && val.reportingManager ? val.reportingManager:null,Validators.required),
      phoneNo: this.formBuilder.control(val && val.phoneNo ? val.phoneNo:null,Validators.required),
      email: this.formBuilder.control(val && val.email ? val.email:null,[Validators.required]),
   
    });
  }
  saveData(){
    const data = {
      name: this.form.value.name,
      designation: this.form.value.designation,
      experience: this.form.value.experience,
      rating: this.form.value.rating,
      yearOfJoining: this.form.value.yearOfJoining,
      currentTeam: this.form.value.currentTeam,
      reportingManager: this.form.value.reportingManager,
      phoneNo: this.form.value.phoneNo,
      email:  this.form.value.email
    }
    this.employeeService.saveData(data);
this.router.navigate(['/']);
  }

}
