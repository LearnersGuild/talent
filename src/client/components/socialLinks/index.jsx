import React from 'react';
import './index.css';

const Link = (props) => {
  const imageSrc = `/Logos/${props.type}.svg`;
  return (
    <a target="_blank" href={props.href}>
      <img className="social-logo" src={imageSrc} alt={`${props.type}-logo`} />
    </a>
  );
};

export default function (props) {
  const githubLink = `https://github.com/${props.github}`;
  const linkedinLink = `https://www.linkedin.com/in/${props.linkedin}`;
  const twitterLink = `https://twitter.com/${props.twitter}`;

  return (
    <div className="social-logos text-center">
      <Link href={linkedinLink} type="linkedin" />
      <Link href={githubLink} type="github" />
      <Link href={twitterLink} type="twitter" />
    </div>
  );
}
