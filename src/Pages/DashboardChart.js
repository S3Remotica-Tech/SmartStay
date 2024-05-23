import React from 'react';
// import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
import {CanvasJSChart} from 'canvasjs-react-charts'

// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DashboardChart = () => {
  const options = {
    animationEnabled: true,
    title: {
      text: "Number of New Customers"
    },
    axisY: {
      title: "Number of Customers"
    },
    toolTip: {
      shared: true
    },
    data: [
      {
        type: "spline",
        name: "2016",
        showInLegend: true,
        dataPoints: [
          // { y: 155, label: "Jan" },
          // { y: 150, label: "Feb" },
          // { y: 152, label: "Mar" },
          // { y: 148, label: "Apr" },
          // { y: 142, label: "May" },
          // { y: 150, label: "Jun" },
          // { y: 146, label: "Jul" },
          // { y: 149, label: "Aug" },
          // { y: 153, label: "Sept" },
          // { y: 158, label: "Oct" },
          // { y: 154, label: "Nov" },
          // { y: 150, label: "Dec" }

          { x: new Date(2017, 0, 1), y: 120 },
					{ x: new Date(2017, 1, 1), y: 135 },
					{ x: new Date(2017, 2, 1), y: 144 },
					{ x: new Date(2017, 3, 1), y: 103 },
					{ x: new Date(2017, 4, 1), y: 93 },
					{ x: new Date(2017, 5, 1), y: 129 },
					{ x: new Date(2017, 6, 1), y: 143 },
					{ x: new Date(2017, 7, 1), y: 156 },
					{ x: new Date(2017, 8, 1), y: 122 },
					{ x: new Date(2017, 9, 1), y: 106 },
					{ x: new Date(2017, 10, 1), y: 137 },
					{ x: new Date(2017, 11, 1), y: 142 }
        ]
      },
      {
        type: "spline",
        name: "2017",
        showInLegend: true,
        dataPoints: [
          // { y: 172, label: "Jan" },
          // { y: 173, label: "Feb" },
          // { y: 175, label: "Mar" },
          // { y: 172, label: "Apr" },
          // { y: 162, label: "May" },
          // { y: 165, label: "Jun" },
          // { y: 172, label: "Jul" },
          // { y: 168, label: "Aug" },
          // { y: 175, label: "Sept" },
          // { y: 170, label: "Oct" },
          // { y: 165, label: "Nov" },
          // { y: 169, label: "Dec" }


          { x: new Date(2017, 0, 1), y: 123 },
					{ x: new Date(2017, 1, 1), y: 140 },
					{ x: new Date(2017, 2, 1), y: 150 },
					{ x: new Date(2017, 3, 1), y: 110 },
					{ x: new Date(2017, 4, 1), y: 100 },
					{ x: new Date(2017, 5, 1), y: 135 },
					{ x: new Date(2017, 6, 1), y: 150 },
					{ x: new Date(2017, 7, 1), y: 160 },
					{ x: new Date(2017, 8, 1), y: 130 },
					{ x: new Date(2017, 9, 1), y: 110 },
					{ x: new Date(2017, 10, 1), y: 140 },
					{ x: new Date(2017, 11, 1), y: 150 }
        ]
      }
    ]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
      {/* <CanvasJSChart options={options} /> */}
      {/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
    </div>
  );
};

export default DashboardChart;