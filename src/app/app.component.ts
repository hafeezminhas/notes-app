import { Subscription } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {SplashScreenService} from "./app-commons/services/splash-screen.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'Notes Application';
	loader: boolean;
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 * @param router: Router
	 */
	constructor(private router: Router, private splashService: SplashScreenService) {}

	/**
	 * On init
	 */
	ngOnInit(): void {
		const routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				window.scrollTo(0, 0);
			}
		});
		this.unsubscribe.push(routerSubscription);
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}
