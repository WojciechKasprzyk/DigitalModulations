import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'c-header',
  template: `
  <div class="tooltip"><h1>{{title}}</h1>
    <a target="_blank" href='{{href}}'><span class="tooltiptext">learn more<i class="fab fa-wikipedia-w"></i></span></a>
  </div>
  `,
  styles: [`
    .tooltip {
      position: relative;
      display: inline-block;
    }
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
    a{
      text-style: italic;
    }
    i{
      margin-left: 5px;
    }
  `]
})

export class CHeaderComponent implements OnInit {
  @Input() title;
  @Input() href: string;
  constructor() { }

  ngOnInit() { }

}
