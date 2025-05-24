import { Component } from '@angular/core';
import { ContentComponent } from '../../shared/components/content/content.component';

@Component({
  selector: 'app-main',
  imports: [ContentComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
