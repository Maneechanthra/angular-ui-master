import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

  apiendpotint = "http://localhost/kanban-app";

  private user_id: number | null = null;
  setUser_id(user_id: number) {
    this.user_id = user_id;
  }
}
