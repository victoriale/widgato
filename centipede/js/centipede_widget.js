var helper = document.getElementById('helper');
var helper2 = document.getElementById('helper2');
var wormBlocks = document.getElementsByClassName('worm_block');
var worm = document.getElementById('worm');
var position;
var currentBlock = 0;
var isScrolling = false;
var scrollingTimout;
var scrollTo = 0;
var scrollIncrements = 0;
worm.addEventListener("scroll", onSwipe);
function onSwipe(e) {
  isScrolling = true;
  if (this.scrollLeft > 20) {
    helper.style.opacity = '0';
    helper2.style.opacity = '0';
  }
  else {
    helper.style.opacity = '1';
    helper2.style.opacity = '1';
  }
  clearTimeout(scrollingTimout);
  scrollingTimout = setTimeout(function(){
    isScrolling = false;
  }, 250);
}
worm.addEventListener("touchend", onFingerUp);
function onFingerUp(e) {
  if (isScrolling == false) {
    setScroll();
  }
  else {
    var setScrollInterval = setInterval(function(){
      if (isScrolling == false) {
        setScroll();
        clearTimeout(setScrollInterval);
      }
    }, 250);
  }
}
function setScroll() {
  for (i = 0; i < wormBlocks.length;  i++) {
    if ((worm.scrollLeft + 180) >= wormBlocks[i].offsetLeft && (worm.scrollLeft + 180) <= (wormBlocks[i].offsetLeft + wormBlocks[i].offsetWidth) && worm.scrollLeft > 20) {
      scrollTo = wormBlocks[i].offsetLeft - 5;
      if (worm.scrollLeft < scrollTo) {
        scrollIncrements = (scrollTo - worm.scrollLeft) / 20;
      }
      else {
        scrollIncrements = (scrollTo - worm.scrollLeft) / 20;
      }
      var setSmoothScrollInterval = setInterval(function(){
        // console.log(worm.scrollLeft,scrollTo);
        if (worm.scrollLeft < (scrollTo - 3) || worm.scrollLeft > (scrollTo + 3)) {
          if (i == (wormBlocks.length - 1)) {
            clearTimeout(setSmoothScrollInterval);
          }
          else {
            worm.scrollLeft = worm.scrollLeft + scrollIncrements;
          }
        }
        else {
          clearTimeout(setSmoothScrollInterval);
        }
      }, 15);
      currentBlock = i;
      return;
    }
    else if (worm.scrollLeft < 20) {
      scrollTo = 0;
      if (worm.scrollLeft < scrollTo) {
        scrollIncrements = (scrollTo - worm.scrollLeft) / 20;
      }
      else {
        scrollIncrements = (scrollTo - worm.scrollLeft) / 20;
      }
      var setSmoothScrollInterval = setInterval(function(){
        if (worm.scrollLeft < (scrollTo - 3) || worm.scrollLeft > (scrollTo + 3)) {
          if (i == (wormBlocks.length - 1)) {
            clearTimeout(setSmoothScrollInterval);
          }
          else {
            worm.scrollLeft = worm.scrollLeft + scrollIncrements;
          }
        }
        else {
          clearTimeout(setSmoothScrollInterval);
        }
      }, 15);
      currentBlock = 0;
      return;
    }
  }
  // if ((currentBlock + 1) <= wormBlocks.length) {
  //   worm.scrollLeft = wormBlocks[currentBlock + 1].offsetLeft - 5;
  //   currentBlock = (currentBlock + 1);
  // }
}
