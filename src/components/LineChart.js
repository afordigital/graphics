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
  maintainAspectRatio: true,
  aspectRatio: 2,
  responsive: true,
  align: 'right',
  scales: {
    x: {
      afterFit (axis) {
        const ticks = axis.getTicks()
        ticks.push({ value: axis.max, label: '100%' })
      },
      ticks: {
        callback: function (val, index) {
          return parseInt((val / 122) * 0.8) + '%'
        },
        maxTicksLimit: 5
      },
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
      ticks: {
        callback: function (val, index) {
          return this.getLabelForValue(val) / 10 + '%'
        },
        maxTicksLimit: 6
      },
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
    let Line = []
    for (let i = 0; i < PostData.x.length; i++) {
      Line.push(parseInt((i * 100) / 1798))
    }

    const labels = PostData.x

    return {
      datasets: [
        {
          label: 'Sin Modelo',
          data: Line,
          tension: 0.3,
          borderColor: '#70d5b3',
          pointRadius: 1,
          backgroundColor: 'rgb(112, 213, 179, 0.25)'
        },

        {
          label: 'Con Modelo',
          data: PostData.y,
          tension: 0.3,
          borderColor: '#4182f8',
          pointRadius: 1,
          backgroundColor: 'rgb(65, 130, 248, 0.3)'
        }
      ],
      labels
    }
  }, [])

  return <Line data={data} options={options} />
}
