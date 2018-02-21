import React from 'react';
import './index.css';

const Link = (props) => {
  const imageSrc = `/Logos/${props.type}.svg`
  return (
    <a href={props.url}><img className="social-logo" src={imageSrc}/></a>
  )
}

export default function(props) {
  const githubLink = `https://github.com/${props.github}`
  const linkedinLink = `https://www.linkedin.com/in/${props.linkedin}`
  const twitterLink = `https://twitter.com/${props.twitter}`

  return (
    <div className='social-logos text-center'>
      <Link url={linkedinLink} type='linkedin'/>
      <Link url={githubLink} type='github'/>
      <Link url={twitterLink} type='twitter'/>
    </div>
  );
}
