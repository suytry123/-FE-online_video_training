import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: false
})
export class UserComponent implements OnInit{

  userForm !: FormGroup;
  isSubmitted = false;
  users: any[] = [];
  roleNames = ["AUTHOR", "USER"];

  constructor(private fb : FormBuilder,
     private userService:UserService,
     private router: Router) { }

  get roles(){
    return this.userForm.get("roles") as FormArray;
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      roles: this.fb.array([]),
  });

  for(let i of this.roleNames){
    this.roles.push(this.fb.control(''));
  }
  // this.getUsers();
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

  goToUserForm() {
    // Navigate to a user form page or open a modal (implement as needed)
    // Example: this.router.navigate(['user/form']);
    alert('User form navigation not implemented.');
  }

  edit(userId: number) {
    // Navigate to edit user page or open a modal (implement as needed)
    // Example: this.router.navigate(['user/form', userId]);
    alert('Edit user not implemented.');
  }

  private getUserData(){
     //let myUser = new User(this.userForm, this.roleNames);
     let data = this.userForm.value;

     let selectedRoles = [];
 
     for(let i=0;i<data.roles.length; i++){
       if(data.roles[i]){
           selectedRoles.push(this.roleNames[i])
       }
   }
     data.roles = selectedRoles;
     //console.log(data);
     return data;
  }

  saveUser(){
    this.isSubmitted = true;
    let data = this.getUserData();
    this.userService.saveUser(data).subscribe(() => {
      console.log("User save");
      //this.getUsers();
    }, err =>{
      this.isSubmitted = false;
      alert('Failed to add user. Please check your connection or contact admin.');
      console.error('Add user error:', err);
    })
  }

}
