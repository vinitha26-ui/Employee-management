import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(EmployeeService);
    // service = jasmine.createSpyObj(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
   it('should set employee list data' ,() =>{
    const employeeList =[
      {
          "name":"Andrew Bridgen",
          "designation":{
              "code":"SSD",
              "description":"Senior Software Developer"
          },
          "rating":"3.5",
          "experience":"5.8",
          "yearOfJoining":"2017",
          "currentTeam":{
              "code":"OCBC",
              "description":"OCBC Singapore"
          },
          "reportingManager":"Lalit Agarwal",
          "phoneNo":"7406559241",
          "email":"andrew@infrrd.ai"
      }
    ];
    expect(service.setEmployeeList(employeeList)).toBeUndefined();
    service.employeeList = employeeList;
   });

   it('should edit the employee list',() =>{
    const employeeList =[
      {
          "name":"Andrew Bridgen",
          "designation":{
              "code":"SSD",
              "description":"Senior Software Developer"
          },
          "rating":"3.5",
          "experience":"5.8",
          "yearOfJoining":"2017",
          "currentTeam":{
              "code":"OCBC",
              "description":"OCBC Singapore"
          },
          "reportingManager":"Lalit Agarwal",
          "phoneNo":"7406559241",
          "email":"andrew@infrrd.ai"
      }
    ];
    const editedRow = 0;
    expect(service.editedEmployee(employeeList,editedRow)).toBeUndefined()
    service.editedEmployeeDetails = employeeList;
    service.editedRow = editedRow;
   });
});
