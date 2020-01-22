import { environment } from "../../../environments/environment";

export class HttpConfiguration {
	public apiUrl = '/api';
	public serverWithApiUrl = environment.apiPrefix + this.apiUrl;
}
