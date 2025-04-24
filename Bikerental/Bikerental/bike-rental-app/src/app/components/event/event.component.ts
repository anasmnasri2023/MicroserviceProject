// src/app/components/event/event.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // This component serves as a container for list-event.component
  }
}
