import React, { useEffect } from 'react'
import NewNavbar from '../components/newnavbar'
import LineChart from "../components/lineChart1";
import PieChart from '../components/pieChart';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSG } from '../hooks/useSG'

import '../css/extrapages.css'

export default function Stats() {

  let url = window.location.href
  let subG = url.split('/')[3]
  let urlSubG = subG
  for (let i = 0; i < subG.length; i++) {
    if (subG[i] === '%') {
      subG = subG.substring(0, i) + ' ' + subG.substring(i + 3);
    }
  }
  // updating the data every day

  const navigate = useNavigate()
  const { getSubGDetails } = useSG()

  const Data1 = [
  ];
  const [chartData1, setChartData1] = useState({
    labels: Data1.map((data) => data.date),
    datasets: [
      {
        label: "Users Gained ",
        data: Data1.map((data) => data.numMembers),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  const [chartData2, setChartData2] = useState({
    labels: Data1.map((data) => data.date),
    datasets: [
      {
        label: "Users Gained ",
        data: Data1.map((data) => data.numMembers),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  const [chartData3, setChartData3] = useState({
    labels: Data1.map((data) => data.date),
    datasets: [
      {
        label: "Users Gained ",
        data: Data1.map((data) => data.numMembers),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  const [chartData4, setChartData4] = useState({
    labels: Data1.map((data) => data.date),
    datasets: [
      {
        label: "Users Gained ",
        data: Data1.map((data) => data.numMembers),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  useEffect(() => {
    async function getSubGChartData() {
      let objs = await getSubGDetails(subG)
      let obj = objs['subGDetails'][0]

      // first greaph
      let rqd1 = obj['membersTillNow']
      let final1 = {
        labels: rqd1.map((data) => data.date),
        datasets: [
          {
            label: "Users Gained ",
            data: rqd1.map((data) => data.numMembers),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      }
      setChartData1(final1)

      // second graph
      let rqd2 = obj['dailyPosts']
      let final2 = {
        labels: rqd2.map((data) => data.date),
        datasets: [
          {
            label: "Posts Created ",
            data: rqd2.map((data) => data.numPosts),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      }
      setChartData2(final2)

      // third graph
      let rqd3 = obj['dailyVisits']
      let final3 = {
        labels: rqd3.map((data) => data.date),
        datasets: [
          {
            label: "Visits ",
            data: rqd3.map((data) => data.numVisits),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      }
      setChartData3(final3)

      // fourth, pie chart
      let totalReports = obj['totalReports']
      let totalReportsDeleted = obj['totalReportsDeleted']
      let final4 = {
        labels: ['Not Deleted', 'Deleted'],
        datasets: [
          {
            label: "Reported vs Deleted",
            data: [totalReports - totalReportsDeleted, totalReportsDeleted],
            backgroundColor: [
              "#50AF95",
              "#f3ba2f",
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      }
      setChartData4(final4)
    }
    getSubGChartData()
  }, [])

  const goToMSG = (e) => {
    e.preventDefault()
    navigate(`/api/sg/subGreddiits/${urlSubG}`)
  }

  return (
    <>
      <div className='stats-container'>
        <NewNavbar urlSubG={urlSubG} />
        <h1 className='extra-subG-heading2' onClick={goToMSG}>SubGreddiit: {subG}</h1>
        <div className='charts-grid'>
          <LineChart text={'Growth of SubG over time'} chartData={chartData1} />
          <LineChart text={'Daily Posts'} chartData={chartData2} />
          <LineChart text={'Daily Visits'} chartData={chartData3} />
          <div className='pie-container'>
            <PieChart text={'Reported vs Deleted'} chartData={chartData4} />
          </div>
        </div>
      </div>
    </>
  )
}
