import { Routes, RouterModule } from "@angular/router";
import { FeedbackComponent } from './feedback.component';
import { FeedbackHomeComponent } from './feedback-home/feedback-home.component';
import { SubmitFeedbackComponent } from './submit-feedback/submit-feedback.component';
import { NgModule } from '@angular/core';

const feedbackRoutes: Routes = [
    { path: '', component: FeedbackComponent, children: [
        { path: '', component: FeedbackHomeComponent},
        { path: 'submit', component: SubmitFeedbackComponent}
    ]}
]

@NgModule({
    imports: [
        RouterModule.forChild(feedbackRoutes)
    ],
    exports: [RouterModule],
    providers: []
})

export class FeedbackRoutingModule{}