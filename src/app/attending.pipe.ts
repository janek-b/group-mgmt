import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attending'
})
export class AttendingPipe implements PipeTransform {

  transform(event: any, memberId: string): any {
    // if (Object.keys(event.members).includes(memberId)) {
    //     console.log('yes')
    // }
    // console.log(event)
    return Object.keys(event.members).includes(memberId);
  }

}
