import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(
    price: number,
    space: boolean = true,
    groupSymbol: string = '.',
    unit: string = 'đ'
  ): string | null {
    if (!price) {
      return null;
    }

    if (space) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, groupSymbol) + ' ' + unit;
    } else {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, groupSymbol) + unit;
    }
  }
}
