import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Note} from "../../../../models/note";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NotesService} from "../../../../services/notes.service";
import {SharedNote} from "../../../../models/shared-note";
import {User} from "../../../../models/user";
import {Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, finalize, map, switchMap, tap} from "rxjs/operators";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'kt-share-note',
  templateUrl: './share-note.component.html',
  styleUrls: ['./share-note.component.scss']
})
export class ShareNoteComponent implements OnInit {
	@Input()id: string;
	shareNoteForm: FormGroup;
	submitted = false;
	searching = false;
	searchError = '';
	users: User[];

	Note: Note;
	Recipient: User;

	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private noteService: NotesService,
		private userService: UserService
	) {
		this.shareNoteForm = this.fb.group({
			user: [''],
			comments: ['']
		})
	}

	get f() { return this.shareNoteForm.controls; }

	ngOnInit() {
		this.loadNote();
		this.setupSearch();
	}

	onSearchFocus($event) {
		this.users = null;
		this.searching = true;
		this.userService.searchUsers().subscribe(res => {
			this.searching = false;
			this.users = res;
		});
	}

	selectRecipient(u) {
		this.users = null;
		this.Recipient = u;
	}

	resetRecipient() {
		this.users = null;
		this.Recipient = null;
	}

	private onSubmit() {
		if(!this.Recipient) {
			return;
		}
		let payload: SharedNote = {
			note: this.Note._id,
			recipient: this.Recipient._id,
			comments: this.shareNoteForm.value.comments
		};
		this.activeModal.close(payload);
	}

	private loadNote() {
		this.noteService.getNote(this.id).subscribe(res => {
			this.Note = res;
		});
	}

	private setupSearch(): void {
		this.shareNoteForm.controls.user.valueChanges.pipe(
			debounceTime(500),
			tap(() => {
				this.searching = true;
				this.users = null;
			}),
			switchMap(value => this.userService.searchUsers(value).pipe(
				finalize(() => {
					this.searching = false;
				}))
			)
		).subscribe((res: any) => {
			if (res.error) {
				this.searchError = res.error;
			} else {
				this.users = res;
			}
		});
	}
}
