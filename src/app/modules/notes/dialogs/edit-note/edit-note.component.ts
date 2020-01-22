import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Note} from "../../../../models/note";
import {NotesService} from "../../../../services/notes.service";

@Component({
  selector: 'kt-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
	@Input()id: number;
	noteForm: FormGroup;
	submitted = false;

	Note: Note;

	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private noteService: NotesService
	) {
		this.noteForm = this.fb.group({
			title: ['', Validators.required],
			body: ['', Validators.required],
			isPrivate: [true]
		})
	}

	get f() { return this.noteForm.controls; }

	ngOnInit() {
		this.noteService.getNote(this.id.toString()).subscribe(res => {
			this.Note = res;
			this.noteForm.controls.title.setValue(res.title);
			this.noteForm.controls.isPrivate.setValue(res.isPrivate);
			this.noteForm.controls.body.setValue(res.body);
		});
	}

	private onSubmit() {
		this.Note.title = this.noteForm.value.title;
		this.Note.body = this.noteForm.value.body;
		this.Note.isPrivate = this.noteForm.value.isPrivate;
		this.Note.owner = this.Note.owner._id;
		this.activeModal.close(this.Note);
	}
}
