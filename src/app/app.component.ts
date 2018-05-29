import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ParamsSet } from './interfaces/interfaces';


const formsFields = {
  inputDataLength: [0, Validators.required],
  inputVector: ['', [Validators.required, Validators.pattern('^[0-1]+$')]],
  inputData: [this.generatedInputData, [Validators.required, Validators.pattern('^[0-1]+$')]],
  inputFrequency: ['', Validators.required],
  bitsSpeed: ['', Validators.required]
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  [x: string]: any;
  // region Parametry
  bits: number[] = [1, 0, 1, 1, 1, 0, 0, 1, 0, 1];
  paramsSet: ParamsSet = new ParamsSet({name: 'BPSK', bits: this.bits, frequency: 50, periods: 10});
  // endregion

  isScrolled = false;
  generatedInputData=[];
  inputVectorArray;
  isScrolledF = false;
  firstOn = true;
  menuForm;
  constructor(private appService: AppService, private fb: FormBuilder ) {
    this.menuForm = [this.fb.group(formsFields), this.fb.group(formsFields)]

    // this.menuForm = this.fb.group({
    //   // modulationType: ['BPSK', Validators.required],
    //   inputDataLength: [0, Validators.required],
    //   // inputDataType: ['random', Validators.required],
    //   inputVector: ['', [Validators.required, Validators.pattern('^[0-1]+$')]],
    //   inputData: [this.generatedInputData, [Validators.required, Validators.pattern('^[0-1]+$')]],
    //   inputFrequency: ['', Validators.required],
    //   bitsSpeed: ['', Validators.required]
    // });
  }


  //  timeline = new TimelineMax({
  //   onComplete: function() {
  //     this.restart();
  //   }
  // });
  
  //  from = {
  //              rotation: '-20',
  //              ease: Power1.easeInOut
  //            };
  
  //  to =  {
  //             rotation: '20',
  //             repeat: -1,
  //             yoyo: true,
  //             ease: Power1.easeInOut
  //           }

  ngOnInit(): void {
    this.menuForm[0].get('inputVector').valueChanges.subscribe(value => {
      this.inputVectorArray = this.menuForm[0].get('inputVector').value.split("");
      if(this.menuForm[0].get('inputVector').errors==null){
        this.randomDataGenerator(this.menuForm[0].get('inputDataLength').value);
        this.menuForm[0].patchValue({inputData: this.generatedInputData.toString().replace(/,/g,'')}); 
      }
      else{
        this.menuForm[0].patchValue({inputData: ''}); 
      }
    });

    this.menuForm[0].get('inputDataLength').valueChanges.subscribe(value => {
      if  (this.menuForm[0].get('inputVector').value!="")
      {
        if(this.menuForm[0].get('inputVector').errors==null){
          this.randomDataGenerator(this.menuForm[0].get('inputDataLength').value);
          this.menuForm[0].patchValue({inputData: this.generatedInputData.toString().replace(/,/g,'')}); 
      }
      else{
        this.menuForm[0].patchValue({inputData: ''}); 
      }
    }
    });


    // let x = document.getElementById("e");
    // TweenMax.fromTo(x, 1.3, this.from, this.to);

  }

  randomDataGenerator(number) {
    let tmpInputVectorArray = this.inputVectorArray.slice();

    this.generatedInputData = [];

    if (tmpInputVectorArray.length >= this.menuForm[0].get('inputDataLength').value) this.generatedInputData = tmpInputVectorArray.slice(0, this.menuForm[0].get('inputDataLength').value);
    else {
      for (let i = 0; i < number; i++) {
        tmpInputVectorArray.unshift(tmpInputVectorArray[this.inputVectorArray.length - 1] ^ tmpInputVectorArray[tmpInputVectorArray.length - 2]);
        this.generatedInputData.push(+tmpInputVectorArray[tmpInputVectorArray.length - 1]);
        tmpInputVectorArray.pop();
      }
    }
    // console.log('gen',this.generatedInputData);
  }



  // @HostListener('window:scroll', ['$event'])
  // onScroll(event) {
  //   if (event.target.scrollingElement.scrollTop > 10) {
  //     this.isScrolled = true;
  //   } else {
  //     this.isScrolled = false;
  //   }

    // if (event.target.scrollingElement.scrollTop > 75) {
    //   this.isScrolledF = true;
    // } else {
    //   this.isScrolledF = false;
    // }
  // }

  sliderColor(form) {
    const filledPercent = form.get('inputDataLength').value / 20 * 100;
    const empty = 100 - filledPercent;
    return filledPercent >= 50 ? { "background": "linear-gradient(to right, #f77750 " + filledPercent + "%, #d8d4d3 " + empty + "%)" } : { "background": "linear-gradient(to left, #d8d4d3 " + empty + "%, #f77750 " + filledPercent + "%)" };
  }

  focusFunction(e){
    e.target.parentElement.style.borderBottom = "1px solid #f76b40"; 
  }

  focusOutFunction(e){
    e.target.parentElement.style.borderBottom = "1px solid #d8d4d3"; 
  }

  changeTab(){
    this.firstOn  = !this.firstOn;
  }

  signal(bits) {
    const timeToBit = Math.floor(this.paramsSet.samplingRate / bits.length);
    let index = -1;
    const frame = this.makeFrame('signal'); // ciekawe, działa można tez przez index signature this['makeFrame']('signal');
  
    for (let i = 0, t = i;
      i < this.paramsSet.samplingRate / this.paramsSet.scale;
      i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
        frame.data[0].x[i] = t * this.paramsSet.scale;
      if (i % (timeToBit / this.paramsSet.scale) === 0) {
        index++;
        if (!bits[index]) bits[index] = -1;
      }
      frame.data[0].y[i] = bits[index];
    }
  }
  
  bpsk() {
      const harmonicFrame = this.makeFrame('harmonic');
      const signalFrame = this.makeFrame('signal');
      const modulationFrame = this.makeFrame('modulation');
  
      console.log(harmonicFrame,signalFrame,modulationFrame)
      for (let i = 0, t = i;
        i < this.paramsSet.samplingRate / this.paramsSet.scale;
        i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
          modulationFrame.data[0].x[i] = t * this.paramsSet.scale;
          modulationFrame.data[0].y[i] = harmonicFrame.data[0].y[i] * signalFrame.data[0].y[i];
      }
    }

    qpsk() { // nie testowane
      const signalFrame = this.makeFrame('signal');
      const modulationFrame = this.makeFrame('modulation');
  
      for (let i = 0, t = i;
        i < this.paramsSet.samplingRate / this.paramsSet.scale;
        i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
        modulationFrame.data[0].x[i] = t * this.paramsSet.scale;
  
        modulationFrame.data[0].y[i] = Math.sin(t * this.paramsSet.frequency * Math.PI + Math.PI/4 + 2 * signalFrame.data[0].y[i] * Math.PI / 4);
      }
    }
  
    qam() {
      const signalFrame = this.makeFrame('signal');
      const modulationFrame = this.makeFrame('modulation');
      for (let i = 0, t = i;
        i < this.paramsSet.samplingRate / this.paramsSet.scale;
        i++ , t = i / ((this.paramsSet.samplingRate - 1) * this.paramsSet.frequency) * this.paramsSet.periods) {
          modulationFrame.data[0].x[i] = t * this.paramsSet.scale;
  
  
        }
    }

}
