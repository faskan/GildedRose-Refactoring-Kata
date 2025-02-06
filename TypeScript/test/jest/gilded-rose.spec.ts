import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  test("normal item degrades in quality", () => {
    const gildedRose = new GildedRose([new Item("Normal Item", 10, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(19);
    expect(gildedRose.items[0].sellIn).toBe(9);
  });

  test("quality never goes below zero", () => {
    const gildedRose = new GildedRose([new Item("Normal Item", 5, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  test("Aged Brie increases in quality", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 30)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(31);
  });

  test("Aged Bri quality never goes above 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });

  test("Sulfuras does not change", () => {
    const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
    expect(gildedRose.items[0].sellIn).toBe(5);
  });

  test("Backstage passes increase in quality", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(21);
  });

  test("Backstage passes increase by 2 when 10 days or less", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(22);
  });

  test("Backstage passes increase by 3 when 5 days or less", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(23);
  });

  test("Backstage passes drop to 0 after concert", () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  // new requirement
  test("Conjured items degrade twice as fast", () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 5, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(8);
  });

});
