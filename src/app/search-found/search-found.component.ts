import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';


@Component({
  selector: 'app-search-found',
  templateUrl: './search-found.component.html',
  styleUrls: ['./search-found.component.css']
})
export class SearchFoundComponent implements OnInit {
  itemListref$: Observable<any[]>;
  constructor( public db: AngularFireDatabase ) {
    this.itemListref$ = this.db.list('/found').valueChanges();
    console.log(this.itemListref$);
  }

  ngOnInit() {
  }

}
