// Imports - Angular Core
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  
  template: `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #282c34; color: white; font-family: Arial, sans-serif;">
      <div style="text-align: center; border: 2px solid #61dafb; padding: 40px; border-radius: 10px;">
        <h1 style="font-size: 3em; color: #61dafb; margin: 0;">Welcome!</h1>
        <p style="font-size: 1.2em; margin-top: 15px;">
          This static Angular application is running successfully inside a Docker container.
        </p>
        <p style="font-size: 0.9em; color: #aaa; margin-top: 30px;">
          Served by Nginx (Alpine) | Multi-Stage Build
        </p>
      </div>
    </div>
  `
})
export class App {
  title = 'angular-web-app';
}

// This line starts the Angular application by loading the 'App' component.
bootstrapApplication(App).catch(err => console.error(err));