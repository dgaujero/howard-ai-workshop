import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  RESOURCES,
  REPOSITORY_URL,
  LIVE_WORKSHOP_URL,
  SLIDES_URL,
  SOURCES_CHECKED,
} from '../data/resources';

@Component({
  selector: 'app-resources',
  imports: [RouterLink],
  templateUrl: './resources.html',
})
export class Resources {
  readonly resources = RESOURCES;
  readonly repository = REPOSITORY_URL;
  readonly liveWorkshop = LIVE_WORKSHOP_URL;
  readonly slides = SLIDES_URL;
  readonly checked = SOURCES_CHECKED;
  readonly categories = ['Start here', 'Build & ship', 'Go further'] as const;
}
