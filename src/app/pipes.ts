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

@Pipe({name: 'isLate'})
export class IsLatePipe implements PipeTransform {
  transform(value: Date): boolean {
    //se não tiver prazo, não está atrasada
    if(value == null) return false;
    //compara com a data atual
    const hj = new Date()
    if(new Date(value) > hj) return false;
    return true;
  }
}

