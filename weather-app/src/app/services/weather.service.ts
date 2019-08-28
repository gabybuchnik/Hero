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
    this.api_key = 'HySknNN1StOS3eJeghGx84bVzGN6fZRx';
  }

  async autocomplete(cityName: string) {
    this.cities = [];
    let englishReg = /^[A-Za-z ]*$/;
    let en = englishReg.test(cityName);
    if (en) {
      const url = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + this.api_key + '&q=' + cityName + '&language=en-us';
      if (cityName) {
        let data = await this.requsetFetch(url);
        for (let city of data) {
          this.cities.push(city);
        }
      }
      return this.cities;
    }
    else {
      throw "only english characters allowed";
    }
  }

  getCurrentDayWeather(citykey: string) {
    const url = 'http://dataservice.accuweather.com/currentconditions/v1/' + citykey + '?apikey=' + this.api_key + '&language=en-us';
    try {
      return this.currentWeather = this.requsetFetch(url);
    } catch (error) {
      throw error;
    }
  }

  getFiveDaysWeather(citykey: string) {
    const url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + citykey + '?apikey=' + this.api_key + '&language=en-us&details=true&metric=true';
    try {
      return this.fiveDaysWeather = this.requsetFetch(url);
    } catch (error) {
      throw error;
    }
  }

  async requsetFetch(url) {
    try {
      let res = await fetch(url);
      let data = await res.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
