import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotesService} from "../../../../services/notes.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'kt-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

	loading = false;
	submitted = false;
	addNoteForm: FormGroup;

	constructor(private fb: FormBuilder,
				private router: Router,
				public activeModal: NgbActiveModal,
				private noteService: NotesService,
				private toastr: ToastrService) {
		this.addNoteForm = this.fb.group({
			title: ['', Validators.required],
			body: ['', Validators.required],
			isPrivate: [true]
		});
	}

	ngOnInit() {}

	get f() { return this.addNoteForm.controls; }

	onSubmit() {
		this.submitted = true;
		if (this.addNoteForm.invalid) {
			return;
		}
		this.loading = true;
		this.noteService.createNote(this.addNoteForm.value).subscribe((data) => {
				console.log(data);
				if(data.success) {
					this.activeModal.close({ success: true });
				}
			}, (error) => {
				if(error.message) {
					this.toastr.error(error, 'Error');
				} else {
					this.toastr.error(error, 'Error');
				}
				this.loading = false;
			}
		)
	}
}
