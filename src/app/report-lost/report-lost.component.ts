import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-lost',
  templateUrl: './report-lost.component.html',
  styleUrls: ['./report-lost.component.css']
})
export class ReportLostComponent implements OnInit {
  itypes = [
    {value: 'Electronic', viewValue: 'Electronic'},
    {value: 'Other', viewValue: 'Other'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
