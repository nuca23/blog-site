import React from 'react';
function Footer() {
  return (
    <footer className='footer'>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="d-flex flex-column align-items-center ">
            <img src={require('./Images/typology_logo_invert.png')} alt="Logo" /><br />
            <p className='Meks'>by nuca <br /><span> Powered by React</span></p>.

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

