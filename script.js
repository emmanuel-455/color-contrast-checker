//Initial References
let textColor = document.getElementById("text-color");
let bgColor = document.getElementById("bg-color");
let previewText = document.getElementById("preview");
let contrastRef = document.getElementById("contrast");
let rating = document.getElementById("rating");

//Function to convert hex value to RGB array
function hexToRGB(colorValue) {
  const red = parseInt(colorValue.substring(1, 3), 16);
  const green = parseInt(colorValue.substring(3, 5), 16);
  const blue = parseInt(colorValue.substring(5, 7), 16);
  return [red, green, blue];
}

let getRelativeLuminance = (color) => {
  const sRGB = color.map((val) => {
    const s = val / 255;
    return s < 0.03928 ? s / 12 / 92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
};

let calculateContrastRatio = (color1, color2) => {
  const luminance1 = getRelativeLuminance(color1);
  const luminance2 = getRelativeLuminance(color2);

  const light = Math.max(luminance1, luminance2);
  const dark = Math.min(luminance1, luminance2);
  const contrast = (light + 0.05) / (dark + 0.05);
  return contrast;
};

let calcRating = (contrastVal) => {
  if (contrastVal > 12) {
    rating.style.backgroundColor = "#69eb67";
    return "Super";
  } else if (contrastVal > 7) {
    rating.style.backgroundColor = "#b7ea84";
    return "Very Good";
  } else if (contrastVal > 5) {
    rating.style.backgroundColor = "#f7d658";
    return "Good";
  } else if (contrastVal > 3) {
    rating.style.backgroundColor = "#f17a55";
    return "Poor";
  } else {
    rating.style.backgroundColor = "#f24646";
    return "Very Poor";
  }
};

let contrastChecker = () => {
  let textColorValue = textColor.value;
  let textColorRGBArray = hexToRGB(textColorValue);

  let bgColorValue = bgColor.value;
  let bgColorRGBArray = hexToRGB(bgColorValue);

  //   console.log(textColorValue, textColorRGBArray);
  //   console.log(bgColorValue, bgColorRGBArray);

  const contrast = calculateContrastRatio(textColorRGBArray, bgColorRGBArray);

  contrastRef.innerText = contrast.toFixed(2);
  rating.innerText = calcRating(contrast);
  previewText.style.cssText = `
  background-color: ${bgColorValue};
  color: ${textColorValue}
  `;
};

textColor.addEventListener("input", contrastChecker);
bgColor.addEventListener("input", contrastChecker);
window.addEventListener("load", contrastChecker);