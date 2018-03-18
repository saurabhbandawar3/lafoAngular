import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {HomeComponent} from '../home/home.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {} as User;

  constructor(private aAuth: AngularFireAuth,
              private router: Router) {
  }

  ngOnInit() {
  }

  async register(user: User) {
    try {
      const result = await this.aAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        console.log('user created');
        this.router.navigate(['']);
      }
    } catch (e) {
      console.log(e);
    }

    //   this.aAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
    //     (success) => {
    //       success.auth.updateProfile({
    //         displayName: user.fname,
    //       })
    //         .then(res => console.log('profile updated'))
    //         .catch(err => console.log(err));
    //     }).catch(
    //     (err) => {
    //       console.log(err);
    //     });

  }
}
