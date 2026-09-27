import { Component, input } from '@angular/core';

@Component({
  selector: 'app-prompt-text',
  template: `
    <label [for]="promptId()">{{ label() }}</label>
    <textarea
      [id]="promptId()"
      [value]="text()"
      [attr.aria-describedby]="promptId() + '-help'"
      readonly
      rows="8"
      spellcheck="false"
    ></textarea>
    <p class="help-text" [id]="promptId() + '-help'">
      Select the prompt text and use your device’s copy command. Adapt it to your project.
    </p>
  `,
})
export class PromptText {
  readonly promptId = input.required<string>();
  readonly label = input.required<string>();
  readonly text = input.required<string>();
}
