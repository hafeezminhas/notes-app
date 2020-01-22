import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { RouterModule } from "@angular/router";
import { AppCommonsModule } from "../../app-commons/app-commons.module";
import { AddNoteComponent } from './dialogs/add-note/add-note.component';
import { NoteItemComponent } from './note-item/note-item.component';
import { EditNoteComponent } from './dialogs/edit-note/edit-note.component';
import { ShareNoteComponent } from './dialogs/share-note/share-note.component';


const routes = [
	{ path : '', component: NotesComponent },
	{ path : ':id', component: NoteItemComponent }
];

@NgModule({
	declarations: [
		NotesComponent,
		AddNoteComponent,
		NoteItemComponent,
		EditNoteComponent,
		ShareNoteComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		AppCommonsModule
	],
	entryComponents: [
		AddNoteComponent,
		EditNoteComponent,
		ShareNoteComponent
	]
})

export class NotesModule { }
