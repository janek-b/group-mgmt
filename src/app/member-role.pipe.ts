import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user';

@Pipe({
  name: 'memberRole'
})
export class MemberRolePipe implements PipeTransform {

  transform(members: User[], type: string): any {
    if (type === 'admin') {
      return members.filter(member => member.role === 'admin')
    } else if (type === 'nonAdmin') {
      return members.filter(member => member.role !== 'admin')
    } else {
      return members;
    }
  }

}
