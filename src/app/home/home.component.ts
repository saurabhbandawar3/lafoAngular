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
              private router: Router
               ) {
    // this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
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
      window.alert(e.message);
    }
  }

  async loginWithGoogle() {
      const rgoogle = await this.aAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
          console.log('user logged in');
          this.router.navigate(['/slost']);
      }).catch((e) => {
        console.log(e);
        window.alert(e.message);
      });
    }

  async loginWithfb() {
      const rfb = await this.aAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
          console.log('user logged in');
          this.router.navigate(['/slost']);
      }).catch((e) => {
          console.log(e);
          window.alert(e.message);
      });
  }
}





