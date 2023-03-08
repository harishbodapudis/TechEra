import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const Technology = props => {
  const [techData, setTechData] = useState(null)
  const [status, setStatus] = useState('LOADING')

  useEffect(() => {
    const {match} = props
    const {params} = match
    const {id} = params
    console.log(id)

    const getDetails = async () => {
      try {
        const url = `https://apis.ccbp.in/te/courses/${id}`
        const options = {
          method: 'GET',
        }
        const res = await fetch(url, options)
        const data = await res.json()
        const langData = data.course_details
        const details = {
          id: langData.id,
          name: langData.name,
          imageUrl: langData.image_url,
          description: langData.description,
        }
        setTechData(details)
        setStatus('SUCCESS')
      } catch (e) {
        console.log('hello..')
        console.log(e)
        setStatus('FAILURE')
      }
    }

    getDetails()
    console.log(techData)
  }, [status])

  const renderFailurePage = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={() => setStatus('LOADING')}
        className="failure-view-btn"
      >
        Retry
      </button>
    </div>
  )
  const renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height={50} width={50} />
    </div>
  )

  const renderSuccessOutput = () => (
    <div className="display-box">
      <img src={techData.imageUrl} alt={techData.name} className="img-block" />
      <div className="details-box">
        <h1 className="details-heading">{techData.name}</h1>
        <p className="details-para">{techData.description}</p>
      </div>
    </div>
  )

  const renderOutput = () => {
    switch (status) {
      case 'SUCCESS':
        return renderSuccessOutput()
      case 'FAILURE':
        return renderFailurePage()
      default:
        return renderLoader()
    }
  }

  return (
    <div>
      <Header />
      <div className="details-container">{renderOutput()}</div>
    </div>
  )
}

export default Technology
