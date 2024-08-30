import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../service/dataservice.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  providers: [DataserviceService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';


  constructor(
    private router: Router,
    private http: HttpClient,
    private dataservice: DataserviceService
  ) { }

  save(email: string, password: string, name: string) {
    const userData = {
      email: email,
      password: password,
      name: name
    };
    console.log(userData);

    let jsonString = JSON.stringify(userData);

    this.http.post(this.dataservice.apiendpotint + '/user/insert', jsonString).subscribe(
      (response: any) => {
        console.log('Register successful:', response);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userData', JSON.stringify(response.user));
        Swal.fire({
          title: 'สมัครสมาชิกสำเร็จ!',
          text: 'คุณได้ทำการสมัครสมาชิกสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        });
        // Redirect to home or another appropriate route after successful login
        this.router.navigate(['/']);
      },
      (error: any) => {
        Swal.fire({
          title: 'สมัครสมาชิกไม่สำเร็จ!',
          text: 'กรอกข้อมูลไม่ถูกต้อง หรือ email มีการใช้ไปแล้ว',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
        console.error('Register failed:', error);
        // Handle login failure (you can add some logic or error handling here)
      }
    );
  }

}
