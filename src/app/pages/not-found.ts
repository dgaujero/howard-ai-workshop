import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <h1>That page isn’t in the guide.</h1>
    <p>The link may be out of date. You can find all five guides on the main page.</p>
    <a routerLink="/">Back to task guides</a>
  `,
})
export class NotFound {}
