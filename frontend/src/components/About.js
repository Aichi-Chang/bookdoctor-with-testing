import React, { useState, useEffect } from 'react'
import LazyHero from 'react-lazy-hero'
import Navbar from './Navbar'
import 'bulma'

import axios from 'axios'
// import { Link } from 'react-router-dom'

// import AboutStats from './AboutStats' 

export default function About() {

  const [article, setArticle] = useState('')

  const URL = 'http://www.nhs.uk'
  
  useEffect(() => {
    axios.get('https://api.nhs.uk/conditions/coronavirus-covid-19?url=bookdoctorsappointments.com&modules=false')
      .then(res => setArticle(res.data))
  }, []) 
    
  
  // console.log(article)

  return (
    <div>
      <Navbar />
      <LazyHero
        imageSrc="https://i.imgur.com/LcwSFCg.jpg" 
        parallaxOffset={100} 
        opacity={0.6}
        minHeight={'140vh'}
        style={{ overflow: 'hidden' }}>
        {/* <h1 className='title'>Stay Home | Save Lives</h1> */}
        <h3 className='title'>We care about Public Health.</h3>
        {/* <p className='content'></p> */}

        <p className='content'>Find out more on how to keep yourself and your family safe</p>
      </LazyHero>

      <div className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile">
            <div className="tile is-parent is-vertical">

              <article className="tile is-child notification">
                <p className="content">We've accumilated all the information you need to know from leading health authorities, so you can concentrate on taking care of yourself, your family and your friends.</p>
                <p className="title">Coronavirus Explained</p>
                <p className="subtitle">{article.headline}</p>
                <p className="subtitle">{article.text}</p>

                <div>
                  {article.itemListElement && article.itemListElement.map((info, i)=> {
                    return <p key={i}>{info.name}</p> 
                  }
                  )}
                </div>

                <div>
                  {article.hasPart && article.hasPart.map((info, i)=> {
                    return <p key={i}>{info.description}</p> 
                  }
                  )}
                </div>

                {/* <figure className="image is-4by3">
                  <img src="https://i.imgur.com/6WnBISG.jpg" />
                </figure> */}

              </article>


              <article className="tile is-child notification">
                
                <p className="title"><a href="https://www.gov.uk/guidance/travel-advice-novel-coronavirus" target="_blank" rel="noreferrer">GOV.UK: Coronavirus advice for travellers- should I tell my GP Im going away?</a></p>


                <p className="title"><a href="https://www.gov.uk/government/publications/coronavirus-action-plan">GOV.UK: Coronavirus Action Plan</a></p>

                {/* new block for doctors? */}
                {/* <p className="subtitle">Information For Health Professionals</p> */}
     
            

                <div>
                  {article.mainEntityOfPage && article.mainEntityOfPage[0].mainEntityOfPage.map((info, i)=> {
                    return <div className="title" key={i}>  
                      <a href={URL + info.url} target="_blank" rel="noreferrer">{info.headline}</a>
                      <p className="subtitle">
                        {info.text}</p>
                    </div>
                  }
                  )}
                </div>


{/* this works but cant access the arrays inside these - ie Advice in other parts of the UK etc, need to access the links for the headlines */}
                {/* <p>
                  {article.mainEntityOfPage && article.mainEntityOfPage[1].map((info, i)=> {
                    return <p className="title" key={i}>  
                      <a href={URL + info.url} target="_blank" rel="noreferrer">{info.headline.replace(/<[^>]*>/g, ' ')}</a>
                      <p className="subtitle">
                        {info.text}</p>
                    
                    </p>
                  } 
                  )}
                </p> */}

   

               
                <p className="subtitle">Where can I find more information?</p>
                <p className="subtitle">{article.description}</p>
                <p><a href={article.url} target="_blank" rel="noreferrer">NHS Resources here</a></p>

             

              </article>
            </div>

            <div className="tile is-parent">
              <article className="tile is-child notification">
                <p className="title">
                  The Importance of Selfcare
                </p>
                <div className="content">
                  <p className="subtitle"> {article.hasPart && article.hasPart[3].text.replace(/<[^>]*>/g, ' ')}</p>
                  <p className="subtitle"> <a href={article.hasPart && article.hasPart[3].url} target="_blank" rel="noreferrer">Find out more on Selfcare</a></p>
                </div>

                <figure className="image is-4by7">
                  <img src="https://i.imgur.com/KbkSHZJ.jpg" />
                </figure>
                <p id="healthybody" className="title">Healthy body</p>
                <p className="subtitle">Get some practical information and advice for keeping your body in tip-top health.</p><a href="https://www.nhs.uk/live-well/healthy-body/">More info</a> 
              
                <figure id="yogapic" className="image is-4by7">
                  <img src="https://i.imgur.com/gZ5AHPQ.jpg" />
                </figure>
              
              </article>
            </div>
          </div>
         
          <div className="tile is-parent">
            <article className="tile is-child notification">
              <p className="title">Symptoms</p>

              {/* //trying to access the second haspart object */}
              <div className="content">
              
                {/* <p className="subtitle">{article.hasPart && article.hasPart[1].description}</p> */}
                <p className="subtitle">{article.hasPart && article.hasPart[1].text.replace(/<[^>]*>/g, ' ')}</p>
                
                <p><a href={article.hasPart && article.hasPart[1].url} target="_blank" rel="noreferrer">More info here</a></p>
              </div>
             
              {/* <figure className="image is-4by3">
                <img src="https://i.imgur.com/aOroNmZ.jpg" />
              </figure> */}
    
            </article>
          </div>
        </div>
        <div className="tile is-parent">
          <article id="statcolumn" className="tile is-child notification">
            <div className="content">
              
              <div className="flexBox">

                <p id="statwidth" className="title">
                  <img id="alert" src="https://i.imgur.com/5zpIWWB.gif"></img>
                  Live UK Stats 
                </p>

              </div>
              {/* <AboutStats /> */}
                
        
              <div className="content">
        
                {/* full article works more information on covid: */}
                {/* <p>
                  {article.hasPart && article.hasPart.map((info, i)=> {
                    return <p key={i}>{info.text.replace(/<[^>]*>/g, '')}</p> 
                  }
                  )}
                </p> */}
               
                         
                <p id="prevention" className="title">Prevention</p>
                <p className="subtitle"> {article.hasPart && article.hasPart[5].description.replace(/<[^>]*>/g, ' ')}</p>
                <p className="subtitle"> {article.hasPart && article.hasPart[5].text.replace(/<[^>]*>/g, ' ')}</p>
                <p>NHS guidelines for more information, on prevention </p><a href={article.hasPart && article.hasPart[5].url} target="_blank" rel="noreferrer">here</a>

                <p id="treatments" className="title">Treatments</p>
                <p className="subtitle"> {article.hasPart && article.hasPart[4].text.replace(/<[^>]*>/g, ' ')}</p>

                <figure className="image is-4by7">
                  <img src="https://i.imgur.com/6WnBISG.jpg" />
                </figure>
              </div>
            </div>
          </article>
        </div>
      </div>

    </div>
  )
}



// export default About 