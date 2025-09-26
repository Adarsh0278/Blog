import React from 'react'
import config_variable from './config_variable/config_variable'

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">Welcome to the Blogging App</h1>
      <p>{config_variable.appwriteProjectId}</p>
    </div>
  )
}

export default App