import './App.css'
import LineChart from './components/LineChart'

function App () {
  return (
    <div>
      <div className=' w-1/2 max-w-4xl mx-auto pt-24'>
        <h2 className='flex justify-center text-4xl pb-12 extrabold'>
          Primer Gráfico
        </h2>
        <LineChart />
        <h2 className='flex justify-center text-4xl py-12 extrabold'>
          Segundo Gráfico
        </h2>
        <div className='pb-28'>
          <LineChart />
        </div>
      </div>
    </div>
  )
}

export default App
