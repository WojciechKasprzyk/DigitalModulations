import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isScrolled = false;
  generatedInputData=[];
  inputVectorArray;
  isScrolledF = false;
  menuForm: FormGroup;
  constructor(private appService: AppService, private fb: FormBuilder, ) {
    this.menuForm = this.fb.group({
      modulationType: ['BPSK', Validators.required],
      inputDataLength: [0, Validators.required],
      // inputDataType: ['random', Validators.required],
      inputVector: ['', [Validators.required, Validators.pattern('^[0-1]+$')]],
      inputData: [this.generatedInputData, [Validators.required, Validators.pattern('^[0-1]+$')]],
      inputFrequency: ['', Validators.required],
      bitsSpeed: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.menuForm.get('inputVector').valueChanges.subscribe(value => {
      this.inputVectorArray = this.menuForm.get('inputVector').value.split("");
      this.randomDataGenerator(this.menuForm.get('inputDataLength').value);
      this.menuForm.patchValue({inputData: this.generatedInputData.toString().replace(/,/g,'')}); 
    });

    this.menuForm.get('inputDataLength').valueChanges.subscribe(value => {
      if  (this.menuForm.get('inputVector').value!="")
      {
        this.randomDataGenerator(this.menuForm.get('inputDataLength').value);
        this.menuForm.patchValue({inputData: this.generatedInputData.toString().replace(/,/g,'')}); 
      }
    });
  }

  randomDataGenerator(number) {
    let tmpInputVectorArray = this.inputVectorArray.slice();

    this.generatedInputData = [];

    if (tmpInputVectorArray.length >= this.menuForm.get('inputDataLength').value) this.generatedInputData = tmpInputVectorArray.slice(0, this.menuForm.get('inputDataLength').value);
    else {
      for (let i = 0; i < number; i++) {
        tmpInputVectorArray.unshift(tmpInputVectorArray[this.inputVectorArray.length - 1] ^ tmpInputVectorArray[tmpInputVectorArray.length - 2]);
        this.generatedInputData.push(+tmpInputVectorArray[tmpInputVectorArray.length - 1]);
        tmpInputVectorArray.pop();
      }
    }
    console.log('gen',this.generatedInputData);
  }



  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (event.target.scrollingElement.scrollTop > 10) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }

    // if (event.target.scrollingElement.scrollTop > 75) {
    //   this.isScrolledF = true;
    // } else {
    //   this.isScrolledF = false;
    // }
  }

  sliderColor() {
    const filledPercent = this.menuForm.get('inputDataLength').value / 20 * 100;
    const empty = 100 - filledPercent;
    return filledPercent >= 50 ? { "background": "linear-gradient(to right, #f77750 " + filledPercent + "%, #d8d4d3 " + empty + "%)" } : { "background": "linear-gradient(to left, #d8d4d3 " + empty + "%, #f77750 " + filledPercent + "%)" };
  }

  focusFunction(e){
    e.target.parentElement.style.borderBottom = "1px solid #f76b40"; 
    console.log(e.target.parentElement)
  }

  focusOutFunction(e){
    e.target.parentElement.style.borderBottom = "1px solid #d8d4d3"; 
  }
}
