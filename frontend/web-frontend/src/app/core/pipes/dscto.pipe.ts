import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dscto'
})
export class DsctoPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    let precio = parseFloat(args[0]);
    let estadoDscto = args[1];
    let porcentajeDscto = args[2];
    let montoDscto = parseFloat(args[3]);
    // console.log(precio, estadoDscto, porcentajeDscto, montoDscto);

    if (estadoDscto === 1) {
      value = (String)((precio - (precio / 100 * porcentajeDscto)).toFixed(2));
    } else if (estadoDscto === 2) {
      value = (String)((precio - montoDscto).toFixed(2));
    }

    return value;
  }

}
