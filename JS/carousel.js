//////////////
// CAROUSEL //
//////////////

class Carousel {

    /**
     * @param {HTMLElement}
     * @param {object}
     * @param {object} options.slidesToScroll number of items to scroll through
     * @param {object} options.slidesToVisible number of elements visible in the slide
     * @param {boolean} options.loop should we finish the carousel
     */
    constructor (element, options = {}) {
        this.element = element
        this.options = object.assign({}, {
            slidesToScroll: 1,
            slidesToVisible: 4,
            loop: false
        }, options)
        
        let children = [].slice.call(element.children)
        this.currentItem = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.moveCallBacks = []
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation()
        this.moveCallBacks.forEach(callBack => callBack(0))
    }
    /**
     * Applies the correct dimensions to the carousel elements.
     */
    setStyle () {
        let ratio = this.items.length / this.options.slidesToVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesToVisible) / ratio) + "%")
            
    }
    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        this.onMove(index => {
            if(index === 0) {
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if (this.item[this.currentItem + this.options.slidesToVisible] === undefined){
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.add('carousel__next--hidden')
            }
        })
    }
    next () {
        this.gotToItem(this.currentItem + this.options.slidesToScroll)

    }
    prev () {
        this.gotToItem(this.currentItem - this.options.slidesToScroll)
    }
    /**
     * Moves the carousel to the target element
     * @param {number} index 
     */
    gotToItem(index) {
        if (index < 0) {
            index = this.items.length - this.options.visible
        } else if (index >= this.items.length || this.item[this.currentItem + this.options.slidesToVisible] === undefined) {
            index = 0
        }
        let translateX = index * 100 / this.items.length
        this.container.style.transfom = 'translate3d(' + translateX + ' %, 0, 0)'
        this.currentItem = index
        this.moveCallBacks.forEach(callBack => callBack(index))
    }

    onMove(callBack) {
        this.moveCallBacks.push(callBack)
    }

    /**
     * @param {string} 
     * @returns {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}
    
    
document.addEventListener('DOMContentLoaded', function () {
    new Carousel(document.querySelector('#carousel1'), {
        slidesToScroll: 1,
        slidesToVisible: 4,
        loop: false
    })

    new Carousel(document.querySelector('#carousel2'), {
        slidesToScroll: 3,
        slidesToVisible: 4
    })
})


//////////////////////
// ARROWS DIRECTION //
//////////////////////

// const containerPrevArrows = document.querySelector(".container--prev_arrows");
// const containerNextArrows = document.querySelector(".container--next_arrows");

// containerPrevArrows.addEventListener('click', () => {
    //     containerPrevArrows.getElementsByClassName("container--prev_arrows");
    //     move(--currentIndex);
    // })
    
// containerNextArrows.addEventListener('click', () => {
    //     containerNextArrows.getElementsByClassName("container--next_arrows");
    //     move(++currentIndex);
    // })
