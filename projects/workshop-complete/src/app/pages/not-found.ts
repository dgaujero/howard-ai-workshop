import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `<div class="page-shell reading-page">
    <header class="page-heading">
      <p class="eyebrow">404</p>
      <h1>That page isn’t in the guide.</h1>
      <p>Return to the task selector to find your next step.</p>
    </header>
    <a class="button" routerLink="/">Back to task guides →</a>
  </div>`,
})
export class NotFound {}
