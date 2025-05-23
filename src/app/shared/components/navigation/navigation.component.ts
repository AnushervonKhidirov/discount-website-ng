import type { NavigationModel } from '@core/models/navigation.model';

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, NzMenuModule, NzButtonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  readonly menuItems = input.required<NavigationModel[]>();
}
