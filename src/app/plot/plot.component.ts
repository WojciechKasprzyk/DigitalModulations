import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'plot',
  template: `
    <div #plot>

    </div>
  `,
  styleUrls: ['./plot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush   // jak by się coś waliło to przez to :3 z rx'a
})
export class PlotComponent implements OnInit {
  @ViewChild('plot') plotObject: ElementRef;

  constructor() { }

  ngOnInit() {
    this.plotObject = this.plotObject.nativeElement;
    this.funtionPlot();
  }

  funtionPlot() {
    let frames: Frame[] = [
      { name: 'sine', data: [{ x: [], y: [] }] },
      { name: 'cosine', data: [{ x: [], y: [] }] },
      { name: 'circle', data: [{ x: [], y: [] }] },
      { name: 'square', data: [{ x: [], y: [] }] },
    ];

    let q = 3;
    var n = 200 * q;
    let sign = 1;
    for (var i = 0; i < n; i++) {
      var t = i / (n - 1) * 2 * q

      // A sine wave:
      frames[0].data[0].x[i] = t * Math.PI;
      frames[0].data[0].y[i] = Math.sin(t * Math.PI);

      // A cosine wave:
      frames[1].data[0].x[i] = t * Math.PI;
      frames[1].data[0].y[i] = 1 / 2 * Math.cos(2 * t * Math.PI) + 1 / 2 * Math.sin(t * Math.PI + Math.PI / 4);

      // A circle:
      frames[2].data[0].x[i] = Math.sin(t * Math.PI);
      frames[2].data[0].y[i] = Math.cos(t * Math.PI);

      // A square:
      
      if(i%100===0) sign*=(-1);
      frames[3].data[0].x[i] = t * Math.PI;
      frames[3].data[0].y[i] = sign;
    }

    Plotly.plot(this.plotObject, [{
      x0: 0,
      dx: 1 / (n - 1) * 2 * q * Math.PI,
      y: frames[0].data[0].y,
      line: { simplify: false },
    }], {
        xaxis: { range: [-q * Math.PI, 2 * q * Math.PI] },
        yaxis: { range: [-1.2, 1.2] },
        updatemenus: [{
          buttons: [
            { method: 'animate', args: [['sine']], label: 'sine' },
            { method: 'animate', args: [['cosine']], label: 'cosine' },
            { method: 'animate', args: [['circle']], label: 'circle' },
            { method: 'animate', args: [['square']], label: 'square' }
          ]
        }]
      }, { displayModeBar: true }).then(() => {
        Plotly.addFrames(this.plotObject, frames);
      });
  }
}


interface Frame {
  name: string;
  data: Array<{ x: number[], y: number[] }>;
}
