import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../_services/threads.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../_store/application-state';
import { LoadUserThreadsAction } from '../_store/actions';
import { Observable } from 'rxjs/Rx';
import { ThreadSummaryVM } from './thread-summarry.vm';
import { mapStateToUserName } from './mapStateToUserName';
import { mapStateToUnreadMessagesCounter } from './mapStateToUnreadMessagesCounter';
import { stateToThreadSummariesSelector } from './stateToThreadSummariesSelector';

@Component({
  selector: 'app-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private threadService: ThreadsService, private store: Store<ApplicationState>) {

    this.userName$ = store
      .skip(1)
      .map(mapStateToUserName);

    this.unreadMessagesCounter$ = store
      .skip(1)
      .map(mapStateToUnreadMessagesCounter);

    this.threadSummaries$ = store.select(stateToThreadSummariesSelector);
  }

  ngOnInit() {
    this.threadService.loadUserThreads()
      .subscribe(
      allUserData => this.store.dispatch(
        new LoadUserThreadsAction(allUserData)
      )
      );
  }

}
