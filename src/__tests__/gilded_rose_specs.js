import { Shop, Item } from '../gilded_rose';

function forwardDays(shop, days) {
    for (let i = 0; i < days - 1; i++)
        shop.updateQuality();
    return shop.updateQuality();
}

describe("Evaluating Simple item", function () {
    const sellIn = 5;
    const quality = 10;

    const shop = new Shop([
        new Item("Simple item", sellIn, quality)
    ]);

    it("Simple item quality max value is 50", function () {
        const sellIn = 5;
        const quality = 52;
        const maxQuality = 50;

        let shop = new Shop([
            new Item("Simple item", sellIn, quality)
        ]);
        let items = forwardDays(shop, 1);
        expect(items[0].sellIn).toEqual(sellIn - 1);
        expect(items[0].quality).toEqual(maxQuality);
    });

    it("shop should create a Simple item", function () {
        let items = forwardDays(shop, 1);
        expect(items[0].name).toEqual("Simple item");
        expect(items[0].sellIn).toEqual(sellIn - 1);
        expect(items[0].quality).toEqual(quality - 1);
    });

    it("Simple item sellin value reaches zero", function () {
        let items = forwardDays(shop, 4);
        expect(items[0].sellIn).toEqual(sellIn - 5);
        expect(items[0].quality).toEqual(quality - 5);
    });

    it("Simple item quality decreases x 2 after sellin = 0", function () {
        let items = forwardDays(shop, 1);
        expect(items[0].sellIn).toEqual(sellIn - 6);
        expect(items[0].quality).toEqual(quality - 7);
    });

    it("Simple item quality minimum value is zero", function () {
        let items = forwardDays(shop, 2);
        expect(items[0].sellIn).toEqual(sellIn - 8);
        expect(items[0].quality).toEqual(0);
    });
});



describe("Evaluating Backstage passes", function () {
    const quality = 30;
    const sellIn = 11;
    const maxQuality = 50;

    let shop = new Shop([
        new Item("Backstage passes to a Take That! concert", sellIn, quality)
    ]);
    it("Backstage passes quality +1 when sellIn > 10", function () {
        let days = 1;
        let items = forwardDays(shop, days);
        expect(shop.items[0].sellIn).toEqual(sellIn - days);
        expect(shop.items[0].quality).toEqual(quality + 1);
    })
    it("Backstage passes quality +2 when sellIn <= 10", function () {
        let items = forwardDays(shop, 5);
        expect(shop.items[0].sellIn).toEqual(sellIn - 6);
        expect(shop.items[0].quality).toEqual(quality + 11);
    })
    it("Backstage passes quality +3 when sellIn <= 5", function () {
        let items = forwardDays(shop, 5);
        expect(shop.items[0].sellIn).toEqual(sellIn - 11);
        expect(shop.items[0].quality).toEqual(maxQuality);
    })
    it("Backstage passes quality = 0 when sellIn <= 0", function () {
        let items = forwardDays(shop, 1);
        expect(shop.items[0].sellIn).toEqual(-1);
        expect(shop.items[0].quality).toEqual(0);
    })
});

describe("Evaluating Aged Brie", function () {
    const quality = 47;
    const sellIn = 2;
    const maxQuality = 50;

    let shop = new Shop([
        new Item("Aged Brie (French)", sellIn, quality)
    ]);
    it("Aged Brie quality increments when sellIn > 0", function () {
        let items = forwardDays(shop, 1);
        expect(shop.items[0].sellIn).toEqual(sellIn - 1);
        expect(shop.items[0].quality).toEqual(quality + 1);
    })
    it("Aged Brie quality increments when sellIn = 0", function () {
        let items = forwardDays(shop, 1);
        expect(shop.items[0].sellIn).toEqual(sellIn - 2);
        expect(shop.items[0].quality).toEqual(quality + 2);
    })
    it("Aged Brie quality increments when sellIn < 0", function () {
        let items = forwardDays(shop, 1);
        expect(shop.items[0].sellIn).toEqual(sellIn - 3);
        expect(shop.items[0].quality).toEqual(maxQuality);
    })
    it("Aged Brie quality maximum 50", function () {
        let items = forwardDays(shop, 1);
        expect(shop.items[0].sellIn).toEqual(sellIn - 4);
        expect(shop.items[0].quality).toEqual(maxQuality);
    })
});

describe("Evaluating Sulfuras", function () {
    const sellIn = 0;
    const sulfurasQuality = 80;

    let shop = new Shop([
        new Item("Sulfuras, Special Edition", sellIn, sulfurasQuality)
    ]);
    it("Sulfuras quality = 80 on day 1", function () {
        let items = forwardDays(shop, 1);
        expect(shop.items[0].sellIn).toEqual(sellIn);
        expect(shop.items[0].quality).toEqual(sulfurasQuality);
    })
    it("Sulfuras quality sellIn remains constant on day rollover", function () {
        let items = forwardDays(shop, 1);
        expect(shop.items[0].sellIn).toEqual(sellIn);
        expect(shop.items[0].quality).toEqual(sulfurasQuality);
    })
});

describe("Evaluating Conjured item", function () {
    const sellIn = 5;
    const quality = 20;

    const shop = new Shop([
        new Item("Conjured item", sellIn, quality)
    ]);

    it("Conjured item quality max value is 50", function () {
        const sellIn = 5;
        const quality = 52;
        const maxQuality = 50;

        let shop = new Shop([
            new Item("Conjured item", sellIn, quality)
        ]);
        let items = forwardDays(shop, 1);
        expect(items[0].sellIn).toEqual(sellIn - 1);
        expect(items[0].quality).toEqual(maxQuality);
    });

    it("shop should create a Conjured item", function () {
        let items = forwardDays(shop, 1);
        expect(items[0].sellIn).toEqual(sellIn - 1);
        expect(items[0].quality).toEqual(quality - 2);
    });

    it("Conjured item when sellin = zero", function () {
        let items = forwardDays(shop, 4);
        expect(items[0].sellIn).toEqual(sellIn - 5);
        expect(items[0].quality).toEqual(quality - 10);
    });

    it("Conjured item quality decreases x 2 when sellin < 0", function () {
        let items = forwardDays(shop, 1);
        expect(items[0].sellIn).toEqual(sellIn - 6);
        expect(items[0].quality).toEqual(quality - 14);
    });

    it("Conjured item quality minimum value is zero", function () {
        let items = forwardDays(shop, 2);
        expect(items[0].sellIn).toEqual(sellIn - 8);
        expect(items[0].quality).toEqual(0);
    });
});
