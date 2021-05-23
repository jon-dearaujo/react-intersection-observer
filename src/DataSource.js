/**
 * Mock for data source using a *generator.
 */

const DataSource = getItems();

function* getItems() {
  let itemsCount = 0;
  while (true) {
    yield [...Array(20).keys()].map(() => {
      itemsCount = itemsCount + 1;
      return {
        label: `Item number ${itemsCount}`,
        id: itemsCount,
      };
    });
  }
}

export default DataSource;
