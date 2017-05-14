import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attending'
})
export class AttendingPipe implements PipeTransform {

  transform(event: any, memberId: string): any {
    return Object.keys(event.members).includes(memberId);
  }

}
