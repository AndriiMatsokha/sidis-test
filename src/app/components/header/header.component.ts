import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output()
  public onOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isOpen: boolean = false;
}
