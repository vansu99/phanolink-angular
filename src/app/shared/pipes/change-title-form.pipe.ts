import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeTitleForm',
})
export class ChangeTitleFormPipe implements PipeTransform {
  transform(id: number | string): string {
    return id ? 'Edit' : 'Add';
  }
}
