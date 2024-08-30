import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DataserviceService } from '../service/dataservice.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-kanban-dialog',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  providers: [DataserviceService],
  templateUrl: './add-kanban-dialog.component.html',
  styleUrls: ['./add-kanban-dialog.component.scss'], // Corrected to `styleUrls`
})
export class AddKanbanDialogComponent implements OnInit {
  userId: number = 0;
  board_name: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataservice: DataserviceService,
    public dialogRef: MatDialogRef<AddKanbanDialogComponent>
  ) {}

  ngOnInit(): void {
    const UserData = sessionStorage.getItem('userData');
    if (UserData) {
      const user = JSON.parse(UserData);
      this.userId = user.id;
      console.log(this.userId);
    } else {
      console.error('No user data found in sessionStorage');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const userData = {
      user_id: this.userId,
      board_name: this.board_name,
    };

    this.http
      .post(this.dataservice.apiendpotint + '/board/insert', userData)
      .subscribe(
        (response: any) => {
          Swal.fire({
            title: 'สมัครสมาชิกสำเร็จ!',
            text: 'คุณได้ทำการสมัครสมาชิกสำเร็จ',
            icon: 'success',
            confirmButtonText: 'ตกลง',
          });
          this.router.navigate(['/index']);
        },
        (error: any) => {
          Swal.fire({
            title: 'สมัครสมาชิกไม่สำเร็จ!',
            text: 'กรอกข้อมูลไม่ถูกต้อง หรือ email มีการใช้ไปแล้ว',
            icon: 'error',
            confirmButtonText: 'ตกลง',
          });
          console.error('Register failed:', error);
        }
      );

    this.dialogRef.close({ success: true });
  }
}
