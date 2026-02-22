import { useState } from 'react';

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' });
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState('');

  const enviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError('');
    setExito(false);
    try {
      const res = await fetch('http://localhost:8000/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al enviar');
      setExito(true);
      setForm({ nombre: '', correo: '', mensaje: '' });
    } catch (err) {
      setError('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <div style={{
        position: "relative", minHeight: "80vh", width: "100vw",
        marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)",
        background: "url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&q=80') center/cover no-repeat fixed",
        display: "flex", alignItems: "center", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(11,17,32,0.82) 0%, rgba(30,64,175,0.68) 100%)",
          zIndex: 1
        }} />
        <div style={{
          position: "relative", zIndex: 3,
          maxWidth: "var(--max-width)", margin: "0 auto",
          padding: "0 2rem", width: "100%"
        }}>
          <h1 style={{
            fontSize: "clamp(2.4rem, 5.5vw, 3.4rem)", fontWeight: "800",
            color: "white", marginBottom: "1rem",
            textShadow: "0 6px 30px rgba(0,0,0,0.6)", lineHeight: 1.1
          }}>Contáctanos</h1>
          <p style={{
            fontSize: "clamp(1.05rem, 2.8vw, 1.25rem)", color: "#e0f2fe",
            maxWidth: "680px", lineHeight: 1.65, textShadow: "0 3px 15px rgba(0,0,0,0.5)"
          }}>
            Estamos aquí para escucharte y acompañarte con calidez y comprensión. Tu mensaje es importante.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 4, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 140" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
            <defs>
              <linearGradient id="c1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0c4a6e" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
              <linearGradient id="c2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e40af" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <path d="M0,50 Q360,20 720,55 Q1080,80 1440,45 L1440,140 L0,140 Z" fill="url(#c1)" opacity="0.95">
              <animate attributeName="d" dur="24s" repeatCount="indefinite" values="M0,50 Q360,20 720,55 Q1080,80 1440,45 L1440,140 L0,140 Z;M0,65 Q360,35 720,70 Q1080,45 1440,65 L1440,140 L0,140 Z;M0,50 Q360,20 720,55 Q1080,80 1440,45 L1440,140 L0,140 Z" />
            </path>
            <path d="M0,75 Q300,45 720,80 Q1140,60 1440,70 L1440,140 L0,140 Z" fill="url(#c2)" opacity="0.75">
              <animate attributeName="d" dur="18s" repeatCount="indefinite" values="M0,75 Q300,45 720,80 Q1140,60 1440,70 L1440,140 L0,140 Z;M0,90 Q300,60 720,95 Q1140,75 1440,85 L1440,140 L0,140 Z;M0,75 Q300,45 720,80 Q1140,60 1440,70 L1440,140 L0,140 Z" />
            </path>
            <rect x="0" y="120" width="1440" height="20" fill="#f0f4f8" />
          </svg>
        </div>
      </div>

      <div style={{ background: "#f0f4f8", padding: "clamp(3rem, 6vw, 5rem) 1.5rem" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3rem" }}>

            {/* Columna izquierda */}
            <div>
              <h2 style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.4rem)", color: "#0b1120", marginBottom: "1.8rem", fontWeight: "700" }}>
                Ponte en contacto
              </h2>
              <p style={{ fontSize: "clamp(1rem, 2.8vw, 1.15rem)", color: "#475569", lineHeight: 1.7, marginBottom: "2.2rem" }}>
                Estamos listos para escucharte y acompañarte. Escríbenos, llámanos o envíanos un mensaje directo por WhatsApp.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {[
                  { icon: "https://img.icons8.com/color/48/phone.png", titulo: "Teléfono / WhatsApp", valor: "+57 314 731 4305" },
                  { icon: "https://img.icons8.com/color/48/email.png", titulo: "Correo electrónico", valor: "refugionazareth@hotmail.com" },
                  { icon: "https://img.icons8.com/color/48/marker.png", titulo: "Ubicación", valor: "Zona rural de Pereira, sector Tribunas / Morelia, Risaralda" },
                ].map((item) => (
                  <div key={item.titulo} style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: "1.1rem", background: "white", borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.06)", transition: "transform 0.3s"
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <img src={item.icon} alt={item.titulo} style={{ width: "42px", height: "42px" }} />
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#0b1120" }}>{item.titulo}</h4>
                      <p style={{ margin: "0.2rem 0 0", color: "#64748b", fontSize: "0.95rem" }}>{item.valor}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "2.2rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <a href="https://wa.me/573147314305" target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: "1 1 200px", padding: "1rem 1.4rem", background: "#25D366",
                    color: "white", borderRadius: "12px", textAlign: "center",
                    textDecoration: "none", fontSize: "1rem", fontWeight: "600",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "0.7rem", transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <img src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="WhatsApp" style={{ width: "26px", height: "26px" }} />
                  WhatsApp
                </a>
                <a href="mailto:refugionazareth@hotmail.com"
                  style={{
                    flex: "1 1 200px", padding: "1rem 1.4rem", background: "#1d4ed8",
                    color: "white", borderRadius: "12px", textAlign: "center",
                    textDecoration: "none", fontSize: "1rem", fontWeight: "600",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "0.7rem", transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <img src="https://img.icons8.com/color/48/email.png" alt="Email" style={{ width: "26px", height: "26px" }} />
                  Correo
                </a>
              </div>
            </div>

            {/* Formulario */}
            <div style={{
              background: "white", borderRadius: "18px",
              padding: "clamp(2rem, 4vw, 2.8rem)",
              boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
              border: "1px solid rgba(191,219,254,0.3)"
            }}>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.1rem)", color: "#0b1120", marginBottom: "1.8rem", fontWeight: "700" }}>
                Envía tu mensaje
              </h2>
              <form onSubmit={enviar} style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>

                {/* Nombre */}
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", fontWeight: "600", color: "#0b1120" }}>
                    Nombre completo
                  </label>
                  <input
                    type="text" required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    style={{ width: "100%", padding: "0.85rem 1.1rem", border: "1px solid #d1d5db", borderRadius: "10px", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => { e.target.style.borderColor = "#1d4ed8"; e.target.style.boxShadow = "0 0 0 3px rgba(29,78,216,0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#d1d5db"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Correo */}
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", fontWeight: "600", color: "#0b1120" }}>
                    Correo electrónico
                  </label>
                  <input
                    type="email" required
                    value={form.correo}
                    onChange={(e) => setForm({ ...form, correo: e.target.value })}
                    style={{ width: "100%", padding: "0.85rem 1.1rem", border: "1px solid #d1d5db", borderRadius: "10px", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
                    onFocus={(e) => { e.target.style.borderColor = "#1d4ed8"; e.target.style.boxShadow = "0 0 0 3px rgba(29,78,216,0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#d1d5db"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.95rem", fontWeight: "600", color: "#0b1120" }}>
                    Tu mensaje
                  </label>
                  <textarea
                    rows={5} required
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    style={{ width: "100%", padding: "0.85rem 1.1rem", border: "1px solid #d1d5db", borderRadius: "10px", fontSize: "1rem", resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                    onFocus={(e) => { e.target.style.borderColor = "#1d4ed8"; e.target.style.boxShadow = "0 0 0 3px rgba(29,78,216,0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#d1d5db"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Mensajes de estado */}
                {exito && (
                  <div style={{
                    background: '#f0fdf4', border: '1px solid #86efac',
                    borderRadius: '10px', padding: '1rem',
                    color: '#166534', fontWeight: '600', fontSize: '0.95rem'
                  }}>
                    ✅ ¡Mensaje enviado! Te responderemos pronto.
                  </div>
                )}
                {error && (
                  <div style={{
                    background: '#fef2f2', border: '1px solid #fecaca',
                    borderRadius: '10px', padding: '1rem',
                    color: '#991b1b', fontWeight: '600', fontSize: '0.95rem'
                  }}>
                    ❌ {error}
                  </div>
                )}

                {/* Botón */}
                <button
                  type="submit" disabled={enviando}
                  style={{
                    padding: "1rem 2rem",
                    background: enviando ? '#cbd5e1' : "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
                    color: "white", border: "none", borderRadius: "12px",
                    fontSize: "1.05rem", fontWeight: "600",
                    cursor: enviando ? 'not-allowed' : 'pointer',
                    boxShadow: "0 8px 25px rgba(29,78,216,0.25)", transition: "all 0.4s"
                  }}
                  onMouseEnter={(e) => { if (!enviando) { e.target.style.transform = "translateY(-4px)"; e.target.style.boxShadow = "0 14px 40px rgba(29,78,216,0.4)"; }}}
                  onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 25px rgba(29,78,216,0.25)"; }}
                >
                  {enviando ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
