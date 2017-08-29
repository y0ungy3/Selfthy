import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'CharacterCount',
    pure: false
})

export class CharacterCount implements PipeTransform {
    transform(text: string, args: number) {
        let maxLength = args || 140;
        if(text) {
            let length = text.length;
            return (maxLength - length);
        } else {
            return maxLength;
        }

    }
}