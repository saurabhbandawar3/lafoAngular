import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {User} from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = {} as User;
  user1: Observable<firebase.User>;

  constructor(private aAuth: AngularFireAuth,
              private router: Router,
              public toastr: ToastsManager,
              private vRef: ViewContainerRef, ) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    this.aAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        //console.log('Data is:::::' , data.email);
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

  async login(user) {
    try {
      const result = await this.aAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(() => {
        if (result) {
          console.log('user logged in');
          this.router.navigate(['/slost']);
        }
      });
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  }

  async loginWithGoogle() {
    try {
      const rgoogle = this.aAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        if (rgoogle) {
          console.log('user logged in');
          this.router.navigate(['/slost']);
        }
      });
    } catch (e) {
        console.log(e);
        alert(e.message);
      }
    }

  async loginWithfb() {
    try {
      const rfb = this.aAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
        if (rfb) {
          console.log('user logged in');
          this.router.navigate(['/slost']);
        }
      });
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  }
}





