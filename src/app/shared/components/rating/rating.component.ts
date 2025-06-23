import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'app-rating',
  imports: [FormsModule, NzRateModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  readonly message = input<string>();
  readonly value = input<number>(0);
  readonly reviews = input<number>(0);
  readonly disabled = input<boolean>(false);
  stars: number = 0

  ngOnInit() {
    this.stars = this.value()
  }

}
