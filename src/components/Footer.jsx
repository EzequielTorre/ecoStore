import { FaGithub, FaInstagram, FaFacebook, FaEnvelope, FaBookOpen } from 'react-icons/fa';

// Mi componente footer:
const Footer = () => (
  <footer className="footer" style={{
    color: '#fff',
    padding: '2rem 0',
    textAlign: 'center',
    marginTop: '2rem'
  }}>
    <div style={{ marginBottom: '1rem' }}>
      <a href="https://github.com/EzequielTorre" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 1rem', fontSize: '1.5rem' }}>
        <FaGithub />
      </a>
      <a href="https://www.instagram.com/ezequielmauriciotorres/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 1rem', fontSize: '1.5rem' }}>
        <FaInstagram />
      </a>
      <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 1rem', fontSize: '1.5rem' }}>
        <FaFacebook />
      </a>
      <a href="/contact" style={{ color: '#fff', margin: '0 1rem', fontSize: '1.5rem' }}>
        <FaEnvelope />
      </a>
      <a
        href="/README.md"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#fff', margin: '0 1rem', fontSize: '1.5rem' }}
        aria-label="Ver README de la app"
      >
        <FaBookOpen />
      </a>
    </div>
    <p style={{ margin: 0 }}>© {new Date().getFullYear()} ecoTienda. Todos los derechos reservados.</p>
  </footer>
);

export default Footer;