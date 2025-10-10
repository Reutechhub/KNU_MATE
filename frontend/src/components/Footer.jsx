const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-secondary text-white py-4 fixed-bottom" style={{background: 'linear-gradient(90deg, #000000ff 0%, #2c105aff 100%)'}}>
      <div className="container d-flex justify-content-center align-items-center text-center">
        <div>
          <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}> MATERIALS AT HAND</h6>
          <small style={{ fontSize: '0.7rem' }}><>Designed by REUTECH HUB INNOVATIONS</></small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
