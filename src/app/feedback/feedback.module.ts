import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FeedbackComponent } from './feedback.component';
import { FeedbackHomeComponent } from './feedback-home/feedback-home.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackService } from './feedback.service';
import { SubmitFeedbackComponent } from './submit-feedback/submit-feedback.component';

@NgModule({
  declarations: [
    FeedbackComponent,
    FeedbackHomeComponent,
    SubmitFeedbackComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [FeedbackService]
})

export class FeedbackModule { }
