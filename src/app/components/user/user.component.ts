import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/admin-services/user.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: false,
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  isSubmitted = false;
  users: any[] = [];
  roleNames = ['AUTHOR', 'USER'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  get roles() {
    return this.userForm.get('roles') as FormArray;
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: this.fb.array(
        [this.fb.control(false), this.fb.control(false)],
        this.atLeastOneRoleValidator(),
      ),
    });

    // for (let i of this.roleNames) {
    //   this.roles.push(this.fb.control(''));
    // }
    // this.getUsers();
  }

  atLeastOneRoleValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;

      const hasChecked = formArray.controls.some(
        (checkbox) => checkbox.value === true,
      );

      return hasChecked ? null : { roleRequired: true };
    };
  }

  // getUsers() {
  //   this.userService.getUserList().subscribe(users => {
  //     this.users = users;
  //   }, err => {
  //     this.users = [];
  //     alert('Failed to fetch users. Please check your connection or contact admin.');
  //     console.error('Fetch users error:', err);
  //   });
  // }

  private getUserData() {
    //let myUser = new User(this.userForm, this.roleNames);
    let data = this.userForm.value;

    let selectedRoles = [];

    for (let i = 0; i < data.roles.length; i++) {
      if (data.roles[i]) {
        selectedRoles.push(this.roleNames[i]);
      }
    }
    data.roles = selectedRoles;
    //console.log(data);
    return data;
  }

  saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitted = true;

    let data = this.getUserData();

    this.userService.saveUser(data).subscribe(
      () => {
        console.log('User save');

        this.toastrService.success('User added successfully!');

        this.userForm.reset();

        this.isSubmitted = false;
      },

      (err) => {
        this.isSubmitted = false;

        this.toastrService.error(
          'Failed to create user. Please try again.',
          'Error',
        );

        console.error('Add user error:', err);
      },
    );
  }

  /*saveUser() {
    this.isSubmitted = true;
    let data = this.getUserData();
    this.userService.saveUser(data).subscribe(
      () => {
        console.log('User save');
        this.toastrService.success('User added successfully!');
        //this.getUsers();
      },
      (err) => {
        this.isSubmitted = false;
        this.toastrService.error(
          'Failed to add user. Please check your connection or contact admin.',
          'Error'
        );
        console.error('Add user error:', err);
      },
    );
  }*/
}
