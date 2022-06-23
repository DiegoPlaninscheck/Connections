import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleData();
  }, [])

  async function handleData() {
    const { data } = await axios.get("http://localhost:8080/users")
    setData(data);
  }

  return (
    <>
      <ul>
          {data.map(user => {
            return (
              <li key={user.id}>
                {user.firstName}
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default App
