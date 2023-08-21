import React, { useEffect, useState } from 'react';

import PieChartComponent from '../charts/PieChartComponent';
import ChartComponent from '../charts/ChartComponent';
import ColumnChartComponent from '../charts/ColumnChartComponent';
import './Dashboard.css';

import { getAllClients, getAllVendors, getAllClientsWithDate, getAllVendorsWithDate } from '../../service/InvoiceService';
import { Navigate } from 'react-router-dom';

import { getUserByUserId } from '../../service/UserService';
import { auth } from '../../config';

const Dashboard = () => {
  const [isMobile1, setIsMobile1] = useState(false);

  const myMap = new Map();
  const myMap2 = new Map();

  const [sales_data, setSalesData] = useState([[]]);
  const [purchase_data, setPurchaseData] = useState([[]]);

  const [totalPurchaseGst, setTotalPurchaseGst] = useState(0);
  const [totalSalesGst, setTotalSalesGst] = useState(0);

  const [monthlyPurchase, setMonthlyPurchase] = useState(0);
  const [monthlyData, setMonthlyData] = useState([[]]);

  const [groupId, setGroupId] = useState('');

  let mdata = [
    ["Month", "Purchase", "Sales"],
    ["Apr", 0, 0],
    ["May", 0, 0],
    ["June", 0, 0],
    ["July", 0, 0],
    ["Aug", 0, 0],
    ["Sept", 0, 0],
    ["Oct", 0, 0],
    ["Nov", 0, 0],
    ["Dec", 0, 0], 
    ["Jan", 0, 0], 
    ["Feb", 0, 0], 
    ["Mar", 0, 0]  
  ];
  let purchaseGst = 0;
  let salesGst = 0;


  const getSalesGst = (res) => {
    myMap.clear();
    myMap.set('Client', 'Total Sales');
    salesGst = 0;
    setTotalSalesGst(0);
    res.map((result) => {
      if (myMap.has(result.compName)) {
        myMap.set(result.compName, parseInt(myMap.get(result.compName)) + parseInt(result.totalPrice));
      } else {
        myMap.set(result.compName, parseInt(result.totalPrice));
      }
      salesGst = salesGst + parseInt(result.cgst) + parseInt(result.sgst);
      // console.log("salesGst :" + salesGst);
    })
    setTotalSalesGst(salesGst);
    // console.log("Total Sale" + totalSalesGst);
    setSalesData(Array.from(myMap.entries()));
    // console.log("sales_data")
    // console.log(sales_data)
  }

  const getClients = async () => {
    const res = await getAllClients(groupId);
    // console.log("res");
    // console.log(res);
    getSalesGst(res);

  }

  const getPurchaseGst = (res) => {
    myMap2.clear();
    myMap2.set('Purchase', 'Total Purchase');
    purchaseGst = 0;
    res.map((result) => {
      if (myMap2.has(result.compName)) {
        myMap2.set(result.compName, parseInt(myMap2.get(result.compName)) + parseInt(result.totalPrice));
      } else {
        myMap2.set(result.compName, parseInt(result.totalPrice));
      }
      purchaseGst = purchaseGst + parseInt(parseInt(result.cgst) + parseInt(result.sgst));
      // console.log("purchaseGst :" + purchaseGst);
    })
    setTotalPurchaseGst(purchaseGst);
    setPurchaseData(Array.from(myMap2.entries()));
  }

  const getVendors = async () => {
    const res = await getAllVendors(groupId);
    // console.log("vendors");
    // console.log(res);
    getPurchaseGst(res);

  }

  const getMonthlyData = async () => {
    const d = new Date();//2023-04-17
    // console.log("Date")
    const y = d.getFullYear();
    const m = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    let currentDate = y + "-" + m + "-" + day;
    let startDate = "2023-04-01";

    // console.log(d);
    // console.log(currentDate);//+"-"+d.getMonth()+"-"+d.getDate()
    let clients = await getAllClientsWithDate(groupId, startDate, currentDate);
    let vendors = await getAllVendorsWithDate(groupId, startDate, currentDate);
    if (clients.length === 0 && vendors.length === 0) {
      startDate = (parseInt(startDate.slice(0, 4)) - 1) + startDate.slice(4);
      currentDate = (parseInt(currentDate.slice(0, 4)) - 1) + currentDate.slice(4);
      clients = await getAllClientsWithDate(groupId, startDate, currentDate);
      vendors = await getAllVendorsWithDate(groupId, startDate, currentDate);
      console.log("showing previous year data ")
      console.log(startDate)
      console.log(currentDate)
    }

    // const clients2 = await getAllClients(groupId);

    // const vendors2 = await getAllVendors(groupId);
    // console.log("test");
    // console.log(clients);
    // console.log(clients2);
    // // console.log(vendors);

    clients.map((client) => {
      const d = new Date(client.date);
      // console.log(d.getMonth(), d);
      if (d.getMonth() > 2) {
        mdata[d.getMonth() - 2][2] = mdata[d.getMonth() - 2][2] + parseInt(client.totalPrice);
      } else {
        mdata[d.getMonth() + 8][2] = mdata[d.getMonth() + 8][2] + parseInt(client.totalPrice);
      }
    })
    vendors.map((vendor) => {
      const d = new Date(vendor.date);
      // console.log(d.getMonth(), d);
      mdata[d.getMonth() - 2][1] = mdata[d.getMonth() - 2][1] + parseInt(vendor.totalPrice);

    })

    // console.log(clients)
    // console.log(vendors)
    setMonthlyData(mdata);
    // console.log("mdata")
    // console.log(mdata)
  }
  useEffect(() => {
    const updateGroupId = auth.onAuthStateChanged(async (user) => {
      if (user !== null) {
        const response = await getUserByUserId(user.uid);
        setGroupId(response[0].groupId);
      }
      else {
        <Navigate to={'/'} />;
      }
    });
    updateGroupId();
    getClients();
    getVendors();
    getMonthlyData();

  }, [groupId])





  // const sales_data2 = [
  //   ['Client', 'Total Sales'],
  //   ['CHANDRA ENGINEERING', 33600],
  //   ['CHANDRA ENGINEERING', 500],
  //   ['CTR EXPORT', 187264],
  //   ['CTR MFG', 2813861.12],
  //   ['SRC Roll Forming', 36522.08],
  //   ['SWAJIT ABRASIVES', 56295.68],
  //   ['VENDERE', 552471.36]
  // ]; 
  // console.log("predefined data  ");
  // console.log(sales_data2);


  const sales_options = {
    title: "Sales",
    titleTextStyle: {
      color: 'white',
      fontSize: 18
    },
    legend: {
      textStyle: {
        color: 'white'
      }
    },
    pieSliceText: 'value',
    sliceVisibilityThreshold: 0,
    backgroundColor: 'transparent',
    chartArea: {
      borderRadius: 20,
    },
  };

  // const purchase_data = [
  //   ['Vendor', 'Total Purchase'],
  //   ['KANAK TRADERS', 1181818],
  //   ['SHREE TULJA ENTERPRISES', 48375],
  //   ['EUREKA FORBES', 21040],
  //   ['HARIOM PLYWOOD', 51295],
  //   ['SHRI MAHALAXMI HARDWARE & PAINTS', 78720],
  //   ['Kamdhenu Machinery and Spares', 46000],
  //   ['NA THANI CABLES & ELECTRICALS', 4945],
  //   ['Vaibhav Machinery&Tools', 23600],
  //   ['S. S. TRADERS', 173219],
  //   ['Shivam Ply Shopee', 29917],
  // ];

  const purchase_options = {
    title: "Purchase",
    titleTextStyle: {
      color: 'white',
      fontSize: 18
    },
    legend: {
      textStyle: {
        color: 'white'
      }
    },
    pieSliceText: 'value',
    sliceVisibilityThreshold: 0,
    backgroundColor: 'transparent',
    chartArea: {
      borderRadius: 20,
    },
  };


  // console.log("Purchase Gst" + totalPurchaseGst)
  // console.log("sales gst" + totalSalesGst)
  const gst_data = [
    ['GST', 'Amount'],
    ['Purchase GST', totalSalesGst],
    ['Sales GST', totalPurchaseGst],
  ]

  const gst_options = {
    title: "GST",
    titleTextStyle: {
      color: 'white',
      fontSize: 18
    },
    legend: {
      textStyle: {
        color: 'white'
      }
    },
    pieSliceText: 'value',
    sliceVisibilityThreshold: 0,
    backgroundColor: 'transparent',
    chartArea: {
      borderRadius: 20,
    },
  };

  // monthlyData[1][1]=monthlyPurchase;
  // const monthly_data = monthlyData;
  const monthly_data = [
    ["Month", "Purchase", "Sales"],
    ["Jan", 28560.52, 34898.4],
    ["Feb", 33485.32, 29328],
    ["Mar", 25131.5, 49007.52],
    ["Apr", 28560.52, 34898.4],
    ["May", 33485.32, 29328],
    ["June", 25131.5, 49007.52],
    ["July", 1437.6, 39525.12],
    ["Aug", 39517.88, 54608.4],
    ["Sept", 113466.28, 37743.96],
    ["Oct", 125647.28, 32316.36],
    ["Nov", 13685.68, 79371.36],
    ["Dec", 13685.68, 39288.12],
  ];

  const monthly_options = {
    title: "Monthly Purchase and Sales",
    titleTextStyle: {
      color: 'white',
      fontSize: 18
    },
    legend: {
      textStyle: {
        color: 'white'
      }
    },
    backgroundColor: 'transparent',
    chartArea: {
      borderRadius: 20,
    },

    hAxis: {
      textStyle: {
        color: 'white'
      }
    },

    vAxis: {
      textStyle: {
        color: 'white'
      }
    }

  };


  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>DASHBOARD</h2>
        <h4>Welcome to the dashboard</h4>
      </div>
      <div
        className={
          isMobile1 ? 'dashboard-links-mobile' : 'dashboard ms-auto'
        }
        onClick={() => setIsMobile1(true)}
      >
        <div className="main-container">
          <div className="dash-container1">
            {/* {console.log("sales_data")}
            {console.log(sales_data)} */}
            <PieChartComponent
              data={sales_data} options={sales_options} />
          </div>
          <div className="dash-container2">
            <PieChartComponent
              data={purchase_data}
              options={purchase_options}
            />
          </div>
          <div className="dash-container3">
            <PieChartComponent data={gst_data} options={gst_options} />
          </div>
          <div className="dash-container4">
            {/* {console.log("Data in react")}
            {console.log(monthly_data)}
          {console.log(monthly_data2)} */}
            {/* {console.log("Data in react")}
          {console.log(monthlyData)} */}

            <ColumnChartComponent
              data={monthlyData}
              options={monthly_options}
              width="919px"
              height="426px"
            />
          </div>
          {/*<div className="dash-container5"></div>*/}
          {/*<div className="dash-container6"></div>*/}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
