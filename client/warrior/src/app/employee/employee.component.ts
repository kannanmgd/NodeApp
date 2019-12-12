import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  addEmpResponse: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      addlineOne: ['', Validators.required],
      addlineTwo: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  onSubmit() {
    const employeeValues = this.employeeForm.value;
    console.log(employeeValues);
    const formValues = {
      name: employeeValues.name,
      email: employeeValues.email,
      age: employeeValues.age,
      role: employeeValues.role,
      department: employeeValues.department,
      address_1: employeeValues.addlineOne,
      address_2: employeeValues.addlineTwo,
      city: employeeValues.city,
      state: employeeValues.state,
      pincode: employeeValues.pincode
    };
    this.http.post('http://localhost:8000/api/addEmployee', formValues).subscribe(res => {
      this.addEmpResponse = res;
      if (this.addEmpResponse.val === 'success') {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  isFieldValidRegister(field): boolean {
    return ((!this.employeeForm.get(field).valid && this.employeeForm.get(field).touched) ||
      (this.employeeForm.get(field).untouched));
  }

  goback() {
    this.router.navigate(['/dashboard']);
  }

}
