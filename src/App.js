import {Component} from 'react'

import TravelList from './components/TravelList'
import Loader from 'react-loader-spinner'

import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class App extends Component {
  state = {activeApiStatus: apiStatusConstants.initial, travelGuideList: []}

  componentDidMount() {
    this.getTravelGuideDetails()
  }

  getTravelGuideDetails = async () => {
    this.setState({activeApiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {method: 'GET'}

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        description: each.description,
        imageUrl: each.image_url,
      }))
      this.setState({
        activeApiStatus: apiStatusConstants.success,
        travelGuideList: updatedData,
      })
    } else {
      this.setState({activeApiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {travelGuideList} = this.state
    return (
      <ul className="list-container">
        {travelGuideList.map(each => (
          <TravelList key={each.id} listDetails={each} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <h1 className="page-not-found"> Page Not Found</h1>
    </div>
  )

  renderApiStatus = () => {
    const {activeApiStatus} = this.state
    switch (activeApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="main-heading">Travel Guide</h1>
        <hr className="hr-line" />
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default App
