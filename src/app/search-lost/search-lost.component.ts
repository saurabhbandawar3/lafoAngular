import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-search-lost',
  templateUrl: './search-lost.component.html',
  styleUrls: ['./search-lost.component.css']
})
export class SearchLostComponent implements OnInit {
  itemList: Observable<any[]>;
  constructor(public db: AngularFireDatabase,
              private aAuth: AngularFireAuth,
              public toastr: ToastsManager,
              private vRef: ViewContainerRef,
              ) {
    this.toastr.setRootViewContainerRef(vRef);
    this.itemList = this.db.list('/lost').valueChanges();
    console.log(this.itemList);
  }

  ngOnInit() {
    this.aAuth.authState.subscribe(data => {
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
