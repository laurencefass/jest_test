// Use constants for strings and values to remove magic numbers from the code
const DECREASE_FACTOR = -1;
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const DEFAULT_ITEM = "Default"
const CONJURED_ITEM = "Conjured"
const AGED_BRIE = "Aged Brie"
const BACKSTAGE_PASSES = "Backstage passes"
const SULFURAS = "Sulfuras"

// This solution completely removes and replaces the shop.updateQuality() method to 
// maximise use of Javascript structures and methods for a more data-centric solution.
// New product categories can be simply added by adding a new item to categories array 
// without having to alter Shop.updateQuality(). The product categories self-contain
// their own rules for updating, decoupling them from all other product categories whilst
// sharing common code where necessary. This also makes it easier to reason and to serialize 
// product categories if required, and also to reuse the categories in modified versions of 
// Shop.updateQuality or even new API methods that are not yet defined by the application. 

function decreaseItem(item, baseFactor) {
  item.sellIn--;
  item.quality += (item.sellIn >= 0) ? baseFactor : baseFactor * 2;
  item.quality = Math.min(MAX_QUALITY, Math.max(item.quality, MIN_QUALITY));
}

const categories = [
  {
    // default items are any items that do not have "special" rules defined in README.md
    // and can be absolutely anything.
    name: DEFAULT_ITEM,
    updateItem: (item) => {
      decreaseItem(item, DECREASE_FACTOR);
    }
  },
  {
    // Conjured items contain the word "Conjured" but can also be anything
    name: CONJURED_ITEM,
    updateItem: (item) => {
      decreaseItem(item, DECREASE_FACTOR * 2);
    }
  },
  {
    name: AGED_BRIE,
    updateItem: (item) => {
      item.sellIn--;
      item.quality += 1
      item.quality = Math.min(item.quality, MAX_QUALITY);
    }
  },
  {
    name: SULFURAS,
    updateItem: (item) => {
      item.quality = 80;
    }
  },
  {
    name: BACKSTAGE_PASSES,
    updateItem: (item) => {
      if (item.sellIn > 10)
        item.quality++;
      else if (item.sellIn > 5)
        item.quality += 2;
      else if (item.sellIn > 0)
        item.quality += 3;
      else
        item.quality = 0;

      item.quality = Math.min(item.quality, MAX_QUALITY);
      item.sellIn--;
    }
  },
]

// property of the angry goblin - do not touch
export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    // property of the angry goblin - do not touch
    this.items = items;
  }

  // make best full of Javascript data structures to remove all trace of nested if() statements
  // this method can cope with any number of future unkown products with own arbitrary update rules
  // the product-category string comparison also loosens up the requirements on the names to allow a 
  // wider variety of products to be added without changing the code.
  updateQuality() {
    this.items = this.items.map((item) => {
      let type =
        categories.find((type) => item.name.includes(type.name)) ||
        categories.find(type => type.name.includes(DEFAULT_ITEM));
      type.updateItem(item);
      return item;
    });
    return this.items;
  }
}