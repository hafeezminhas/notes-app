import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {MustMatch} from "../../app-commons/helpers/must-match-validator";

@Component({
  selector: 'kt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	loading = false;
	submitted = false;

	userError: string;

	constructor(private formBuilder: FormBuilder,
				private router: Router,
				private userService: UserService,
				private toastr: ToastrService) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			firstName:	['', Validators.required],
			lastName:	['', Validators.required],
			phone:		['', Validators.required],
			email:		['', [Validators.required, Validators.email]],
			password:	['', [Validators.required, Validators.minLength(6)]],
			confirm:	['', [Validators.required, Validators.minLength(6)]],
		}, {
			validator: MustMatch('password', 'confirm')
		});
	}

	get f() { return this.registerForm.controls; }

	onSubmit() {
		this.submitted = true;
		if (this.registerForm.invalid) {
			return;
		}
		this.loading = true;
		this.userService.register(this.registerForm.value).subscribe((data) => {
				if(data.success) {
					this.toastr.success('User registration successful.', 'Success');
					this.router.navigate(['/login']);
				}
			},
			(error) => {
				this.userError = error;
				if(error.message) {
					this.toastr.error(error.message, 'Error');
				} else {
					this.toastr.error(error, 'Error');
				}
				this.loading = false;
			}
		)
	}
}
