import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase} from 'angularfire2/database';


@Component({
  selector: 'app-search-lost',
  templateUrl: './search-lost.component.html',
  styleUrls: ['./search-lost.component.css']
})
export class SearchLostComponent implements OnInit {
  itemListref$: Observable<any[]>;
  constructor(public db: AngularFireDatabase) {
    this.itemListref$ = this.db.list('/lost').valueChanges();
    console.log(this.itemListref$);
  }

  ngOnInit() {
  }

}
