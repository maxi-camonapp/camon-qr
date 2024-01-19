import { Route, Router } from "wouter"
import HomePage from "./pages/HomePage"
import QRListPage from "./pages/QRListPage"
import Sidebar from "./components/Sidebar"
import Layout from "./components/Layout"

function App() {
  return (
    <Layout>
      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/qrs-list" component={QRListPage} />
      </Router>
    </Layout>
  )
}

export default App
