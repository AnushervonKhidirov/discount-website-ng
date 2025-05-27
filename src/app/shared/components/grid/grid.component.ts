import { Component, input } from '@angular/core';

type Size = 'xSmall' | 'small' | 'medium' | 'large';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
  host: {
    '[attr.data-size]': 'this.size()',
  },
})
export class GridComponent {
  readonly size = input<Size>('medium');
}
