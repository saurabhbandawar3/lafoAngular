import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {ToastsManager} from 'ng2-toastr';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor (private afAuth: AngularFireAuth,
               public toastr: ToastsManager,
               private vRef: ViewContainerRef,
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }
  logOff() {
    firebase.auth().signOut().then(function(data) {
      console.log(data);
      this.toastr.success('User Signed Off')
        .then((toast) => {
          setTimeout(() => {
            this.toastr.dismissToast(toast);
          }, 10000);
        });

    }).catch(function(error) {
      // An error happened.
      this.toastr.error('Please LogIn First', 'Oops!');
    });

  }
}
