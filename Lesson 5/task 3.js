let article = {
    draw(wares) {
        return `<div class="wares">
        <div><b>Name</b>: ${wares.item}</div>
        <div><b>Price per piece</b>: ${wares.price}</div>
        <div><b>Quantity</b>: ${wares.quantity}</div>
        <div><b>Total</b>: ${wares.quantity * wares.price}</div>
    </div>`;
    }
}

let bin = {
    binListBlock: null,
    binButton: null,
    article,
    items: [
        {
            item: "motherboard",
            price: 3500,
            quantity: 2
        },
        {
            item: "HDD",
            price: 3476,
            quantity: 3
        },
        {
            item: "flash_drive",
            price: 2315,
            quantity: 1
        },
    ],

    init() {
        this.binListBlock = document.querySelector('.bin-list');
        this.binButton = document.querySelector('.bin-btn');
        this.binButton.addEventListener('click', () => this.clearBin());

        this.draw();
    },

    draw() {
        if (this.items.length) {
            this.items.forEach(wares => {
                this.binListBlock.insertAdjacentHTML('beforeend', this.article.draw(wares));
            });
            this.binListBlock.insertAdjacentHTML('beforeend', `There are ${this.items.length} positions with overall price
    ${this.getBinPrice()}`);
        } else {
            this.binListBlock.textContent = 'Bin is empty!';
        }
    },
    getBinPrice() {
        return this.items.reduce(function (price, wares) {
            return price + wares.price * wares.quantity;
        }, 0);
    },
    clearBin() {
        this.items = [];
        this.draw();
    },
};

bin.init();