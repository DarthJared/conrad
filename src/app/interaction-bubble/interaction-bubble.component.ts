import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-interaction-bubble',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './interaction-bubble.component.html',
  styleUrl: './interaction-bubble.component.scss'
})
export class InteractionBubbleComponent {
  @Input() isConrad: boolean = false;
  @Input() text: string = '';
}
