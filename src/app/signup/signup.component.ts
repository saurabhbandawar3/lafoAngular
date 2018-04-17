import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { User } from '../../models/user';
import { AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {HomeComponent} from '../home/home.component';

import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('slideshow') slideshow: ElementRef;
  user = {} as User;
  imageUrls = [
    '1.jpg',
    '2.jpg',
    '3.png',
    '4.png'
  ];
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




