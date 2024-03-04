import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { reverseWord } from './functions/reverse-word';
import { generatePassword } from './functions/generate-password';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public burgerIsOpen: boolean = false;
  public ngOnInit(): void {
    // task-4
    console.log(reverseWord("молоток"));
    // task-5
    console.log(generatePassword());
  }
}
