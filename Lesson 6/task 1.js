let catalogue = {
    catalogueBlock: null,
    bin: null,
    items: [
        {
            id_item: 1,
            item: "motherboard",
            price: 3500,
        },
        {
            id_item: 2,
            item: "HDD",
            price: 3476,
        },
        {
            id_item: 3,
            item: "flash_drive",
            price: 2315,
        },
    ],
    init(catalogueBlockClass, bin) {
        this.catalogueBlock = document.querySelector(`.${catalogueBlockClass}`);
        this.bin = bin;
        this.draw();
        this.addEventHandlers();
    },
    draw() {
        if (this.getCatalogueListLength() > 0) {
            this.drawCatalogueList();
        } else {
            this.drawEmptyCatalog();
        }

    },
    addEventHandlers() {
        this.catalogueBlock.addEventListener('click', event => this.addToBin(event));
    },

    addToBin(event) {
        if (!event.target.classList.contains('item_add-to-bin')) return;
        let idItem = +event.target.dataset.id_item;
        let itemToAdd = this.items.find((item) => item.id_item === idItem);
        this.bin.addToBin(itemToAdd);
    },

    getCatalogueListLength() {
        return this.items.length;
    },

    drawCatalogueList() {
        this.catalogueBlock.innerHTML = '';
        this.items.forEach(product => {
            this.catalogueBlock.insertAdjacentHTML('beforeend', this.drawCatalogueProduct(product));
        })
    },

    drawCatalogueProduct(product) {
        return `<div class="product">
        <h2>${product.product_name}</h2>
        <p>${product.price} руб.</p>
        <button class="item_add-to-cart" data-id_item="${item.id_item}">To the bin</button>
    </div>`;
    },

    drawEmptyCatalogue() {
        this.catalogueBlock.innerHTML = '';
        this.catalogueBlock.textContent = 'Items catalogue is empty';
    },

};

let bin = {
    binListBlock: null,
    clearBinButton: null,
    items: [
        {
            id_item: 1,
            item: "motherboard",
            price: 3500,
            quantity: 2
        },
        {
            id_item: 2,
            item: "HDD",
            price: 3476,
            quantity: 3
        },
        {
            id_item: 3,
            item: "flash_drive",
            price: 2315,
            quantity: 1
        },
    ],

    init(binListBlockClass, clearBinButton) {
        this.binListBlock = document.querySelector(`.${BinListBlockClass}`);
        this.clearBinButton = document.querySelector(`.${clearBinButton}`);
        this.addEventHandlers();
        this.draw();
    },

    addEventHandlers() {
        this.clearBinButton.addEventListener('click', this.clearBin.bind(this));
    },

    clearBin() {
        this.items = [];
        this.draw();
    },

    draw() {
        if (this.getBinItemsLength() > 0) {
            this.drawBinList();
        } else {
            this.drawEmptyBin();
        }
    },

    addToBin(item) {
        if (item) {
            let searchInBin = this.items.find(({ id_item }) => item.id_item === id_item);
            if (searchInBin) {
                searchInBin.quantity++;
            } else {
                this.items.push({ ...item, quantity: 1 });

            }
            this.draw();
        } else {
            alert('Youve made a mistake while adding');
        }
    },

    getBinItemsLength() {
        return this.items.length;
    },

    drawEmptyBin() {
        this.binListBlock.innerHTML = '';
        this.binListBlock.textContent = 'Bin is empty';
    },

    drawBinList() {
        this.binListBlock.innerHTML = '';
        this.items.forEach(product => {
            this.binListBlock.insertAdjacentHTML('beforeend', this.drawBinProduct(product));
        });
    },

    drawBinProduct(product) {
        return `<div>
        <h2>${product.item}</h2>
        <p>${product.price} roubles</p>
        <p>${product.quantity} pcs</p>
    </div>`;
    },
};

catalogue.init('catalogue', bin);
bin.init('bin', 'clearBin')