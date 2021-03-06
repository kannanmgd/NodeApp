import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CommonPopupComponent } from '../shared/common-popup/common-popup.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  addEmpResponse: any;
  updateEmpId: any;
  updateButton: any = false;
  addButton: any = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      department: ['', Validators.required],
      role: ['', Validators.required],
      addlineOne: ['', Validators.required],
      addlineTwo: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required]
    });

    this.activateRoute.queryParamMap.subscribe(params => {
      const paramsValues = {...params};
      this.updateEmpId = paramsValues['params'];
      this.http.post('http://localhost:8000/api/editEmployee', this.updateEmpId).subscribe(res => {
        const response = res[0];
        this.updateButton = response ? true : false;
        this.addButton = response ? false : true;
        this.employeeForm.patchValue(
          {
            name: response.employee_name,
            email: response.employee_email,
            age: response.employee_age,
            department: response.employee_dpt,
            role: response.employee_type,
            addlineOne: response.address_1,
            addlineTwo: response.address_2,
            city: response.city,
            state: response.state,
            pincode: response.pincode,
          }
          );
      });
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
      } else if (this.addEmpResponse.val === 'fail') {
        this.showErrorPopup(this.addEmpResponse.result);
      }
    });
  }

  isFieldValidRegister(field): boolean {
    return ((!this.employeeForm.get(field).valid && this.employeeForm.get(field).touched) ||
      (this.employeeForm.get(field).untouched));
  }

  setFormValues(data) {

  }

  goback() {
    this.router.navigate(['/dashboard']);
  }

  showErrorPopup(error) {
    const errorPopupData = {
        icon: 'error',
        popUpHeader: error,
        description: 'Please try different email id',
        btnName: 'Okay',
        action: ''
    };
    const dialogRef = this.dialog.open( CommonPopupComponent, {
      data: errorPopupData ,
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
    });
  }

}
