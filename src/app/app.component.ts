import { Component, HostListener } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isScrolled = false;
  isScrolledF = false;
  menuForm: FormGroup;

  constructor(private appService: AppService, private fb: FormBuilder,) {
    this.menuForm = this.fb.group({
      modulationType: ['BPSK', Validators.required],
      inputDataLength: [5, Validators.required],
      inputDataType: ['random', Validators.required],
      inputData: ['', Validators.required],
    });
}


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
