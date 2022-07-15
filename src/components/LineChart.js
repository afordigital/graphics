import { useMemo } from 'react'
import PostData from '../data/json1.json'

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

let occurrenceMapSort = []

const options = {
  fill: true,
  responsive: true,
  align: 'right',
  scales: {
    x: {
      max: 854,
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
          size: window.innerWidth > 400 ? 20 : 14
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
          size: window.innerWidth > 400 ? 20 : 14
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
        text: 'Gráfico 1',
        font: {
          family: 'Montserrat',
          size: window.innerWidth > 400 ? 20 : 14
        }
      },
      subtitles: {
        display: true,
        font: {
          family: 'Montserrat',
          size: window.innerWidth > 400 ? 20 : 14
        }
      }
    },
    padding: { top: 50, left: 0, right: 0, bottom: 0 }
  }
}

export default function LineChart () {
  const data = useMemo(function () {
    const arrayx = PostData.x.filter((item, index) => index < PostData.cut_1)
    const cutArrayx = PostData.x.filter(
      (item, index) => PostData.cut_1 < index < PostData.cut_2
    )
    const arrayy = PostData.y.filter((item, index) => index < PostData.cut_2)

    const jsonInput = PostData.y

    // Esta función devuelve cuántas veces aparece un dato en el vector y
    const occurrenceMap = Object.values(jsonInput).reduce((finalMap, item) => {
      finalMap[item] = ++finalMap[item] || 1

      return finalMap
    }, {})

    let model_arrayx = []

    let occurrenceMapArray = Object.keys(occurrenceMap).map(function (key) {
      return occurrenceMap[key]
    })

    occurrenceMapSort = occurrenceMapArray.sort(function (a, b) {
      return a - b
    })

    console.log(occurrenceMapSort)

    const arrayxPercentage = arrayx.map(element =>
      parseInt((element * 100) / PostData.cut_1)
    )

    const labels = cutArrayx

    return {
      datasets: [
        {
          label: 'Sin Modelo',
          data: labels,
          tension: 0.3,
          borderColor: '#4182f8',
          pointRadius: 1,
          backgroundColor: 'rgb(65, 130, 248, 0.3)'
        },

        {
          label: 'Con Modelo',
          data: occurrenceMapSort,
          tension: 0.3,
          borderColor: '#70d5b3',
          pointRadius: 1,
          backgroundColor: 'rgb(112, 213, 179, 0.25)'
        }
      ],
      labels
    }
  }, [])

  return <Line data={data} options={options} />
}
