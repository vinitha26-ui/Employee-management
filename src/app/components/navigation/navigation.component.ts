import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navigationItems: any[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.navigationItems = [
      {
        title: 'Overview',
        selected: true
      },
      {
        title: 'Search',
        selected: false

      },
      {
        title: 'Filter',
        selected: false

      }
    ];
    

  }
  navSelected(title: any){
    this.employeeService.setSelectedNav(title);
    this.navigationItems.forEach(val =>{
      if(val.title === title){
        val.selected = true;
      }else{
        val.selected = false;
      }
    })
  }

}
