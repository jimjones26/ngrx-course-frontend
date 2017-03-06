import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../_store/application-state';

@Component({
  selector: 'app-message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {

  constructor(private store: Store<ApplicationState>) {
    store.subscribe(
      state => console.log('message section received state', state)
    );
  }

  ngOnInit() {
  }

}
