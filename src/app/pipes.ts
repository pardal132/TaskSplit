import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatStatus'})
export class FormatStatusPipe implements PipeTransform {
  transform(value: number): string {
    const map = {
      '-1': 'incompleta',
      '0' : 'aguardando resposta',
      '1' : 'completa'
    }
    return map[value];
  }
}
