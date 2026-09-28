import RegistrationForm from './form.jsx'
import './app.css'

function App() {
  return (
    <div className="page">
      <div className="card">
        <header className="card-header">
          <h1>Form Validation</h1>
          <p>Personal &amp; Identity Details</p>
        </header>

        <RegistrationForm />
      </div>
    </div>
  )
}

export default App
