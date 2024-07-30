import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventEmissorI } from '../models/EventEmissor/event-emissor.model';
@Injectable({
  providedIn:'root'
})
export class EventEmissorService {
  private event: Subject<EventEmissorI> = new Subject<EventEmissorI>();
  getEvent(): Observable<EventEmissorI> {
    return this.event.asObservable();
  }
  setEvent(event: EventEmissorI): void {
    this.event.next(event);
  }
}
