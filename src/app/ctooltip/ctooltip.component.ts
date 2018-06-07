import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'c-header',
  template: `
  <div class="tooltip"><h1>{{title}}</h1>
    <a target="_blank" href='{{href}}'><span class="tooltiptext"><i>learn more</i> <img src="https://image.freepik.com/darmowe-ikony/wikipedia-logo_318-64680.jpg"></span></a>
  </div>
  `,
  styles: [`
    h1{
      font-size: 36px;
      letter-spacing: 4px;
    }
    .tooltip {
      position: relative;
      display: inline-block;
    }

    /* Tooltip text */
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 120px;
      background-color: #242324;
      color: #fff;
      text-align: center;
      border-radius: 0px 4px 4px 0px;

      position: absolute;
      z-index: 1;
      top: 20px;
      left: 125%; 
      box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.2), 10px 10px 30px 0 rgba(0, 0, 0, 0.15);
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
    }

    .tooltip .tooltiptext:before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-width: 16px;
      border-style: solid;
      border-color: transparent #242324 transparent transparent;
      top: 0px;
      left: -32px;
    } 


    img {
      position: relative;
      width: 12px;
      height: 12px;
      align-self: center;
    }
  `]
})
export class CHeaderComponent implements OnInit {
  @Input() title;
  @Input() href: string;
  constructor() { }

  ngOnInit() { }

}
