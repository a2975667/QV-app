import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { DonationComponent } from './donation/donation.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'questionnaire', component: QuestionnaireComponent},
  { path: 'donation', component: DonationComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
