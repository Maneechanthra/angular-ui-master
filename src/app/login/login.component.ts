import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from '../service/dataservice.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  providers: [DataserviceService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrected styleUrl to styleUrls
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataservice: DataserviceService
  ) { }

  login(email: string, password: string) {
    const loginData = { email: email, password: password };

    console.log(loginData);


    this.http.post(this.dataservice.apiendpotint + '/login', loginData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userData', JSON.stringify(response.user));

        const user_id = response.user?.id;
        if (user_id) {
          sessionStorage.setItem('id', user_id.toString());
        }

        Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ!',
          text: 'คุณได้ทำการเข้าสู่ระบบสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        });

        this.dataservice.setUser_id(response.user?.id);

        console.log(user_id);


        this.router.navigate(['/index']);
      },
      (error: any) => {
        Swal.fire({
          title: 'เข้าสู่ระบบไม่สำเร็จ!',
          text: 'คุณได้ทำการเข้าสู่ระบบไม่สำเร็จ',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
        console.error('Login failed:', error);

      }
    );
  }
}
