import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { from } from 'rxjs';
import { Partner } from 'src/app/data/partner';
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
partnersList:Array<Partner>;
  constructor(private r: Router, private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.partnerService.getAllPartners().subscribe(ans => this.partnersList = ans);
  }

}
