import axios from 'axios';

// Weather class constructor
export default class Weather {
      constructor(city) {
            this.city = city;
            this.key = '31ba0dfb2a415daf8797fbb435b2f213'
      }

      async getData() {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=${this.key}`;
            const data = await axios(url)
            this.data = data
            return data
      }
}
