import type { NavigationModel } from '@core/models/navigation.model';

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from '@layout/main/main.component';
import { ContentComponent } from '@component/content/content.component';
import { LogoComponent } from '@component/logo/logo.component';
import { NavigationComponent } from '@component/navigation/navigation.component';
import { AuthButtonsComponent } from '@component/auth-buttons/auth-buttons.component';

import { Page } from '@constant/page.constant';

@Component({
  selector: 'app-header',
  imports: [
    RouterOutlet,
    MainComponent,
    ContentComponent,
    LogoComponent,
    NavigationComponent,
    AuthButtonsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly menuItems: NavigationModel[] = [
    {
      title: 'Акции',
      href: Page.Promotion,
    },
    {
      title: 'Магазины',
      href: Page.Store,
    },
    {
      title: 'Компании',
      href: Page.Company,
    },
  ];
}
