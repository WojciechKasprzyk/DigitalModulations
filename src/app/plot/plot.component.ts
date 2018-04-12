import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush   // jak by się coś waliło to przez to :3 z rx'a
})
export class PlotComponent implements OnInit {
  @ViewChild('plot') plot: ElementRef;
  constructor() { }

  ngOnInit() {
    this.funtionPlot ();
  }

  basicChart() {
    const plotObject = this.plot.nativeElement;

    const data = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16]
    }];

    const style = {
      margin: {t:0}
    }

    Plotly.plot( plotObject, data, style);
  }


  funtionPlot() {
    const plotObject = this.plot.nativeElement;
    var frames = [
      {name: 'sine', data: [{x: [], y: []}]},
      {name: 'cosine', data: [{x: [], y: []}]},
      {name: 'circle', data: [{x: [], y: []}]},
    ];
    
    let q = 4;
    var n = 200*q;
    
    for (var i = 0; i < n; i++) {
      var t = i / (2*n - 1) * 4 * q - 1*q;
      
      // A sine wave:
      frames[0].data[0].x[i] = t * Math.PI;
      frames[0].data[0].y[i] = Math.sin(t * Math.PI);
      
      // A cosine wave:
      frames[1].data[0].x[i] = t * Math.PI;
      frames[1].data[0].y[i] = 1/2*Math.cos(2*t * Math.PI) + 1/2*Math.sin(t * Math.PI +  Math.PI/4);
      
      // A circle:
      frames[2].data[0].x[i] = Math.sin(t * Math.PI);
      frames[2].data[0].y[i] = Math.cos(t * Math.PI);
    }
    
    Plotly.plot(plotObject, [{
      x: frames[0].data[0].x,
      y: frames[0].data[0].y,
      line: {simplify: false},
    }], {
      xaxis: {range: [-q*Math.PI, q*Math.PI]},
      yaxis: {range: [-1.2, 1.2]},
      updatemenus: [{
        buttons: [
          {method: 'animate', args: [['sine']], label: 'sine'},
          {method: 'animate', args: [['cosine']], label: 'cosine'},
          {method: 'animate', args: [['circle']], label: 'circle'}
        ]
      }]
    }, {displayModeBar: true}).then(function() {
      Plotly.addFrames(plotObject, frames);
    });
  }

}
