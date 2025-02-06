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

  test("Sulfuras does not change", () => {
    const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
    expect(gildedRose.items[0].sellIn).toBe(5);
  });


});
