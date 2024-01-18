import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { customRequest } from '../models/customRequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prompt-form',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './prompt-form.component.html',
  styleUrl: './prompt-form.component.scss'
})
export class PromptFormComponent {
  constructor(private http: HttpClient) { }
  request = new FormControl('');
  result: any;
  submit = () => {
    this.generatePrompt().subscribe(value => {
      console.log(value)
      this.result = value;
    })
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }

  generatePrompt(): Observable<customRequest> {
    const request = new customRequest();
    request.message = this.request.value!;
    return this.http.post<customRequest>("https://localhost:3000/api/generate", request)
      .pipe(
        catchError(this.handleError)
      );;
  }
}
