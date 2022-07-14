import './App.css'
import LineChart from './components/LineChart'
import LineChart2 from './components/LineChart2'

function App () {
  return (
    <div className='bg-[#f5f5f5] font-Montserrat'>
      <div className='max-w-4xl mx-auto py-24 space-y-8'>
        <div className='bg-white p-2 lg:p-12 rounded-2xl drop-shadow-lg'>
          <LineChart />
        </div>
        <div className='bg-white p-2 lg:p-12 rounded-2xl drop-shadow-lg'>
          <div>
            <LineChart2 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
