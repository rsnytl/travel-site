import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {
  constructor(els,thresholdPercent) {
    this.thresholdPercent=thresholdPercent;
    this.itemToReveal = els;
    this.browserHeight = window.innerHeight;
    this.hideInitially();
    this.scrollThrottle = throttle(this.calcCaller,200).bind(this);
    this.events();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle);
    window.addEventListener('resize', debounce(()=>{
      console.log('resize jusr ran');
      this.browserHeight = window.innerHeight;
    }, 333))
  }


  calcCaller(){    
    this.itemToReveal.forEach(el => {
      if(el.isRevealed == false){
        this.calculateIfScrolledTo(el);
      }
    });
  }


  calculateIfScrolledTo(el) {
    if(window.scrollY+this.browserHeight>el.offsetTop){
      let scrollPercent = (el.getBoundingClientRect().y / window.innerHeight) * 100;
      if (scrollPercent < this.thresholdPercent) {
        el.classList.add("reveal-item--is-visible");
        el.esRevealed = true;
        if (el.isLastItem) {
          window.removeEventListener('scroll', this.scrollThrottle);
        }
      }
    }
  }

  hideInitially() {
    this.itemToReveal.forEach(el => {
      el.classList.add("reveal-item")
      el.isRevealed = false;
      this.itemToReveal[this.itemToReveal.length-1].isLastItem=true;
  });
  }
}

export default RevealOnScroll;
