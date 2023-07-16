import React from 'react';

function About() {
  return (
    <div className="card-client">
      <div className="user-picture">
        <img src="ruta-de-tu-foto" alt="Tu nombre"/>
      </div>
      <h2 className="name-client">Maia Riaboy Pujadas<span>24 años. Contadora y estudiante de Full Stack Web Developer</span></h2>
      <div className="social-media">
        <a href="https://www.linkedin.com/in/maia-riaboy-pujadas-39379520a/"><img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/svgs/brands/linkedin.svg" alt="LinkedIn"/></a>
        <a href="https://github.com/maiariaboypujadas"><img src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/svgs/brands/github.svg" alt="GitHub"/></a>
      </div>
    </div>
  );
}

export default About;