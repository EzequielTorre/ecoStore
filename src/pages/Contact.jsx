import { useState } from "react";
import "../styles/global.css";
import "../styles/FormStyles.css";
import emailjs from "emailjs-com";
import { BsEnvelopeAt } from "react-icons/bs";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_e4w6yq6", // Tu service_id
        "template_uioty1b", // Tu template_id
        e.target, // El form
        "5RXaPt-wwPqC7u8Nw" // Tu public_key
      )
      .then(() => {
        alert("¡Mensaje enviado con éxito! Pronto nos pondremos en contacto.");
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
      })
      .catch((error) => {
        alert(`Error al enviar el mensaje: ${error.text || error.message}`);
        setLoading(false);
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <Helmet>
        <title>EcoTienda | Productos ecológicos</title>
        <meta
          name="description"
          content="EcoTienda: Venta de productos de limpieza ecológicos para el hogar y la empresa."
        />
        <meta
          name="keywords"
          content="ecotienda, limpieza ecológica, productos ecológicos, tienda online, hogar, empresa"
        />
        <meta property="og:title" content="EcoTienda | Productos ecológicos" />
        <meta
          property="og:description"
          content="Venta de productos de limpieza ecológicos para el hogar y la empresa."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="nature-background" />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="form-center-container">
          <div className="form-card">
            <h2
              className="form-title"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2980b9"
              }}
            >
              <BsEnvelopeAt style={{ fontSize: "2rem", marginRight: "10px", fontWeight: 700, color: "#2980b9" }} />
              Contacto
            </h2>
            <h4 style={{ marginTop: 8, color: "#2c3e50", textAlign: "center" }}>
              ¡Queremos saber de ti!
            </h4>
            <p
              style={{
                margin: "1rem 0 2rem 0",
                color: "#444",
                textAlign: "center",
              }}
            >
              Bienvenido a <b>EcoTienda</b>, tu ecommerce de confianza para la
              venta de productos de limpieza ecológicos.
              <br />
              Nos dedicamos a ofrecer soluciones amigables con el medio ambiente
              para tu hogar y empresa.
              <br />
              Si tienes dudas, sugerencias o quieres realizar un pedido
              especial, completa el siguiente formulario y te responderemos a la
              brevedad.
            </p>
            <form
              onSubmit={handleSubmit}
              className="form-styled"
              aria-label="Formulario de contacto"
            >
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="Tu correo"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input"
                  placeholder="Mensaje"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  style={{ resize: "vertical" }}
                />
              </div>
              <button
                className="form-btn"
                type="submit"
                disabled={loading}
                aria-label="Enviar mensaje"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
            <div
              style={{
                marginTop: 32,
                fontSize: 14,
                color: "#888",
                textAlign: "center",
              }}
            >
              También puedes escribirnos directamente a:{" "}
              <b>ezequiel.torres0682@gmail.com</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
