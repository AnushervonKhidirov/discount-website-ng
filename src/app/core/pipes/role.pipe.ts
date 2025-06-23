import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'role' })
export class RolePipe implements PipeTransform {
  transform(role: string) {
    const roleWords = role.toLowerCase().split('_');
    let result = '';

    roleWords.forEach(word => {
      result += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
    });

    return result.trim();
  }
}
