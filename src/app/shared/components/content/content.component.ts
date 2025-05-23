import { Component, input } from '@angular/core';

@Component({
  selector: 'app-content',
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
  host: {
    '[class.full_height]': 'fullHeight()',
  },
})
export class ContentComponent {
  readonly fullHeight = input(false);
}
