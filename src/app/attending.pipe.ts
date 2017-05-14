import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attending'
})
export class AttendingPipe implements PipeTransform {

  transform(event: any, memberId: string): any {
    if (event.members) {
      return Object.keys(event.members).includes(memberId);
    } else {
      return false;
    }
  }

}
