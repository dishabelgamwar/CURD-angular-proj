import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  id: number = 0;
  userform: UntypedFormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private userService: UserService
  ) {
    this.userform = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address: ['', [Validators.required]],
      class: ['', [Validators.required]],
      id: [0, [Validators.required]],
      isActive: [true],
      phoneNumber:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      image:['', []]
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['id'] != null) {
        this.userform.get('Id')?.setValue(params['id']);
        const data = this.userService.getUserById(this.id);
        if (data) {
          this.userform.setValue(data);
        }
      }
    });
  }

  save() {
    if (this.userform.invalid) 
      return

    if (this.userform.get('id')?.value === 0) {
      // on Create New User
      this.userService.addUser(this.userform.value);
    } else {
      // on Update User info
      this.userService.updateUser(this.userform.value);
    }

    this.router.navigate(['/user']);
  }

}