import React, { useState,useEffect } from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
// import {CanvasJSChart} from 'canvasjs-react-charts'
// import CanvasJSReact from '@canvasjs/react-charts';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import { Label } from '@material-ui/icons';
import '../Pages/Dashboard.css';



const DashboardChart = () => {
  var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const state = useSelector(state => state)
     console.log("state",state)
    const dispatch = useDispatch();
    const [dashboardChart, setDashboardChart] = useState(state.PgList.dashboardDetails.Revenue_reports || []);
    const LoginId = localStorage.getItem("loginId")
    const [login_Id, setLogin_Id] = useState('')
      useEffect(() => {
        if (LoginId) {
          try{
            const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
            const decryptedIdString = decryptedData.toString(CryptoJS.enc.Utf8);
            const parsedData = Number(decryptedIdString);
            setLogin_Id(parsedData)
                  dispatch({ type: 'PGDASHBOARD', payload:{created_by:parsedData} })
                }
          
            catch(error){
          console.log("Error decrypting loginid",error);
            }
        }
  
      }, [])
      useEffect(() => {
        setDashboardChart(state.PgList.dashboardDetails.Revenue_reports || []);
      }, [state.PgList.dashboardDetails.Revenue_reports]);

     
      
      const options = {
				animationEnabled: true,	
				title:{
					text: "Revenue",
          fontSize: 20
				},
				axisY : {
					title: "Revenue"
				},
				toolTip: {
					shared: true
				},
				data: [{
					type: "spline",
					name: "Revenue",
					showInLegend: true,
          dataPoints: dashboardChart.map(data => ({ x: new Date(data.month), y: data.revenue }))
          
				},
				
      ]
		}
  return (
    <div>
       <CanvasJSChart options={options} /> 
     
    </div>
  );
};

export default DashboardChart;