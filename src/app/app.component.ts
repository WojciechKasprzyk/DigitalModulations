import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  isScrolled = false;
  inputData =[];
  isScrolledF = false;
  menuForm: FormGroup;
  constructor(private appService: AppService, private fb: FormBuilder,) {
    this.menuForm = this.fb.group({
      modulationType: ['BPSK', Validators.required],
      inputDataLength: [0, Validators.required],
      inputDataType: ['random', Validators.required],
      inputData: ['', [Validators.required, Validators.pattern('^[0-1]+$')]],
      inputFrequency: ['', Validators.required],
      bitsSpeed: ['', Validators.required]
      // scale: ['MHz', Validators.required],
    });
}

  ngOnInit(): void {
    this.randomDataGenerator(3);
    this.menuForm.get('inputData').valueChanges.subscribe(value => this.inputData.push(value.slice(-1)));
    this.menuForm.get('inputDataType').valueChanges.subscribe( () => this.inputData = []);
  }

  randomDataGenerator(number){
    this.inputData=[];
    let randomData=[];
    for(let i=0; i<number;i++){
      this.inputData.push(Math.floor(Math.random()*2))
    }
    console.log(this.inputData);
    for(let i=0; i<Math.pow(2, number)-1; i++){
      this.inputData.unshift(this.inputData[this.inputData.length -1] ^ this.inputData[this.inputData.length -2]);
      randomData.push(this.inputData[this.inputData.length -1]);
      this.inputData.pop();
    }

    console.log(randomData);
  }

  showOptions(){
  }


  // async keyDown(key){
  //   if(key.key != 'Backspace'){
  //     // this.menuForm.get('inputData').valueChanges.subscribe(value => console.log(key.key))
  //     let value = await this.menuForm.get('inputData').value +',';
  //     await this.menuForm.patchValue({ inputData: value},{emitEvent: false})
  //   }
  // }

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

  sliderColor(){
    const filledPercent = this.menuForm.get('inputDataLength').value/20*100;
    console.log(filledPercent)
    const empty = 100 - filledPercent; 
    console.log( "linear-gradient(to right, red" + filledPercent+"%, white" + empty +"%)");
    return { "background": "linear-gradient(to right, red " + filledPercent+"%, white " + empty +"%)"};
    }
}
