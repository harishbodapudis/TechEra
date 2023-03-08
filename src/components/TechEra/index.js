import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const TechEra = () => {
  const [displayData, setDisplay] = useState('')
  const [status, setStatus] = useState('LOADING')

  useEffect(() => {
    const getData = async () => {
      try {
        const url = 'https://apis.ccbp.in/te/courses'
        const options = {
          method: 'GET',
        }

        const res = await fetch(url, options)

        const data = await res.json()
        const parasData = data.courses.map(item => ({
          id: item.id,
          logoUrl: item.logo_url,
          name: item.name,
        }))
        setDisplay(parasData)
        setStatus('SUCCESS')
      } catch (e) {
        console.log(e)
        setStatus('FAILURE')
      }
    }
    getData()
  }, [status])

  const renderDisplayItem = item => (
    <li key={item.id} className="item-box">
      <Link to={`/courses/${item.id}`} className="link-tag">
        <img src={item.logoUrl} alt={item.name} className="item-img" />
        <p className="item-heading">{item.name}</p>
      </Link>
    </li>
  )

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
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#000000" height={50} width={50} />
    </div>
  )

  const renderSuccessOutput = () => (
    <>
      <h1 className="courses-heading">Courses</h1>
      <ul className="display-item">
        {displayData ? (
          displayData.map(item => renderDisplayItem(item))
        ) : (
          <h1>loading</h1>
        )}
      </ul>
    </>
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
      <div className="tech-container">
        <>{renderOutput()}</>
      </div>
    </div>
  )
}

export default TechEra
