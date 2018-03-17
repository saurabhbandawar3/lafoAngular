import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Item } from '../../models/item';

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
  url: any;
  i = {} as Item;

  constructor( private afs: AngularFirestore ) {  }

  ngOnInit() {
  }

  createItem() {
    console.log(this.i);
  }
}
