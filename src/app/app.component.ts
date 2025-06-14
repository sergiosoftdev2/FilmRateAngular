import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from "@angular/forms";
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { headerComponent } from "./shared/components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterModule, headerComponent, FontAwesomeModule, RouterOutlet],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  faCoffee = faCoffee;
} 