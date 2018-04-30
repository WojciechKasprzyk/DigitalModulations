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
  isScrolledF = false;
  show = false; 
  scaleOptions = ["Hz", "MHz", "GHz"]
  menuForm: FormGroup;
  constructor(private appService: AppService, private fb: FormBuilder,) {
    this.menuForm = this.fb.group({
      modulationType: ['BPSK', Validators.required],
      inputDataLength: [5, Validators.required],
      inputDataType: ['random', Validators.required],
      inputData: ['', Validators.required],
      inputFrequency: ['', Validators.required],
      scale: ['MHz', Validators.required],
    });
}

  ngOnInit(): void {
    this.menuForm.get('scale').valueChanges.subscribe(value => this.show=false);
  }

  showOptions(){
    this.show = !this.show;
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

    if (event.target.scrollingElement.scrollTop > 75) {
      this.isScrolledF = true;
    } else {
      this.isScrolledF = false;
    }
  }
}
