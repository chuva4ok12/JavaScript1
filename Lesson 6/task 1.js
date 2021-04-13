"use strict";

let catalogue = {
    catalogueBlock: null,
    bin: null,
    items: [
        {
            id_item: 57,
            item_name: "motherboard",
            price: 3500,
        },
        {
            id_item: 34,
            item_name: "HDD",
            price: 3476
        },
        {
            id_item: 12,
            item_name: "flash_drive",
            price: 2315
        }
    ],
    init(catalogueBlockClass, bin) {
        this.catalogueBlock = document.querySelector(`.${catalogueBlockClass}`);
        this.bin = bin;
        this.draw();
        this.addEventHandlers();
    },
    draw() {
        if (this.getCatalogueItemsLength() > 0) {
            this.drawCatalogueItems();
        } else {
            this.drawEmptyCatalogue();
        }

    },
    addEventHandlers() {
        this.catalogueBlock.addEventListener('click', event => this.addToBin(event));
    },

    addToBin(event) {
        if (!event.target.classList.contains('item__add-to-bin')) return;
        let idItem = +event.target.dataset.id_item;
        let itemToAdd = this.items.find((item) => item.id_item === idItem);
        this.bin.addToBin(itemToAdd);
    },

    getCatalogueItemsLength() {
        return this.items.length;
    },

    drawCatalogueItems() {
        this.catalogueBlock.innerHTML = '';
        this.items.forEach(product => {
            this.catalogueBlock.insertAdjacentHTML('beforeend', this.drawCatalogueProduct(product));
        });
    },

    drawCatalogueProduct(product) {
        return `<div class="item">
        <h2>${product.item_name}</h2>
        <p>${product.price} roubles</p>
        <button class="item__add-to-bin" data-id_item="${product.id_item}">To a bin</button>
    </div>`;
    },

    drawEmptyCatalogue() {
        this.catalogueBlock.innerHTML = '';
        this.catalogueBlock.textContent = 'Items catalogue is empty';
    },

};

let bin = {
    binBlock: null,
    clearBinButton: null,
    positions: [
        {
            id_item: 57,
            item_name: "motherboard",
            price: 3500,
            quantity: 2
        }
    ],

    init(binBlockClass, clearBinButton) {
        this.binBlock = document.querySelector(`.${binBlockClass}`);
        this.clearBinButton = document.querySelector(`.${clearBinButton}`);
        this.addEventHandlers();
        this.draw();
    },

    addEventHandlers() {
        this.clearBinButton.addEventListener('click', this.clearBin.bind(this));
    },

    clearBin() {
        this.positions = [];
        this.draw();
    },

    draw() {
        if (this.getBinPositionsLength() > 0) {
            this.drawBinItems();
        } else {
            this.drawEmptyBin();
        }
    },

    addToBin(item) {
        if (item) {
            let searchInBin = this.positions.find(({ id_item }) => item.id_item === id_item);
            if (searchInBin) {
                searchInBin.quantity++;
            } else {
                this.positions.push({ ...item, quantity: 1 });
            }

            this.draw();

        } else {
            alert("You've made a mistake while adding");
        }
    },

    getBinPositionsLength() {
        return this.positions.length;
    },

    drawEmptyBin() {
        this.binBlock.innerHTML = '';
        this.binBlock.textContent = 'Bin is empty';
    },

    drawBinItems() {
        this.binBlock.innerHTML = '';
        this.positions.forEach(product => {
            this.binBlock.insertAdjacentHTML('beforeend', this.drawBinProduct(product));
        });
    },

    drawBinProduct(product) {
        return `<div>
        <h2>${product.item_name}</h2>
        <p>${product.price} roubles</p>
        <p>${product.quantity} pcs</p>
    </div>`;
    },
};

catalogue.init('catalogue', bin);
bin.init('bin', 'clear-bin');

