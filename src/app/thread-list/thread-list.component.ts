import { Component, OnInit, Input } from '@angular/core';
import { ThreadSummaryVM } from '../thread-section/thread-summarry.vm';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input()
  threads: ThreadSummaryVM[];

  constructor() { }

  ngOnInit() {
  }

}
