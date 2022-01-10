    class Carousel {
    constructor (p) {
    
        const settings = {...{containerID: '#carousel', interval: 5000, isPlaying: true, slideID: '.slide'}, ...p};
    
        this.container = document.querySelector(settings.containerID);
        this.slideItems = this.container.querySelectorAll(settings.slideID);
        this.interval = settings.interval;
        this.isPlaying = settings.isPlaying;

        this.slidesContainer = document.querySelector('#slides');

    }
    _initProps(){
        
        this.SLIDES_COUNT = this.slideItems.length;
        this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
        this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
        this.FA_PREV = '<i class="fas fa-angle-left"></i>';
        this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
        this.CODE_SPACE = "Space";
        this.CODE_LEFT_ARROW = "ArrowLeft";
        this.CODE_RIGHT_ARROW = "ArrowRight";
        
        this.currentSlide = 0;
        
    }

    _initControls(){
        let controls = document.createElement('div');
        const PAUSE = `<span id="pause-btn" class="control pause-play">${this.isPlaying ? this.FA_PAUSE : this.FA_PLAY}</span>`;
        const PREV = `<span id="prev-btn" class="control prev">${this.FA_PREV}</span>`;
        const NEXT = `<span id="next-btn" class="control next">${this.FA_NEXT}</span>`;
        

        controls.setAttribute('class','controls');
        controls.innerHTML = PAUSE + PREV + NEXT;

        this.slidesContainer.append(controls);

        this.pauseBtn = this.container.querySelector('#pause-btn');
        this.nextBtn = this.container.querySelector('#next-btn');
        this.prevBtn = this.container.querySelector('#prev-btn');

        this.pauseIcon = this.container.querySelector('#fa-pause-icon');
        this.playIcon = this.container.querySelector('#fa-play-icon');

        
    }


    _initIndicators () {

        const indicators = document.createElement('div');

        indicators.setAttribute('class', 'indicators');

        for (let i = 0, n = this.SLIDES_COUNT; i < n; i++) {
            const indicator = document.createElement('div');
    
            indicator.setAttribute('class', 'indicator');
            indicator.dataset.slideTo = `${i}`;
            i === 0 && indicator.classList.add('active');
    
            indicators.append(indicator);
        }

        this.slidesContainer.appendChild(indicators);

        this.indContainer = this.container.querySelector(".indicators");
        this.indicatorItems = this.container.querySelectorAll(".indicator");

    }

    _initListeners() {
        document.addEventListener("keydown", this._pressKey.bind(this));
        this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
        this.prevBtn.addEventListener("click", this.prev.bind(this));
        this.nextBtn.addEventListener("click", this.next.bind(this));
        this.indContainer.addEventListener("click", this._indicate.bind(this));
        
        
    }

    _gotoNth(n) {
        this.slideItems[this.currentSlide].classList.toggle('active');
        this.indicatorItems[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slideItems[this.currentSlide].classList.toggle('active');
        this.indicatorItems[this.currentSlide].classList.toggle('active');
    }

    _gotoPrev() {
        this._gotoNth(this.currentSlide - 1);
    }
    _gotoNext() {
        this._gotoNth(this.currentSlide + 1);
    }

    _pause() {
        if (this.isPlaying) {
        this.pauseBtn.innerHTML = this.FA_PLAY;
        this.isPlaying = false;
        clearInterval(this.timerID);
        }
    }

    _play() {
        if (!this.isPlaying) {
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.isPlaying = true;
        this.timerID = setInterval(() => this._gotoNext(), this.interval);
        }
    }

    _indicate(e) {
        const target = e.target;

        if (target && target.classList.contains("indicator")) {
        this._pause();
        this._gotoNth(+target.dataset.slideTo);
        }
    }

    _pressKey(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.prev();
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    }

    pausePlay() {
        this.isPlaying ? this._pause() : this._play();
    }

    prev() {
        this._pause();
        this._gotoPrev();
    }

    next() {
        this._pause();
        this._gotoNext();
    }

    init() {
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();
        if (this.isPlaying) this.timerID = setInterval(() => this._gotoNext(), this.interval);
    }
    }

    export default Carousel;
    



