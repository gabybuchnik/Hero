import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('city') city: ElementRef;
  @ViewChild('cityOption') cityOption : ElementRef;
  @ViewChild('citySelect') citySelect : ElementRef;
  cities : string[];
  constructor() { 
    this.cities = ['tel aviv'];
  }

  ngOnInit() {
  }

  async autocomplete() {
    this.cities = [];
    let city = this.city.nativeElement.value;
    if (city) {
      let res = await fetch('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=NaNiOUWhHpyul0z4nQeWs88bZQku8jH7&q=' + city);
      let data = await res.json();
      for (let city in data) {
        this.cities.push(data[city].LocalizedName);
      }
    }
  }
  setCity(){
    this.city.nativeElement.value = this.citySelect.nativeElement.options[this.citySelect.nativeElement.options.selectedIndex].value;
  }
}
