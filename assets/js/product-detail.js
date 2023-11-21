function showInfo(menuNumber) {

    for (let i = 1; i <= 4; i++) {
        document.getElementById('info' + i).style.display = 'none';
    }
    document.getElementById('info' + menuNumber).style.display = 'block';
  
   
  }
  // slide show sản phẩm
  var currentIndex = 0;
  var slideWidth = 300; 
  var numSlides = document.querySelectorAll('.news-item').length;
  
  var prevButton = document.getElementById('prevButton');
  var nextButton = document.getElementById('nextButton');
  var sliderContent = document.querySelector('.other-product2');
  
  prevButton.addEventListener('click', function() {
      currentIndex--;
      if (currentIndex < 0) {
          currentIndex = numSlides - 1;
      }
      updateSlider();
  });
  
  nextButton.addEventListener('click', function() {
      currentIndex++;
      if (currentIndex >= numSlides) {
          currentIndex = 0;
      }
      updateSlider();
  });
  
  function updateSlider() {
      var offsetX = -currentIndex * slideWidth;
      sliderContent.style.transform = 'translateX(' + offsetX + 'px)';
  }