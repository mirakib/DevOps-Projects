import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly title = 'Angular 17 Static Frontend Module';
  readonly frameworkVersion = '17.0';
  readonly finalImage = 'nginx:alpine';
  readonly author = 'Moshrekul Islam';
  readonly repositoryUrl = 'https://github.com/moshrekul/docker-project';
  readonly containerIp = '172.17.0.2';
  readonly hostPort = 8080;
  readonly deployedAt = '2025-10-21 03:30:00';

  readonly statusLog = signal([
    '[SYSTEM STATUS: ONLINE]',
    'Compiling Angular assets',
    'Packaging optimized bundle',
    `Publishing to ${this.finalImage}`
  ]);
}
