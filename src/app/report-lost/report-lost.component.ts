import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
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

  constructor( private afs: AngularFirestore,
               private db: AngularFireDatabase,
               private router: Router) {  }

  ngOnInit() {
  }

  createItem() {
    console.log(this.i);
    this.db.list('/lost/').push(this.i).then(() => {
      console.log('entery added');
    });
  }
}
