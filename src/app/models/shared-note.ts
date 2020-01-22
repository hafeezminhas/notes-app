export class SharedNote {
	_id?: string;
	note: string | object;
	recipient: string;
	comments?: string;
	sharedOn?: Date;
}
