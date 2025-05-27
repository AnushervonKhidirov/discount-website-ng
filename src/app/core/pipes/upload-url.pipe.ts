import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uploadUrl',
})
export class UploadUrlPipe implements PipeTransform {
  transform(value: string) {
    return `http://localhost:4000/uploads/${value}`;
  }
}
