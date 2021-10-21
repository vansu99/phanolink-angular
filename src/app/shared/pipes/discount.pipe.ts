import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(originalPrice: number, discount: number): number {
    if (!originalPrice || !discount) {
      // @ts-ignore
      return;
    } else {
      return Math.ceil(originalPrice - (originalPrice * discount) / 100);
    }
  }
}
