import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      password: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  isFieldValidRegister(field): boolean {
    return ((!this.employeeForm.get(field).valid && this.employeeForm.get(field).touched) ||
      (this.employeeForm.get(field).untouched));
  }

}
