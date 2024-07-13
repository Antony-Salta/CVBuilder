import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import InputFields from './InputFields'
import { initialSections } from './initialSections'
import '../App.css'
import CVOutput from './CVOutput'


let currentID = 2;

function App()
{
  let initialSectionText =initialSections.map(section => {return {id : section.id, main:"", title: section.title}; });
  const [sectionText, setSectionText] = useState(initialSectionText);
    
  return(
        <div className='flex-container'>
          <div className='flex-child'>
            <InputFields sectionText={sectionText} setSectionText={setSectionText} />
          </div>
          <div className='flex-child'>
            <CVOutput sectionText={sectionText}/>
          </div>
        </div>
    )
}


/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
  */

export default App
