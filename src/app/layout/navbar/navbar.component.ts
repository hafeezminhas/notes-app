import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
	isCollapsed: boolean = true;
	currentUser;

	constructor(private authService: AuthService) { }

	ngOnInit() {}

	ngAfterViewInit() {
		this.authService.currentUser.subscribe(res => {
			this.currentUser = res;
		});
	}

	signOut() {
		this.authService.logout();
	}
}
