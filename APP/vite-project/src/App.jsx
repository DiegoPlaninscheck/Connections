import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    handleFetch()
  }, [])

  async function handleFetch(){
    const {data} = await axios.get("http://localhost:8080/users")
    setData(data);
  }

  return (
    <>
    <ul>

      {data.map(user => {
        return (
          <li key={user.id}>
            <h1>{user.firstName}</h1>
          </li>
        )
      })}
    </ul>
    </>
  )
}

export default App
