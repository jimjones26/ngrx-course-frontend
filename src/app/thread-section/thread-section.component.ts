import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../_services/threads.service';

@Component({
  selector: 'app-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  constructor(private threadService: ThreadsService) { }

  ngOnInit() {
  }

}
