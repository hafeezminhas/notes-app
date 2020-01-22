import { Component, OnInit } from '@angular/core';
import {NotesService} from "../../../services/notes.service";
import {ActivatedRoute} from "@angular/router";
import {Note} from "../../../models/note";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditNoteComponent} from "../dialogs/edit-note/edit-note.component";
import {ToastrService} from "ngx-toastr";
import {ShareNoteComponent} from "../dialogs/share-note/share-note.component";

@Component({
  selector: 'kt-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit {

	Note: Note;
	permissionWarning: string = null;

	constructor(private route: ActivatedRoute,
				private modalService: NgbModal,
				private noteService: NotesService,
				private toastr: ToastrService) { }

	ngOnInit() {
		this.loadNote();
	}

	editNote() {
		const modalRef = this.modalService.open(EditNoteComponent);
		modalRef.componentInstance.id = this.Note._id;

		modalRef.result.then((note) => {
			this.noteService.updateNote(this.Note._id, note).subscribe((res: Note) => {
				console.log(res);
				this.Note = res;
				this.toastr.success('Note update successful.', 'Success');
			});
		}).catch((error) => {
			console.log(error);
		});
	}

	shareNote() {
		const modalRef = this.modalService.open(ShareNoteComponent);
		modalRef.componentInstance.id = this.Note._id;

		modalRef.result.then((sharedNote) => {
			this.noteService.shareNote(this.Note._id, sharedNote).subscribe(res => {
				if(!res.success) {
					this.toastr.error(res.message, 'Error');
				} else {
					this.toastr.success('Note successfully shared', 'Success');
				}
			});
		}).catch((error) => {
			console.log(error);
		});
	}

	private loadNote () {
		this.noteService.getNote(this.route.snapshot.params.id).subscribe((res: any ) => {
			console.log(res);
			if(res.hasOwnProperty('permission') && !res.permission) {
				this.Note = null;
				this.permissionWarning = res.message;
			} else {
				this.Note = res;
			}
		}, err => {
			console.log(err);
		});
	}
}
