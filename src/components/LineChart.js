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
  scales: {
    x: { max: 400 },
    y: { min: 0 }
  },
  plugins: {
    legend: {
      display: true
    }
  }
}

export default function LineChart () {
  const data = useMemo(function () {
    const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5]
    const scores2 = [1, 2, 4, 4, 2, 3, 3, 5, 2]

    const arrayx = PostData.x.filter((item, index) => index < PostData.cut_1)
    const labels = PostData.y.filter((item, index) => index < PostData.cut_2)

    return {
      datasets: [
        {
          label: 'Mis datos',
          data: arrayx,
          tension: 0.3,
          borderColor: 'rgb(75, 192, 192)',
          pointRadius: 1,
          backgroundColor: 'rgb(75, 192, 192, 0.3)'
        }
      ],
      labels
    }
  }, [])

  return <Line data={data} options={options} />
}
