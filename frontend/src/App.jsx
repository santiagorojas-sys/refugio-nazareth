import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import Comunidad from "./pages/Comunidad";
import Galeria from './pages/Galeria';
import Admin from './pages/Admin';

const SECCIONES = ["inicio", "nosotros", "servicios", "contacto", "comunidad", "galeria"];

const ICONOS = {
  inicio:    "🏠",
  nosotros:  "👥",
  servicios: "⚕️",
  contacto:  "📞",
  comunidad: "🏡",
  galeria:   "📸"
};

function App() {
  const [info, setInfo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [seccion, setSeccion] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setInfo({
        nombre: "Refugio Nazareth",
        descripcion: "Centro especializado en atención integral...",
        servicios: ["Alojamiento", "Acompañamiento terapéutico", "Atención espiritual"],
        contacto: {
          telefono: "3147314305",
          correo: "refugionazareth@hotmail.com",
          direccion: "Zona rural de Pereira, Risaralda"
        }
      });
      setCargando(false);
    }, 800);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setScrolled(true);
        if (currentScrollY > lastScrollY) {
          setHeaderVisible(false);
          setMenuAbierto(false);
        } else {
          setHeaderVisible(true);
        }
      } else {
        setScrolled(false);
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const cambiarSeccion = (sec) => {
    setSeccion(sec);
    setMenuAbierto(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let contenido;
  if (cargando) {
    contenido = (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: "70vh",
        background: "linear-gradient(135deg, #f0f4f8 0%, #e0f2fe 100%)"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 70, height: 70,
            border: "5px solid #e0f2fe", borderTop: "5px solid #1d4ed8",
            borderRadius: "50%", animation: "spin 0.8s linear infinite",
            margin: "0 auto 1.5rem",
            boxShadow: "0 8px 25px rgba(29,78,216,0.2)"
          }} />
          <p style={{ color: "#1e293b", fontSize: "1.2rem", fontWeight: "600" }}>
            Cargando...
          </p>
        </div>
      </div>
    );
  } else {
    if (seccion === "inicio")    contenido = <Home info={info} setSeccion={setSeccion} />;
    if (seccion === "nosotros")  contenido = <Nosotros />;
    if (seccion === "servicios") contenido = <Servicios />;
    if (seccion === "contacto")  contenido = <Contacto />;
    if (seccion === "galeria")   contenido = <Galeria />;
    if (seccion === "comunidad") contenido = <Comunidad />;
    if (seccion === "admin")     contenido = <Admin />;
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #f0f4f8 0%, #e0f2fe 100%)",
      width: "100%",
      overflowX: "hidden"
    }}>

      {/* ── HEADER ── */}
      <header style={{
        background: scrolled
          ? "rgba(11,17,32,0.92)"
          : "linear-gradient(135deg, rgba(11,17,32,0.95) 0%, rgba(30,41,59,0.98) 50%, rgba(30,64,175,0.92) 100%)",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)"
          : "0 2px 20px rgba(0,0,0,0.15)",
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 1000,
        transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(8px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none"
      }}>
        <div style={{
          maxWidth: "var(--max-width)", margin: "0 auto",
          padding: "0.85rem clamp(1rem, 3vw, 2rem)",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          {/* LOGO */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.9rem", cursor: "pointer", transition: "transform 0.3s" }}
            onClick={() => cambiarSeccion("inicio")}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              padding: "0.4rem", borderRadius: "10px",
              boxShadow: "0 6px 20px rgba(29,78,216,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <img
                src="/images/logo.png"
                alt="Refugio Nazareth"
                style={{ height: 36, width: "auto", borderRadius: "6px", filter: "brightness(1.1)" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
              <span style={{
                fontWeight: "800", fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                color: "white", letterSpacing: "-0.5px", lineHeight: 1,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)"
              }}>
                Refugio Nazareth
              </span>
              <span style={{
                fontSize: "0.65rem", color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.5px", fontWeight: "500", textTransform: "uppercase"
              }}>
                Hogar Psiquiátrico
              </span>
            </div>
          </div>

          {/* NAV DESKTOP */}
          <nav className="nav-desktop" style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            {SECCIONES.map((sec) => (
              <button
                key={sec}
                onClick={() => cambiarSeccion(sec)}
                style={{
                  background: seccion === sec
                    ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                    : "rgba(255,255,255,0.08)",
                  border: seccion === sec
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid rgba(255,255,255,0.1)",
                  color: "white", cursor: "pointer",
                  textTransform: "capitalize",
                  padding: "0.65rem 1.1rem", borderRadius: "10px",
                  fontSize: "0.9rem",
                  fontWeight: seccion === sec ? "700" : "500",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: seccion === sec
                    ? "0 4px 15px rgba(59,130,246,0.5)"
                    : "0 2px 8px rgba(0,0,0,0.1)",
                  whiteSpace: "nowrap", position: "relative", overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  if (seccion !== sec) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (seccion !== sec) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                {sec}
                {seccion === sec && (
                  <span style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: "2px", background: "rgba(255,255,255,0.5)",
                    borderRadius: "2px 2px 0 0"
                  }} />
                )}
              </button>
            ))}
          </nav>

          {/* BOTÓN HAMBURGUESA */}
          <button
            className="btn-hamburguesa"
            onClick={() => setMenuAbierto(!menuAbierto)}
            style={{
              display: "none", flexDirection: "column",
              justifyContent: "center", alignItems: "center", gap: "5px",
              background: menuAbierto ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)", borderRadius: "10px",
              padding: "0.6rem", cursor: "pointer", width: "44px", height: "44px",
              transition: "all 0.3s"
            }}
            aria-label="Abrir menú"
          >
            <span style={{
              display: "block", width: "22px", height: "2px",
              background: "white", borderRadius: "2px",
              transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: menuAbierto ? "rotate(45deg) translate(5px, 5px)" : "rotate(0)"
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px",
              background: "white", borderRadius: "2px",
              transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              opacity: menuAbierto ? 0 : 1,
              transform: menuAbierto ? "translateX(-10px)" : "translateX(0)"
            }} />
            <span style={{
              display: "block", width: "22px", height: "2px",
              background: "white", borderRadius: "2px",
              transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: menuAbierto ? "rotate(-45deg) translate(5px, -5px)" : "rotate(0)"
            }} />
          </button>
        </div>

        {/* MENÚ MÓVIL */}
        <div
          className="nav-mobile"
          style={{
            maxHeight: menuAbierto ? "500px" : "0",
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            background: "rgba(11,17,32,0.98)",
            borderTop: menuAbierto ? "1px solid rgba(255,255,255,0.08)" : "none"
          }}
        >
          <div style={{ padding: "0.8rem 1rem 1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {SECCIONES.map((sec) => (
              <button
                key={sec}
                onClick={() => cambiarSeccion(sec)}
                style={{
                  background: seccion === sec
                    ? "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(29,78,216,0.25))"
                    : "transparent",
                  border: seccion === sec
                    ? "1px solid rgba(59,130,246,0.4)"
                    : "1px solid rgba(255,255,255,0.06)",
                  color: seccion === sec ? "#93c5fd" : "rgba(255,255,255,0.85)",
                  cursor: "pointer", textTransform: "capitalize",
                  padding: "0.85rem 1.2rem", borderRadius: "12px",
                  fontSize: "1rem", fontWeight: seccion === sec ? "700" : "500",
                  textAlign: "left", display: "flex", alignItems: "center",
                  gap: "0.9rem", transition: "all 0.25s", width: "100%"
                }}
                onMouseEnter={(e) => { if (seccion !== sec) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { if (seccion !== sec) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: "1.2rem", minWidth: "26px", textAlign: "center" }}>{ICONOS[sec]}</span>
                <span style={{ flex: 1 }}>{sec}</span>
                {seccion === sec && (
                  <span style={{ width: "8px", height: "8px", background: "#3b82f6", borderRadius: "50%", flexShrink: 0 }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Overlay menú móvil */}
      {menuAbierto && (
        <div
          onClick={() => setMenuAbierto(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999, backdropFilter: "blur(2px)"
          }}
        />
      )}

      {/* Espaciador header */}
      <div style={{ height: "68px" }} />

      <main style={{ width: "100%", overflowX: "hidden" }}>
        {contenido}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "linear-gradient(135deg, #0b1120 0%, #1e293b 50%, #1e40af 100%)",
        color: "white",
        padding: "2rem clamp(1rem, 3vw, 2rem) 1.2rem",
        marginTop: "5rem",
        width: "100%",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: "linear-gradient(90deg, transparent, #3b82f6, #1d4ed8, #3b82f6, transparent)"
        }} />

        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem", marginBottom: "1.5rem", alignItems: "start"
          }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", marginBottom: "0.6rem", color: "white" }}>
                Refugio Nazareth
              </h3>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.6, opacity: 0.8 }}>
                Un hogar sustituto que huele a aguapanela hirviendo, a sancocho de amor y a fríjoles calados con comprensión.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "0.6rem", color: "#93c5fd" }}>
                Contacto
              </h4>
              <div style={{ fontSize: "0.85rem", opacity: 0.85, lineHeight: 2 }}>
                <p>📍 Pereira, Risaralda, Colombia</p>
                <p>
                  📧{" "}
                  <a href="mailto:refugionazareth@hotmail.com"
                    style={{ color: "inherit", textDecoration: "none" }}
                    onMouseEnter={(e) => e.target.style.color = "#93c5fd"}
                    onMouseLeave={(e) => e.target.style.color = "inherit"}
                  >
                    refugionazareth@hotmail.com
                  </a>
                </p>
                <p>
                  📞{" "}
                  <a href="tel:3147314305"
                    style={{ color: "inherit", textDecoration: "none" }}
                    onMouseEnter={(e) => e.target.style.color = "#93c5fd"}
                    onMouseLeave={(e) => e.target.style.color = "inherit"}
                  >
                    314 731 4305
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: "700", marginBottom: "0.6rem", color: "#93c5fd" }}>
                Navegación
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {SECCIONES.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => cambiarSeccion(sec)}
                    style={{
                      background: "transparent", border: "none",
                      color: "rgba(255,255,255,0.75)", textAlign: "left",
                      cursor: "pointer", fontSize: "0.85rem",
                      textTransform: "capitalize", transition: "all 0.2s",
                      padding: "0.2rem 0", display: "flex", alignItems: "center", gap: "0.5rem"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#3b82f6";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <span>{ICONOS[sec]}</span> {sec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            marginBottom: "1rem"
          }} />

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "0.85rem", marginBottom: "0.3rem", fontWeight: "500", opacity: 0.9 }}>
              © 2026 Refugio Nazareth · Hogar Psiquiátrico
            </p>
            {/* Botón oculto para acceder al panel admin */}
            <button
              onClick={() => cambiarSeccion("admin")}
              style={{
                background: "transparent", border: "none",
                color: "rgba(255,255,255,0.2)", cursor: "pointer",
                fontSize: "0.75rem", marginBottom: "0.3rem", display: "block",
                margin: "0 auto 0.3rem"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.2)"}
            >
              ⚙️
            </button>
            <p style={{ fontSize: "0.75rem", opacity: 0.45 }}>
              Sitio web desarrollado por{" "}
              <a
                href="mailto:novaosjys@gmail.com"
                style={{ color: "inherit", textDecoration: "none", borderBottom: "1px dotted rgba(255,255,255,0.3)" }}
                onMouseEnter={(e) => { e.target.style.opacity = "0.8"; e.target.style.color = "#93c5fd"; }}
                onMouseLeave={(e) => { e.target.style.opacity = "1"; e.target.style.color = "inherit"; }}
              >
                NovaOS
              </a>
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          overflow-x: hidden !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        @media (max-width: 768px) {
          .nav-desktop     { display: none !important; }
          .btn-hamburguesa { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile      { display: none !important; }
          .btn-hamburguesa { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default App;
