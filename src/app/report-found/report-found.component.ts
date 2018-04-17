import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {Item} from '../../models/item';
import * as firebase from 'firebase';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {AngularFireAuth} from 'angularfire2/auth';

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
               private router: Router,
               public toastr: ToastsManager,
               private vRef: ViewContainerRef,
               private aAuth: AngularFireAuth) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.aAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        // console.log('Data is:::::' , data.email);
        this.toastr.success(data.email, 'Login Successful')
          .then((toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 10000);
          });

      } else {
        this.toastr.error('Please LogIn First', 'Oops!');
      }
    });
  }
  imageSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  createItem() {
    try {
      if (this.file === undefined) {
        window.alert('Please Upload Image');
      } else {
        console.log(this.file);
        const fileName = this.file.name;
        const storageRef = firebase.storage().ref('/images/found/' + fileName);
        const uploadTask = storageRef.put(this.file);
        this.aAuth.authState.subscribe(data => {
          if (data && data.email && data.uid) {
            uploadTask.on('state_changed', function (snapshot) {
            }, function (error) {
            }, () => {
              this.url = uploadTask.snapshot.downloadURL;
              console.log('Url:::::::', this.url);
              this.i.iurl = this.url;
              this.db.list('/found/').push(this.i).then(() => {
                console.log('entery added');
                this.router.navigate(['/sfound']);
              });
            });
          } else {
            this.toastr.error('Please LogIn First', 'Oops!');
            this.router.navigate(['']);
          }
        });
      }
    } catch (e) {
      window.alert(e);
    }
  }
}
