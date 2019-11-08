import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { DonationComponent } from './donation/donation.component';
import { LikertComponent } from './likert/likert.component';
import { DemographicComponent } from './demographic/demographic.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'demographic', component: DemographicComponent },
  { path: 'questionnaire', component: QuestionnaireComponent},
  { path: 'donation', component: DonationComponent},
  { path: 'test', component: LikertComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
