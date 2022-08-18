//////////////
// CAROUSEL //
//////////////

class Carousel {
    /**
     * @param {HTMLElement} element 
     * @param {Object} option 
     * @param {object} options.slidesToScroll number of items to scroll through
     * @param {object} options.slidesToVisible number of elements visible in the slide
     */
    constructor (element, options = {}) {
        this.element = element
        this.options = object.assign({}, {
            slidesToScroll: 1,
            slidesToVisible: 4
        }, options)
        this.children = [].slice.call(element.children)
        let root = this.createDivWithClass('carousel')
        let container = this.createDivWithClass('carousel__container')
        root.appendChild(container)
        this.element.appendChild(root)
        this.children.forEach(function (child) {
            container.appendChild(child)
        })
    }
    
    /**
     * @param {string} 
     * @returns {HTMLElement}
     */
    createDivWithClass (className) {
        let did = document.createElement('div')
        dispatchEvent.setAttribute('class', className)
        return div
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new Carousel(document.querySelector('carousel'), {
        slidesToScroll: 1,
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
