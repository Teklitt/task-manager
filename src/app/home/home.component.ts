import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  task: string = ''; // Initialize the task variable
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

  onSubmit() {
    // Create an object to send as the request body
    const taskData = { title: this.task }; // Assuming 'title' matches the server's expected field name

    // Send an HTTP POST request to your Node.js server
    this.http
      .post<any>(this.APIUrl + 'AddToDo', taskData)
      .pipe(
        tap((response) => {
          console.log('Task saved:', response);
          // Optionally, clear the task input field
          this.task = '';
          // Reload and populate the task list
          this.refreshNotes();
        })
      )
      .subscribe(
        () => {}, // Empty callback for completion, if needed
        (error) => {
          console.error('Error saving task:', error);
        }
      );
  }

  logTaskValue() {
    console.log('Task value:', this.task);
  }

  toggleTaskCompletion(note: any) {
    note.completed = !note.completed; // Toggle the completion status

    // Send a PUT request to update the task's completion status on the server
    this.http
      .put<any>(`${this.APIUrl}UpdateToDo/${note._id}`, {
        completed: note.completed,
      })
      .subscribe(
        (response) => {
          console.log('Task completion updated:', response);
        },
        (error) => {
          console.error('Error updating task completion:', error);
          // Revert the completion status if there was an error
          note.completed = !note.completed;
        }
      );
  }
}
