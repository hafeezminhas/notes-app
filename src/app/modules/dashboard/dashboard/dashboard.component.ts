import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Note} from "../../../models/note";
import {SharedNote} from "../../../models/shared-note";
import {Notification} from "../../../models/notification";
import {NotesService} from "../../../services/notes.service";
import {mergeMap} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	SharedNotes: SharedNote[];
	Notifications: Notification[];
	Notes: Note[];

	constructor(private fb: FormBuilder, private notesService: NotesService) { }

	ngOnInit() {
		forkJoin(
			this.notesService.getNotes(1, 7),
			this.notesService.getSharedNotes()).subscribe((res: any[]) => {
			this.Notes = res[0].notes;
			this.SharedNotes = res[1];
		});
	}
}
