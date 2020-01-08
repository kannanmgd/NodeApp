import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employeeDetails: any;

  displayedColumns: string[] = [
    'employee_Id',
    'employee_name',
    'employee_email',
    'employee_age',
    'employee_type',
    'employee_dpt',
    'address',
    'update'
  ];
  dataSource;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  data: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.http.get('http://localhost:8000/api/user').subscribe(response => {
      this.employeeDetails = response;
      this.dataSource = new MatTableDataSource(this.employeeDetails);
      this.dataSource.paginator = this.paginator;
    });
  }

  addEmployee() {
    this.router.navigate(['/employee']);
  }

  editEmployee(data) {
    const empId = {employee_Id: data.employee_Id};
    this.router.navigate(['/employee'], {queryParams: {id: data.employee_Id}});
  }

  deleteEmployee(data) {
    const test: any = {employee_Id: data.employee_Id};
    this.http.post('http://localhost:8000/api/deleteemp', test).subscribe(response => {
      console.log(response);
      this.employeeDetails = response;
      this.dataSource = new MatTableDataSource(this.employeeDetails);
      this.dataSource.paginator = this.paginator;
    });
  }
  viewEmployee(data) {
    console.log(data);
  }
}
