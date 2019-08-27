import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FavoritesService } from '../favorites.service';
import { favorite } from '../favorites.model';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @ViewChild('city') city: ElementRef;
  @ViewChild('cityOption') cityOption: ElementRef;
  @ViewChild('citySelect') citySelect: ElementRef;
  cityName: string;
  cities;
  currentWeather;
  fiveDaysWeather;
  key: string;
  btnText: string;
  fav: boolean;
  constructor(private weatherService: WeatherService, private favoritesService: FavoritesService) {
    this.cityName = "Tel Aviv";
    this.cities = [{ LocalizedName: 'Tel Aviv', key: '215854' }];
    this.currentWeather = [];
    this.fiveDaysWeather = [];
    this.key = '';
    this.btnText = 'Add To Favorites';
    this.fav = false;
  }

  ngOnInit() {
    const defaultKey = '215854';
    this.autocomplete();
    this.getWeather(defaultKey);
    this.getFiveDayWeather(defaultKey);
  }
  async autocomplete() {
    let city = this.city.nativeElement.value;
    this.cities = await this.weatherService.autocomplete(city);
  }
  changInput() {
    this.cityName = this.citySelect.nativeElement.options[this.citySelect.nativeElement.options.selectedIndex].value;
  }
  setCity(e: Event) {
    let city = this.city.nativeElement.value;
    e.preventDefault();
    for (let item of this.cities) {
      if (item.LocalizedName.toLowerCase() === city.toLowerCase()) {
        this.cityName = city;
        console.log(city.toLowerCase(), item.LocalizedName.toLowerCase());
        this.key = item.Key;
        this.getWeather(item.Key);
        this.getFiveDayWeather(item.Key);
      }
    }
  }
  async getWeather(key) {
    this.currentWeather = await this.weatherService.getCurrentDayWeather(key);
  }
  async getFiveDayWeather(key) {
    this.fiveDaysWeather = await this.weatherService.getFiveDaysWeather(key);
  }
  toggleFavorites() {
    this.fav = this.favoritesService.checkFavoritesExist(this.key);
    if (!this.fav) {
      this.add();
      this.btnText = 'Remove From Favorites';
    }
    else {
      this.remove();
      this.btnText = 'Add To Favorites';
    }
  }
  add() {
    let obj: favorite;
    obj = {
      id: this.key,
      name: this.cityName,
      dagrees: this.currentWeather[0].Temperature.Metric.Value,
      weatherText: this.currentWeather[0].WeatherText
    }
    this.favoritesService.addToFavorites(obj);
  }
  remove() {
    this.favoritesService.removeFromFavorites(this.key);
  }
}
