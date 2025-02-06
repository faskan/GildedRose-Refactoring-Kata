export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  static MAX_QUALITY = 50;
  static MIN_QUALITY = 0;
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Item[] {
    this.items.forEach((item: Item) => this.updateItem(item));
    return this.items;
  }

  updateItem(item: Item) {
    if (item.name === "Sulfuras, Hand of Ragnaros") {
      return item; // Legendary item, no changes
    }
    item.sellIn -= 1;

    switch (item.name) {
      case "Aged Brie":
        item.quality = this.updateAgedBrie(item.sellIn, item.quality);
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        item.quality = this.updateBackstagePass(item.sellIn, item.quality);
        break;
      case "Conjured Mana Cake":
        item.quality = this.decreaseQuality(item.quality, item.sellIn, 2);
        break;
      default:
        item.quality = this.decreaseQuality(item.quality, item.sellIn);
        break;
    }
    return new Item(item.name, item.sellIn, item.quality);
  }

  updateAgedBrie(sellIn: number, quality: number) {
    if(sellIn < 0) {
      return this.increaseQuality(quality, 2);
    }
    return this.increaseQuality(quality);
  }

  updateBackstagePass(sellIn: number, quality: number) {
    if (sellIn < 0) {
      return GildedRose.MIN_QUALITY;
    } else if (sellIn < 5) {
      return this.increaseQuality(quality, 3);
    } else if (sellIn < 10) {
      return this.increaseQuality(quality, 2);
    } else {
      return this.increaseQuality(quality);
    }
  }

  increaseQuality(quality: number, increment = 1) {
    return Math.min(GildedRose.MAX_QUALITY, quality + increment);
  }

  decreaseQuality(quality: number, sellIn: number, decrement = 1) {
    if(sellIn < 0) {
      return Math.max(GildedRose.MIN_QUALITY, quality - (decrement * 2));
    }
    return Math.max(GildedRose.MIN_QUALITY, quality - decrement);
  }
/* TODO - remove
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }*/
}
