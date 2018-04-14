import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Item } from '../../models/item';
import * as firebase from 'firebase';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {AngularFireAuth} from 'angularfire2/auth';
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
               private router: Router,
               public toastr: ToastsManager,
               private vRef: ViewContainerRef,
               private aAuth: AngularFireAuth) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.aAuth.authState.subscribe(data => {
      console.log('Data is:::::' , data);
      if (data && data.email && data.uid) {
        // console.log('Data is:::::' , data.email);
        this.toastr.success(data.email)
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
    try {
      if (this.file === undefined) {
        window.alert('Please Upload Image');
      } else {
        const fileName = this.file.name;
        const storageRef = firebase.storage().ref('/images/lost/' + fileName);
        const uploadTask = storageRef.put(this.file);
        this.aAuth.authState.subscribe(data => {
          if (data && data.email && data.uid) {
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

