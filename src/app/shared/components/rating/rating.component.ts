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
  message = input<string>();
  value = input<number>(0);
  reviews = input<number>(0);
  disabled = input<boolean>(false);
  stars: number = 0

  ngOnInit() {
    this.stars = this.value()
  }

}
