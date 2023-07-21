import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Perfil from '../About/Perfil.jpeg';
function About() {
  return (
    <div className="box">
      <div className="img">
        <img src={Perfil} alt=""/>
      </div>
      <h2 className="p">Maia Riaboy Pujadas<span>24 años. Contadora y estudiante de Full Stack Web Developer</span></h2>
      <div className="links">
        <a href="https://www.linkedin.com/in/maia-riaboy-pujadas-39379520a/"><img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/svgs/brands/linkedin.svg" alt="LinkedIn"/></a>
        <a href="https://github.com/maiariaboypujadas"><img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/svgs/brands/github.svg" alt="GitHub"/></a>
      </div>
      <div>
        <Link to="/home">BACK GO</Link>
      </div>
    </div>
  );
}

export default About;