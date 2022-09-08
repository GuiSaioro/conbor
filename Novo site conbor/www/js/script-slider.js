const slider = document.querySelector(".slid input");
const img = document.querySelector(".images-slider .img-2");
const dragLine = document.querySelector(".slid .drag-line");
slider.oninput = ()=>{
  let sliderVal = slider.value;
  dragLine.style.left = sliderVal + "%";
  img.style.width = sliderVal + "%";
}
const slider2 = document.querySelector(".slid2 input");
const img2 = document.querySelector(".images-slider2 .img-4");
const dragLine2 = document.querySelector(".slid2 .drag-line2");
slider2.oninput = ()=>{
  let sliderVal2 = slider2.value;
  dragLine2.style.left = sliderVal2 + "%";
  img2.style.width = sliderVal2 + "%";
}
const slider3 = document.querySelector(".slid3 input");
const img3 = document.querySelector(".images-slider3 .img-6");
const dragLine3 = document.querySelector(".slid3 .drag-line3");
slider3.oninput = ()=>{
  let sliderVal3 = slider3.value;
  dragLine3.style.left = sliderVal3 + "%";
  img3.style.width = sliderVal3 + "%";
}