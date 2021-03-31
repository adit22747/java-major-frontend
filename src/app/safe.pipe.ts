import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'safe' })

export class SafePipe implements PipeTransform {

constructor(private sanitizer: DomSanitizer) { }
transform(value:any,...args:any[]):any {
  
 return this.sanitizer.bypassSecurityTrustResourceUrl("http://127.0.0.1:8887/"+args[0]);
  }
}