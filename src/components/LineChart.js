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
          family: 'Arial',
          size: 24
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
          family: 'Arial',
          size: 24
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
        display: true
      }
    },
    padding: { top: 50, left: 0, right: 0, bottom: 0 }
  }
}

export default function LineChart () {
  const data = useMemo(function () {
    const arrayx = PostData.x.filter((item, index) => index < PostData.cut_1)
    const labels = PostData.y.filter((item, index) => index < PostData.cut_2)

    const jsonInput = PostData.y

    // Esta función me devuelve cuántas veces aparece un dato en el vector y
    const occurrenceMap = Object.values(jsonInput).reduce((finalMap, item) => {
      finalMap[item] = ++finalMap[item] || 1

      return finalMap
    }, {})

    const ocurrenceMapArray = Object.keys(occurrenceMap)

    let model_arrayx = []

    // Esta función crea un array de puntos x para la nueva linea dependiendo de la frecuencia con la que aparece
    // let i = 0
    // let j = 0
    // while (i < arrayx.length) {
    //   if (arrayx[i] == j) {
    //     model_arrayx.push(arrayx[i] * (ocurrenceMapArray[i] / 500 + 1))
    //   }
    //   i++
    // }

    let i = 0.0
    let j = 0.0
    while (i < arrayx.length) {
      if (arrayx[i] == j) {
        model_arrayx.push(arrayx[i] * (ocurrenceMapArray[j] / 500 + 1))
        i++
      } else {
        j++
      }
    }

    return {
      datasets: [
        {
          label: 'Sin Modelo',
          data: arrayx,
          tension: 0.3,
          borderColor: 'rgb(75, 192, 192)',
          pointRadius: 1,
          backgroundColor: 'rgb(75, 192, 192, 0.3)'
        },
        {
          label: 'Con Modelo',
          data: model_arrayx,
          tension: 1,
          borderColor: 'green',
          pointRadius: 1,
          backgroundColor: 'rgb(0, 255, 0, 0.3)'
        }
      ],
      labels
    }
  }, [])

  return <Line data={data} options={options} />
}
