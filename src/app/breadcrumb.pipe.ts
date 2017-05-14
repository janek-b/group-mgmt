import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breadcrumb'
})
export class BreadcrumbPipe implements PipeTransform {

  transform(crumb: string, index: number): any {
    if (index === 1) {
      return 'member'
    } else {
      return crumb
    }
  }

}
