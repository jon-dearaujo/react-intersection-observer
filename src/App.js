import React from "react";
import "./App.css";
import DataSource from "./DataSource";
import useIntersectionObserver from "./useIntersectionObserver";

function App() {
  let lastItemRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const [dataList, setDataList] = React.useState([]);
  let observer: IntersectionObserver;

  function loadData() {
    const newData = DataSource.loadData();
    setDataList((previousDataList) => [...previousDataList, ...newData]);
  }
  React.useEffect(() => {
    loadData();
  }, []);

  useIntersectionObserver(rootRef, lastItemRef, loadData);

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
