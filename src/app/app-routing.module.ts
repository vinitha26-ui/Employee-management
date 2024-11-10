import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path:'',redirectTo:'home',pathMatch:'full',
     },{
      path:'home', component: HomeComponent,
   
 
     },
     {
      path:'edit-employee', component: EditEmployeeComponent
     }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
