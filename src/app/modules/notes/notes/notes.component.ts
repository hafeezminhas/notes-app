import { Component, OnInit } from '@angular/core';
import {NotesService} from "../../../services/notes.service";
import {Note} from "../../../models/note";
import {EditNoteComponent} from "../dialogs/edit-note/edit-note.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {AddNoteComponent} from "../dialogs/add-note/add-note.component";

@Component({
  selector: 'kt-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

	page: number = 1;
	limit = 10;
	total: number;
	Notes: Note[];

	constructor(private modalService: NgbModal,
				private noteService: NotesService,
				private toastr: ToastrService) { }

	ngOnInit() {
		this.loadNotes();
	}

	addNote() {
		const modalRef = this.modalService.open(AddNoteComponent);

		modalRef.result.then((note) => {
			this.loadNotes();
			this.toastr.success('Note add successful.', 'Success');
		}).catch((error) => {
			console.log(error);
		});
	}

	deleteNote(note) {

	}

	private loadNotes() {
		this.noteService.getNotes(this.page, this.limit).subscribe((data) => {
			this.page = data.page;
			this.total = data.count;
			this.Notes = data.notes;
		});
	}
}
