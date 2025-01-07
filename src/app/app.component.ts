import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharactersContainerComponent } from './components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CharactersContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-features-v18';
}
