import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  cities: object[];
  currentWeather;
  fiveDaysWeather;
  api_key: string;

  constructor() {
    this.cities = [];
    this.currentWeather = null;
    this.fiveDaysWeather = null;
    this.api_key = 'Lqx1aRPjGQxIt0RvGSRP606AiRPDKaVT';
  }

  async autocomplete(cityName: string) {
    this.cities = [];
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + this.api_key + '&q=' + cityName +'&&language=en-us';
    if (cityName) {
      let data = await this.requsetFetch(url);
      for (let city of data) {
        this.cities.push(city);
      }
    }
    return this.cities;
  }

  getCurrentDayWeather(citykey: string) {
    const url = 'http://dataservice.accuweather.com/currentconditions/v1/' + citykey + '?apikey=' + this.api_key +'&language=en-us';
    if (citykey) {
      return this.currentWeather = this.requsetFetch(url);;
    }
  }

  getFiveDaysWeather(citykey: string) {
    const url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + citykey + '?apikey=' + this.api_key + '&language=en-us&details=true&metric=true';
    if (citykey) {
      return this.fiveDaysWeather = this.requsetFetch(url);
    }
  }

  async requsetFetch(url){
    let res = await fetch(url);
    let data = await res.json();
    return data;
  }
}
