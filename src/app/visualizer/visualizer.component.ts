import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-visualizer',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './visualizer.component.html',
  styleUrl: './visualizer.component.scss'
})
export class VisualizerComponent {
@Input() listening: boolean = false;
@Input() speaking: boolean = false;
}
