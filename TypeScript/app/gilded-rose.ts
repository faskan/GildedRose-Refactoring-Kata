export class Item {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}
}

export class GildedRose {
  static MAX_QUALITY = 50;
  static MIN_QUALITY = 0;

  constructor(public items: Item[] = []) {}

  updateQuality() {
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

  private updateAgedBrie(sellIn: number, quality: number) {
    return this.increaseQuality(quality, sellIn < 0 ? 2 : 1);
  }

  private updateBackstagePass(sellIn: number, quality: number) {
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

  private increaseQuality(quality: number, increment = 1) {
    return Math.min(GildedRose.MAX_QUALITY, quality + increment);
  }

  private decreaseQuality(quality: number, sellIn: number, decrement = 1) {
    return Math.max(GildedRose.MIN_QUALITY, quality - (sellIn < 0 ? decrement * 2 : decrement));
  }
}
