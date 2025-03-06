import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { marketData } from "../actions/marketData";
import { toast } from "react-toastify";

// Action creator for adding a stock
export function addStock(stock, ltp) {
  return {
    type: "ADD_STOCK",
    payload: stock,
    ltp: ltp,
  };
}

function useElementSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
//   console.log("In useElementSize",ref,size)

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        console.log("entry",entry)
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, size];
}

function throttle(fn, wait) {
  let lastTime = 0;
  return function (...args) {
    console.log("In throttle's return function",...args)
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      console.log("In throttle's return function's if",lastTime)
      fn(...args);
    }
  };
}

export default function SearchResults({ searchedStock, children }) {
  const dispatch = useDispatch();

  const thunkFunc = (stock) => {
    return async (dispatch, getState) => {
      try {
        console.log("In thunk function", stock);
        const res = await marketData(stock);
        if (res === "Error while fetching" || res.success == false) toast.error("Error while fetching");
        else dispatch(addStock(stock, res));
      } catch (e) {
        console.log("Error while fetching", e);
      }
    };
  };

  const rowHeight = 60; 
  const gap = 10; 
  const bufferedItems = 5;

  const [scrollTop, setScrollTop] = useState(0);

  const [containerRef, { height: containerHeight }] = useElementSize();

  const handleScroll = useCallback(
    throttle((e) => {
        console.log("In throttle callback fn",e)
      setScrollTop(e.target.scrollTop);
    }, 50),
    []
  );

  const totalItemHeight = rowHeight + gap; 
  const startIndex = Math.max(Math.floor(scrollTop / totalItemHeight) - bufferedItems, 0);
  const endIndex = Math.min(
    Math.ceil((scrollTop + containerHeight) / totalItemHeight) + bufferedItems,
    searchedStock.length - 1
  );
  const visibleStocks = searchedStock.slice(startIndex, endIndex + 1);

  return (
    <div
      className="relative h-screen overflow-y-auto"
      onScroll={handleScroll}
      ref={containerRef}
      style={{ position: "relative" }}
    >
      {children}
      {searchedStock.length === 0 ? (
        <div className="sm:ml-[30%] max-sm:ml-[20%] mt-[25%] flex gap-4 items-center text-xl font-normal">
          <BsSearch style={{ color: "#22c55e" }} />
          No stocks filtered
        </div>
      ) : (
        <div style={{ height: searchedStock.length * totalItemHeight, position: "relative" }}>
          {visibleStocks.map((stock, index) => {
            const actualIndex = startIndex + index;
            return (
              <div
                key={actualIndex}
                className="flex flex-row gap-12 border-[1px] p-2 rounded-lg border-gray-800 m-2 absolute w-full"
                style={{
                  top: actualIndex * totalItemHeight,
                  height: rowHeight,
                }}
              >
                <span
                  className={`text-lg font-semibold ${
                    stock.exch_seg === "NSE"
                      ? "text-green-500"
                      : stock.exch_seg === "BSE"
                      ? "text-red-500"
                      : "text-gray-600"
                  } uppercase`}
                >
                  {stock.exch_seg}
                </span>
                <span className="text-lg font-semibold text-white uppercase basis-1/2">
                  {stock.symbol?.match(/[a-zA-Z]+|[0-9]+/g)?.join(" ")}
                </span>
                <button
                  onClick={() => dispatch(thunkFunc(stock))}
                  className="w-10 h-10 ml-auto text-2xl text-green-500 border-2 border-green-500"
                >
                  +
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
