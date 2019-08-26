import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('city') city: ElementRef;
  @ViewChild('cityOption') cityOption: ElementRef;
  @ViewChild('citySelect') citySelect: ElementRef;
  cityName : string;
  cities;
  currentWeather;
  fiveDaysWeather;
  constructor(private weatherService: WeatherService) {
    this.cityName ="Tel Aviv";
    this.cities = [{ LocalizedName: 'Tel Aviv', key: '215854' }];
    this.currentWeather = null;
    this.fiveDaysWeather = null;
  }

  async ngOnInit() {
    this.autocomplete();
    this.getWeather('215854');
    this.getFiveDayWeather('215854');
  }
  async autocomplete() {
    let city = this.city.nativeElement.value;
    this.cities = await this.weatherService.autocomplete(city);
  }

  setCity() {
    this.cityName = this.citySelect.nativeElement.options[this.citySelect.nativeElement.options.selectedIndex].value;
    for(let item of this.cities){
      if (item.LocalizedName === this.cityName) {
        this.getWeather(item.Key);
        this.getFiveDayWeather(item.Key);
      }
    }
  }
  async getWeather(key){
    this.currentWeather = await this.weatherService.getCurrentDayWeather(key);
  }
  async getFiveDayWeather(key){
    this.fiveDaysWeather = await this.weatherService.getFiveDaysWeather(key);
    console.log(this.fiveDaysWeather);
  }
}
