import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, stateChanges } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { storage } from 'firebase';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Item } from '../../models/item';
import * as firebase from 'firebase';

@Component({
  selector: 'app-report-lost',
  templateUrl: './report-lost.component.html',
  styleUrls: ['./report-lost.component.css']
})
export class ReportLostComponent implements OnInit {
  i = {} as Item;
  url: any;
  file: File;
  // tslint:disable-next-line:max-line-length
  u = 'https://firebasestorage.googleapis.com/v0/b/mangulardb.appspot.com/o/images%2Flostmistro%20blue%20logo%20VA%2010July2017.png?alt=media&token=362c8cce-b652-4cfb-acb0-6c6fc3cd4abe';
  itypes = [
    {value: 'Electronic', viewValue: 'Electronic'},
    {value: 'Other', viewValue: 'Other'}
  ];

  constructor( private db: AngularFireDatabase,
               private router: Router) {  }

  ngOnInit() {
  }

  imageSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  upload() {
    console.log('In Upload');
    const fileName = this.file.name;
    const storageRef = firebase.storage().ref('/images/lost' + fileName);
    const uploadTask = storageRef.put(this.file);
    const s = uploadTask.on('state_changed', function(snapshot) {
    }, function (error) {
           console.log(error);
    }, function() {
      this.url = uploadTask.snapshot.downloadURL;
      console.log(this.url);
    });
    console.log(s);
  }

  createItem() {
    this.i.iurl = this.u;
    console.log(this.i);
    this.db.list('/lost/').push(this.i).then(() => {
      console.log('entery added');
    });
  }
}

