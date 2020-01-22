export class Note {
	_id: string;
	title: string;
	body: string;
	isPrivate: boolean;
	owner: string | object;
	createdOn: Date;
	updatedOn: Date;
}
