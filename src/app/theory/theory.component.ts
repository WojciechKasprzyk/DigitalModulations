import { Component, HostListener } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
    selector: 'theory',
    templateUrl: 'theory.component.html',
    styleUrls: ['theory.component.css'],
    animations: [
        trigger('slide', [
          transition(':enter', [
            style({transform: 'translateY(-10%)', opacity: 0}),
            animate('1000ms ease-in', style({transform: 'translateY(0%)', opacity:1}))
          ]),
    ])]
})
export class TheoryComponent {
    constructor() { }
    visible = true;

// @HostListener('document:scroll', ['$event'])
// onScroll(){
//     let scrollTop = (document.body && document.body.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
//     console.log(scrollTop);
//     // let theoryElementOffset = document.getElementById('wrapper').offsetTop;

//     if(scrollTop>500){
//         document.getElementById('wrapper').style.visibility = 'visible';
//     }
// }

}
