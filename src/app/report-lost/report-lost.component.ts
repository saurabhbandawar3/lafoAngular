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
  // i: Item = {
  //   item: '',
  //   itemType: '',
  //   idescription: '',
  //   ivanue: '',
  //   dateLost: '',
  //   iurl: '',
  //   uname: '',
  //   email: '',
  //   mobile: 0
  // };

  url: any;
  file: File;
  getImgUrl: any;
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
    this.getImgUrl = function (file) {
      this.storage.child('images/' + file + '.png').getDownloadURL().then(function (url) {
        return url;
      }).catch(function (error) {
        // Handle any errors here
      });
    };
    console.log(this.getImgUrl);
  }

  createItem() {
    const fileName = this.file.name;
    const storageRef = firebase.storage().ref('/images/lost/' + fileName);
    const uploadTask = storageRef.put(this.file);
    uploadTask.on('state_changed', function (snapshot) {
    }, function (error) {
    },  () => {
      this.url = uploadTask.snapshot.downloadURL;
      console.log('Url:::::::', this.url);
      this.i.iurl = this.url;
      this.db.list('/lost/').push(this.i).then(() => {
        console.log('entery added');
        this.router.navigate(['/slost']);
      });
    });
  }
}

