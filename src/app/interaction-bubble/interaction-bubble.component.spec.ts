import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionBubbleComponent } from './interaction-bubble.component';

describe('InteractionBubbleComponent', () => {
  let component: InteractionBubbleComponent;
  let fixture: ComponentFixture<InteractionBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractionBubbleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InteractionBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
