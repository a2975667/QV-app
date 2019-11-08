import { Component, OnInit } from '@angular/core';
import { DonationService } from '../services/donation.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
  MAX = 50;
  organizations: Array<Object> = [];
  sum: number = 0;
  donations = [];
  constructor(
    private donationService: DonationService
  ) { }

  ngOnInit() {
    let ogObserver = {
      next: ogs => {
        this.organizations=ogs
        this.donations =Array(this.organizations.length).fill(0)
      },
      error: error => console.log('A error: ' + error),
      complete: () => console.log('ogObserver complete!')
    }
    this.donationService.organizations.subscribe(ogObserver)
    this.donationService.requestOrganizations();
  }
  caculate(i){
    this.sum = 0;
    this.donations.forEach(element => {
      this.sum = this.sum + element;
    });
    if(this.sum > this.MAX){
      this.donations[i] = this.donations[i]-(this.sum - this.MAX)
      this.sum = this.MAX;
    }
  }
  submit(){
    this.donationService.submit(this.donations);
  }
}
