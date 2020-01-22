import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'kt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loading = false;
	submitted = false;
	returnUrl: string;
	loginForm: FormGroup;

	loginError: string;

	constructor(private router: Router,
				private route: ActivatedRoute,
				private fb: FormBuilder,
				private toastr: ToastrService,
				private authService: AuthService) { }

	ngOnInit() {
		this.authService.logout();
		this.returnUrl = this.route.snapshot.queryParams.returnUrl? this.route.snapshot.queryParams.returnUrl : null;
		this.loginForm =  this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	get f() { return this.loginForm.controls; }

	onSubmit() {
		this.submitted = true;
		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;
		this.authService.login({ email: this.f.email.value, password: this.f.password.value })
			.subscribe(data => {
					// if(this.returnUrl) {
					// 	this.router.navigateByUrl(this.returnUrl);
					// }
					this.router.navigate(['/dashboard']);
				}, error => {
					this.loginError = error;
					this.toastr.error(error, 'Error');
					this.loading = false;
				});
	}
}
