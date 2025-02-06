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
});
