import React from "react";
import "./App.css";

// This line is not really relevant in real world. It is a mock.
// In a production app the data comes from a HTTP Request or Redux.
// It is not loading (Or generating, as it is a generator lol) any data yet,
// just initializing an iterator for us to simulate continuous data loading
const dataSource = getItems();

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

function App() {
  let lastItemRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const [dataList, setDataList] = React.useState([]);
  let observer: IntersectionObserver;

  function loadData() {
    const newData = dataSource.next().value;
    setDataList((previousDataList) => [...previousDataList, ...newData]);
  }
  React.useEffect(() => {
    loadData();
  }, []);

  React.useEffect(() => {
    if (rootRef.current && lastItemRef.current) {
      const interceptConfig = {
        root: rootRef.current,
        rootMargin: "0px",
        //Beware of the container's padding.
        // It might impact on how much of your target is actually visible
        // and making it impossible for this criteria to be fulfilled
        threshold: 0.1,
      };

      observer = new IntersectionObserver((entries) => {
        if (entries.every((entry) => entry.isIntersecting)) {
          loadData();
        }
      }, interceptConfig);

      observer.observe(lastItemRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [rootRef.current, lastItemRef.current, observer]);

  // Get the next-to-last item as target index
  const referenceDataListIndex = dataList.length - 2;
  return (
    <ul ref={rootRef}>
      {dataList.map((a, index) => (
        <li
          key={a.id}
          // set the ref to the desired target <li>
          ref={index === referenceDataListIndex ? lastItemRef : null}
        >
          {a.label}
        </li>
      ))}
    </ul>
  );
}

export default App;
