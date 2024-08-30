import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../service/dataservice.service';
import { Convert as BoardCvt, Board } from '../model/board_model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddKanbanDialogComponent } from '../add-kanban-dialog/add-kanban-dialog.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatDialogModule],
  providers: [DataserviceService],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'], // Corrected to `styleUrls`
})
export class IndexComponent {
  board = Array<Board>();
  AllBoard: Board[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataservice: DataserviceService,
    private dialog: MatDialog
  ) {
    http
      .get(this.dataservice.apiendpotint + '/board') // Corrected to `apiEndpoint`
      .subscribe((data: any) => {
        this.AllBoard = BoardCvt.toBoard(JSON.stringify(data));
        console.log(this.AllBoard);
      });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddKanbanDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      // Handle the result here if needed
    });
  }

  openBoard(boardId: number) {
    this.router.navigate(['/column', boardId]);
  }
}
