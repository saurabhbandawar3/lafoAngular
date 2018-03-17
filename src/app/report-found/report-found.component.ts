import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-found',
  templateUrl: './report-found.component.html',
  styleUrls: ['./report-found.component.css']
})
export class ReportFoundComponent implements OnInit {
  itypes = [
    {value: 'Electronic', viewValue: 'Electronic'},
    {value: 'Other', viewValue: 'Other'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
