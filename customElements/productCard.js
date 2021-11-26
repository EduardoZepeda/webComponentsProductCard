class ProductCard extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    attributeChangedCallback(attr, oldValue, newValue){
        this[attr] = newValue
    }

    static get observedAttributes() {
        return ['producttitle', 'productcontent', 'productimg', 'productsubtitle']
    }

    getTemplate() {
        const template = document.createElement('template')
        template.innerHTML = `
            <div class="container">
                <div class="productImage">
                    <div class="brandName">Nike</div>
                    <img src=${this.productimg}/>
                </div>
                <div class="productInfo">
                    <div class="text">
                        <h2>
                            <slot name="productTitle">${this.producttitle} </slot><span class="productSubtitle">${this.productsubtitle}</span>
                        </h2>
                        <p name="productContent" class="productContent">${this.productcontent}</p>
                    </div>
                    <div class="action">
                        <div class="productPrice">$2,000</div>
                        <div><button class="buyButton">Comprar ahora</button></div>
                    </div>
                </div>
            </div>
            ${this.getStyles()}
        `
        return template
    }

    getStyles() {
        return `
        <style>
            :host {
                font-family: sans;
                --main-color: #5A67B0;
                --black: #111111;
                --white: #FFF;
                --gray: #353535;
                color: --var(--gray);
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
            }
            .container {
                display: flex;
                flex-direction: column;
                border-radius: 1rem;
                box-shadow:
                0 2.8px 2.2px rgba(0, 0, 0, 0.034),
                0 6.7px 5.3px rgba(0, 0, 0, 0.048),
                0 12.5px 10px rgba(0, 0, 0, 0.06),
                0 22.3px 17.9px rgba(0, 0, 0, 0.072),
                0 41.8px 33.4px rgba(0, 0, 0, 0.086),
                0 100px 80px rgba(0, 0, 0, 0.12);
            }
            @media (min-width: 800px) {
                :host {
                    align-items: center;
                }
                .container {
                    max-width: 800px;
                    width: 75%;
                    height: 50%;
                    flex-direction: row;
                    align-content: center;
                }
                .productImage {
                }
                .productImage img {
                    transform: rotate(-20deg) scale(1.5) translateX(-30px);
                }
                .productInfo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .productContent {
                    margin-left: 2rem;
                }
              }
            .productImage {
                position: relative;
                flex: 1;
                background-color: var(--main-color);
            }
            .productSubtitle {
                color: var(--gray);
                font-size: 0.95rem;
            }
            .brandName {
                color: var(--black);
                font-size: 5rem;
                opacity: 0.2;
                position: absolute;
                top: 30px;
                left: 30px;
            }  
            .productImage img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
            .productInfo {
                flex: 1;
                background-color: white;
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
            }
            .action {
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
            .buyButton {
                background-color: var(--main-color);
                color: white;
                border: 0;
                padding: 1rem 2rem;
                border-radius: 5px;
            }
            .productPrice {
                font-size: 1.5rem;
                color: var(--gray);
            }
            .productContent {
                font-size: 0.9rem;
            }
            .text {
                padding: 1.5rem 2.5rem;
            }
        </style>
        `
    }

    render() {
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true))
    }

    connectedCallback() {
        this.render();
    }

}

customElements.define('product-card', ProductCard)