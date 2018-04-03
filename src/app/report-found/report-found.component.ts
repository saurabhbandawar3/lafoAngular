import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {Item} from '../../models/item';
import * as firebase from 'firebase';
import { storage } from 'firebase';

@Component({
  selector: 'app-report-found',
  templateUrl: './report-found.component.html',
  styleUrls: ['./report-found.component.css']
})
export class ReportFoundComponent implements OnInit {
  i = {} as Item;
  url: any;
  file: File;
  itypes = [
    { value: 'Electronic', viewValue: 'Electronic' },
    { value: 'Other', viewValue: 'Other' }
  ];

  constructor( private db: AngularFireDatabase,
               private router: Router) {  }

  ngOnInit() {
  }
  imageSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  createItem() {
    const fileName = this.file.name;
    const storageRef = firebase.storage().ref('/images/found/' + fileName);
    const uploadTask = storageRef.put(this.file);
    const s = uploadTask.on('state_changed', function (snapshot) {
    }, function (error) {
    }, function () {
      return uploadTask.snapshot.downloadURL;
    });

    // const getImageUrl = function (time) {
    //   return firebase.storage().ref('images/' + fileName).getDownloadURL();
    // };

    this.db.list('/found/').push(this.i).then(() => {
      console.log('entery added');
      this.router.navigate(['/sfound']);
    });
  }
}
