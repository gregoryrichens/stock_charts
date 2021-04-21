import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import _ from "lodash/fp";

import { dummyData } from "../dummyData";
import alphaFetch from "../controllers/alphaFetch";

const formatData = (timeSeries) => {
  const returnArray = [];
  for (let key in timeSeries) {
    let unformattedDate = key;
    let price = Number(timeSeries[key]["1. open"]);
    let formattedDate = new Date(unformattedDate);
    // converts date to a unix timestamp in ms
    returnArray.push([formattedDate.valueOf(), price]);
  }
  return returnArray;
};

const StockChart = (ticker = "AAPL") => {
  let timeSeriesData = dummyData["Time Series (15min)"];
  let formattedData = formatData(timeSeriesData);

  // useEffect((ticker) => {
  //   const companyData = alphaFetch(ticker);
  //   console.log(companyData);
  // }, []);

  // abstract this as a function - take in ticker and some kind of calculation about up down (change line color)
  const config = {
    title: {
      // make this conditional
      text: "AAPL Stock Price",
    },
    series: [
      {
        type: "line",
        data: formattedData,
        // make this conditional
        color: "#52a674",
      },
    ],
    credits: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    rangeSelector: {
      verticalAlign: "bottom",
      allButtonsEnabled: true,
      buttonPositions: {
        align: "left",
      },
      buttonTheme: {
        // styles for the buttons
        fill: "none",
        stroke: "none",
        "stroke-width": 0,
        r: 8,
        style: {
          color: "#65727f",
        },
        state: {
          hover: {},
          select: {
            style: {
              color: "#599bef",
            },
          },
          // disabled: { ... }
        },
      },
      inputEnabled: false,
    },
    tooltip: {
      shared: true,
      split: false,
      useHTML: true,
      formatter() {
        let s =
          "<b>" +
          Highcharts.dateFormat("%H:%M", this.x) +
          "</b><br>$" +
          this.y +
          "</br>";
        return s;
      },
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
  };
  // need to pull data
  // format data with unix timestamp
  // console.log(formattedData);
  // create config object
  // render ReactHighCharts with config object
  return (
    <React.Fragment>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={config}
        ></HighchartsReact>
      </div>
    </React.Fragment>
  );
};

export default StockChart;
