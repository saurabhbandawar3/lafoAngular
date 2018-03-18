import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {Item} from '../../models/item';

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
  url: any;
  i = {} as Item;

  constructor( private afs: AngularFirestore,
               private db: AngularFireDatabase,
               private router: Router) {  }

  ngOnInit() {
  }

  createItem() {
    console.log(this.i);
    this.db.list('/found/').push(this.i).then(() => {
      console.log('entery added');
    });
  }
}
