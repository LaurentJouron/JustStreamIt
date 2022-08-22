//////////////
// CAROUSEL //
//////////////

class Carousel {

    /**
     * @param {HTMLElement}
     * @param {object}
     * @param {object} options.slidesToScroll number of items to scroll through
     * @param {object} options.slidesToVisible number of elements visible in the slide
     */

    constructor (element, options = {}) {
        this.element = element
        this.options = object.assign({}, {
            slidesToScroll: 3,
            slidesToVisible: 4
        }, options)
        
        let children = [].slice.call(element.children)
        let root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')
        root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            container.appendChild(item)
            return item
        })
    }
    
    setStyle () {
        let ratio = this.children.length / this.options.slidesToVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesToVisible) / ratio) + "%")
            
    }
}
    
    /**
     * @param {string} 
     * @returns {HTMLElement}
     */
    function createDivWithClass (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
    
document.addEventListener('DOMContentLoaded', function () {
    new Carousel(document.querySelector('#carousel1'), {
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
