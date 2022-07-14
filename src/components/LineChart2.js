import { useMemo } from 'react'
import PostData2 from '../data/json2.json'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const options = {
  fill: true,
  responsive: true,
  align: 'right',
  scales: {
    x: {
      max: 400,
      grid: {
        drawBorder: false,
        color: 'rgba(10, 10, 10, 0.03)'
      },
      title: {
        display: true,
        text: 'Leads Tratados',
        color: '#1a1a1a',
        font: {
          family: 'Montserrat',
          size: window.innerWidth > 400 ? 24 : 14
        },
        padding: { top: 20, left: 0, right: 0, bottom: 0 }
      }
    },
    y: {
      min: 0,
      grid: {
        drawBorder: false,
        color: 'rgba(10, 10, 10, 0.03)'
      },
      title: {
        display: true,
        text: 'Conversiones',
        color: '#1a1a1a',
        font: {
          family: 'Montserrat',
          size: window.innerWidth > 400 ? 24 : 14
        },
        padding: { top: 0, left: 0, right: 0, bottom: 20 }
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        usePointStyle: true
      },
      align: 'end',
      title: {
        display: true,
        text: 'Gráfico 2',
        font: {
          family: 'Montserrat',
          size: window.innerWidth > 400 ? 24 : 14
        }
      }
    }
  }
}

export default function LineChart () {
  const data = useMemo(function () {
    const points = PostData2.x
    const realData = PostData2.real
    const predictedData = PostData2.predicted
    const average = PostData2.average
    const lift = PostData2.lift

    const labels = points

    return {
      datasets: [
        {
          label: 'Predicción',
          data: predictedData,
          tension: 0,
          borderColor: '#4182f8',
          pointRadius: 6,
          backgroundColor: 'rgb(65, 130, 248, 0)'
        },
        {
          label: 'Real',
          data: realData,
          tension: 0,
          borderColor: '#70d5b3',
          pointRadius: 6,
          backgroundColor: 'rgb(112, 213, 179, 0)'
        }
      ],
      labels
    }
  }, [])

  return <Line data={data} options={options} />
}
