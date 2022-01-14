// Convert sunrise/sunset timestamp to readable format

export function convertTime(unixTime) {

  let date = new Date(unixTime * 1000)
  let hours = date.getHours()
  let minutes = "0" + date.getMinutes()
  let time = hours + ":" + minutes.substr(-2)

  if (hours < 10) {
    time = "0" + hours + ":" + minutes.substr(-2)
  }
  
  return time;
}

