import { domStrings } from './domstrings';

// Clear weather icons, prevent from showing up double after new search
export function deleteIcon() {
  if (domStrings.weatherIcon && domStrings.weatherIcon2) {
    domStrings.weatherIcon.innerHTML = "";
    domStrings.weatherIcon2.innerHTML = "";
  }
}


// Delete error message 
export function deleteError() {
  if (domStrings.errorMessage.textContent === 'Oooops something went wrong!') {
    domStrings.errorMessage.textContent = ""
  }
}


//Clear input field
export function clearInput() {
  if (domStrings.input.value) {
    domStrings.input.value = ""
  }
}


export function getDate() {

  const options = { month: "long", weekday: "long", day: "numeric" };

  const now = new Date();
  const today = now.toLocaleDateString("en-EN", options);

  const now2 = new Date();
  now2.setDate(now2.getDate() + 1)
  const tomorrow = now2.toLocaleDateString("en-EN", options);

  return [today, tomorrow];

}
