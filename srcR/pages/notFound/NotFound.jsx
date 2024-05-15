import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="Layout__Wrapper-sc-2tn75p-0 fBYEGj">
    <div className="sc-kbdlSk lfupzh">
      <img src="/assets/images/404-error.png" alt="..." className="icon" />
      <h1>Looks like you are lost.</h1>
      <p>
        We can’t seem to find the page you are looking for. We will help you
        back to the homepage now.
      </p>
      <Link to="/" className="sc-jlZhew cKRinY text-truncate px-5 mx-auto btn--default btn btn-default">
        Back to homepage
      </Link>
    </div>
  </div>
  )
}

export default NotFound