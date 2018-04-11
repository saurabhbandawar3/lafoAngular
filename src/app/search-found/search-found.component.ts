import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {ToastsManager} from 'ng2-toastr';


@Component({
  selector: 'app-search-found',
  templateUrl: './search-found.component.html',
  styleUrls: ['./search-found.component.css']
})
export class SearchFoundComponent implements OnInit {
  itemList: Observable<any[]>;
  constructor( public db: AngularFireDatabase,
               private afAuth: AngularFireAuth,
               public toastr: ToastsManager,
               private vRef: ViewContainerRef,
               ) {
    this.toastr.setRootViewContainerRef(vRef);
    this.itemList = this.db.list('/found').valueChanges();
    console.log(this.itemList);
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        console.log('Data is:::::' , data.email);
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

}
