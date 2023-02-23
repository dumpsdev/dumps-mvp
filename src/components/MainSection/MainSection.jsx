import React from 'react'

const MainSection = ({children,main}) => {
  return main ? <main className="animeTransition">{children}</main> : <section className="animeTransition">{children}</section>
}

export default MainSection