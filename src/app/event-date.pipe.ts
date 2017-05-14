import { Pipe, PipeTransform } from '@angular/core';
import { Event } from './event';

@Pipe({
  name: 'eventDate'
})
export class EventDatePipe implements PipeTransform {

  transform(events: Event[], option: string): any {
    if (option === 'upcoming') {
      return events.filter(event => Date.parse(event.date) > Date.now()).sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date);
      })
    } else if (option === 'past') {
      return events.filter(event => Date.parse(event.date) < Date.now()).sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date);
      })
    } else {
      return events.sort((a, b) => {
        return Date.parse(a.date) - Date.parse(b.date);
      });
    }
  }

}
