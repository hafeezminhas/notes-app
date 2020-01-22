import {User} from "./user";

export class Note {
	_id: string;
	title: string;
	body: string;
	isPrivate: boolean;
	owner: string | User;
	createdOn: Date;
	updatedOn: Date;
}
