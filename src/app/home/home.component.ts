import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'task-manager';
  readonly APIUrl = 'http://localhost:3000/api/toDoApp/';

  constructor(private http: HttpClient) {}
  //an array to store retrieved data
  notes: any = [];

  //sends GET request to the api url & subscribes to response. response is stored in notes array
  refreshNotes() {
    this.http.get<any[]>(this.APIUrl + 'GetToDo').subscribe((data) => {
      this.notes = data;
    });
  }

  //fetches and displays initial data when component is initialized
  ngOnInit() {
    this.refreshNotes();
  }
}
