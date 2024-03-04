import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { reverseWord } from './services/reverse-word';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public ngOnInit(): void {
    // task-4
    console.log(reverseWord("молоток"));
  }
}
