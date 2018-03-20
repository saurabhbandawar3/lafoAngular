import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from '@angular/router';
import {SearchFoundComponent} from '../search-found/search-found.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = {} as User;
  constructor( private aAuth: AngularFireAuth,
               private router: Router) { }

  ngOnInit() {
  }
  async login(user) {
    try {
      const result = await this.aAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result) {
        console.log('user logged in');
        this.router.navigate(['/slost']);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
