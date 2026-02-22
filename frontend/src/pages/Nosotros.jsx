import { useState, useEffect } from "react";

export default function Nosotros() {
  const [imagenActual, setImagenActual] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const valores = [
    { titulo: "Solidaridad", desc: "Prontitud y entrega para favorecer la inclusión social." },
    { titulo: "Compromiso", desc: "Trabajo profesional, respetuoso y eficiente." },
    { titulo: "Espíritu emprendedor", desc: "Búsqueda proactiva de alternativas para mejorar la calidad de vida." },
    { titulo: "Respeto", desc: "Reconocimiento de la dignidad universal de cada persona." },
    { titulo: "Justicia", desc: "Promoción de igualdad de oportunidades y lucha contra el estigma." },
    { titulo: "Transparencia", desc: "Trabajo basado en verdad, honestidad y acceso a la información." },
    { titulo: "Trabajo en equipo", desc: "Colaboración interdisciplinaria para un objetivo común." },
  ];

  const imagenesLugar = [
    { src: "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?w=800&h=600&fit=crop", titulo: "Instalaciones", desc: "Espacios amplios y acogedores" },
    { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop", titulo: "Áreas comunes", desc: "Espacios de convivencia" },
    { src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop", titulo: "Jardines", desc: "Naturaleza sanadora" },
    { src: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop", titulo: "Terapia ocupacional", desc: "Actividades que sanan" },
    { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop", titulo: "Nuestra convivencia", desc: "El arte de la distracción" },
    { src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&h=600&fit=crop", titulo: "Momentos compartidos", desc: "Familia y comunidad" },
  ];

  // Autoplay cada 4 segundos
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setImagenActual((prev) => (prev + 1) % imagenesLugar.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoplay, imagenesLugar.length]);

  const siguiente = () => {
    setAutoplay(false);
    setImagenActual((prev) => (prev + 1) % imagenesLugar.length);
  };

  const anterior = () => {
    setAutoplay(false);
    setImagenActual((prev) => (prev - 1 + imagenesLugar.length) % imagenesLugar.length);
  };

  const irAImagen = (idx) => {
    setAutoplay(false);
    setImagenActual(idx);
  };

  return (
    <>
      {/* HERO FULL-WIDTH */}
      <div style={{
        position: "relative",
        minHeight: "70vh",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        background: "url('/images/nosotros.jpg') center/cover no-repeat",
        display: "flex",
        alignItems: "center",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(11,17,32,0.85) 0%, rgba(30,64,175,0.7) 100%)",
          zIndex: 1
        }} />

        <div style={{ 
          position: "relative", 
          zIndex: 2, 
          maxWidth: "var(--max-width)", 
          margin: "0 auto", 
          padding: "2rem 1.5rem 6rem",
          width: "100%" 
        }}>
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 3.8rem)",
            fontWeight: "900",
            color: "white",
            marginBottom: "1rem",
            textShadow: "0 6px 25px rgba(0,0,0,0.6)"
          }}>
            Quiénes somos
          </h1>
          <p style={{
            fontSize: "clamp(1.1rem, 3vw, 1.35rem)",
            color: "#e0f2fe",
            maxWidth: "720px",
            lineHeight: 1.6,
            textShadow: "0 2px 12px rgba(0,0,0,0.5)"
          }}>
            Un hogar nacido en 2001 en Pereira para acompañar con presencia terapéutica activa y amorosa a quienes sufren en silencio el dolor de la enfermedad mental.
          </p>
        </div>

        {/* Separador animado full-width */}
        <div style={{ 
          position: "absolute", 
          bottom: 0, 
          left: 0,
          width: "100%",
          zIndex: 3, 
          lineHeight: 0 
        }}>
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ 
            display: "block", 
            width: "100%", 
            height: "clamp(60px, 10vw, 80px)" 
          }}>
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
            <path d="M0,30 Q360,15 720,35 Q1080,50 1440,25 L1440,100 L0,100 Z" fill="url(#c1)" opacity="0.95">
              <animate attributeName="d" dur="20s" repeatCount="indefinite" values="
                M0,30 Q360,15 720,35 Q1080,50 1440,25 L1440,100 L0,100 Z;
                M0,40 Q360,25 720,45 Q1080,30 1440,35 L1440,100 L0,100 Z;
                M0,30 Q360,15 720,35 Q1080,50 1440,25 L1440,100 L0,100 Z" />
            </path>
            <path d="M0,50 Q300,35 720,55 Q1140,40 1440,45 L1440,100 L0,100 Z" fill="url(#c2)" opacity="0.75">
              <animate attributeName="d" dur="16s" repeatCount="indefinite" values="
                M0,50 Q300,35 720,55 Q1140,40 1440,45 L1440,100 L0,100 Z;
                M0,60 Q300,45 720,65 Q1140,50 1440,55 L1440,100 L0,100 Z;
                M0,50 Q300,35 720,55 Q1140,40 1440,45 L1440,100 L0,100 Z" />
            </path>
            <rect x="0" y="85" width="1440" height="15" fill="#f0f4f8" />
          </svg>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ background: "#f0f4f8", padding: "clamp(3rem, 6vw, 5rem) 1.5rem", width: "100%" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", width: "100%" }}>

          {/* CARRUSEL DINÁMICO MEJORADO */}
          <div style={{ marginBottom: "4rem" }}>
            <h2 style={{ 
              fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)", 
              color: "#0b1120", 
              textAlign: "center", 
              marginBottom: "2.5rem",
              fontWeight: "800"
            }}>
              Nuestro hogar en imágenes
            </h2>
            
            <div style={{
              position: "relative",
              maxWidth: "900px",
              margin: "0 auto",
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              borderRadius: "24px",
              padding: "clamp(1.5rem, 3vw, 2rem)",
              boxShadow: "0 25px 60px rgba(15,23,42,0.5)"
            }}>
              
              {/* Imagen principal con transición */}
              <div style={{
                position: "relative",
                width: "100%",
                paddingBottom: "45%",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 15px 40px rgba(0,0,0,0.4)"
              }}>
                {imagenesLugar.map((img, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: imagenActual === idx ? 1 : 0,
                      transform: imagenActual === idx ? "scale(1)" : "scale(1.1)",
                      transition: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
                      pointerEvents: imagenActual === idx ? "auto" : "none"
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.titulo}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                    
                    {/* Overlay con info */}
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 60%, transparent 100%)",
                      padding: "2rem 1.5rem 1.5rem",
                      color: "white"
                    }}>
                      <h3 style={{
                        fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                        fontWeight: "700",
                        marginBottom: "0.5rem"
                      }}>
                        {img.titulo}
                      </h3>
                      <p style={{
                        fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                        opacity: 0.9
                      }}>
                        {img.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones de navegación mejorados */}
              <button
                onClick={anterior}
                style={{
                  position: "absolute",
                  left: "clamp(1rem, 3vw, 2rem)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "clamp(50px, 8vw, 65px)",
                  height: "clamp(50px, 8vw, 65px)",
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255,255,255,0.95)",
                  color: "#0b1120",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#3b82f6";
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.95)";
                  e.target.style.color = "#0b1120";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                ‹
              </button>

              <button
                onClick={siguiente}
                style={{
                  position: "absolute",
                  right: "clamp(1rem, 3vw, 2rem)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "clamp(50px, 8vw, 65px)",
                  height: "clamp(50px, 8vw, 65px)",
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255,255,255,0.95)",
                  color: "#0b1120",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#3b82f6";
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-50%) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255,255,255,0.95)";
                  e.target.style.color = "#0b1120";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                ›
              </button>

              {/* Indicadores con miniaturas */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.8rem",
                marginTop: "2rem",
                flexWrap: "wrap",
                padding: "0 1rem"
              }}>
                {imagenesLugar.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => irAImagen(idx)}
                    style={{
                      width: imagenActual === idx ? "clamp(60px, 10vw, 80px)" : "clamp(50px, 8vw, 60px)",
                      height: "clamp(50px, 8vw, 60px)",
                      borderRadius: "12px",
                      border: imagenActual === idx ? "3px solid #3b82f6" : "2px solid rgba(255,255,255,0.3)",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      padding: 0,
                      background: "transparent",
                      opacity: imagenActual === idx ? 1 : 0.6,
                      transform: imagenActual === idx ? "scale(1.1)" : "scale(1)",
                      boxShadow: imagenActual === idx ? "0 6px 20px rgba(59,130,246,0.5)" : "0 2px 8px rgba(0,0,0,0.2)"
                    }}
                    onMouseEnter={(e) => {
                      if (imagenActual !== idx) {
                        e.target.style.opacity = "0.9";
                        e.target.style.transform = "scale(1.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (imagenActual !== idx) {
                        e.target.style.opacity = "0.6";
                        e.target.style.transform = "scale(1)";
                      }
                    }}
                  >
                    <img
                      src={img.src}
                      alt={`Miniatura ${idx + 1}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Control autoplay */}
              <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                <button
                  onClick={() => setAutoplay(!autoplay)}
                  style={{
                    background: autoplay ? "#3b82f6" : "rgba(255,255,255,0.2)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "0.6rem 1.5rem",
                    borderRadius: "25px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    fontWeight: "600"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = autoplay ? "#2563eb" : "rgba(255,255,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = autoplay ? "#3b82f6" : "rgba(255,255,255,0.2)";
                  }}
                >
                  {autoplay ? "⏸ Pausar" : "▶ Reproducir"} presentación
                </button>
              </div>
            </div>
          </div>

          {/* Misión, Visión, Modelo con iconos PNG y fondos nuevos */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "5rem" }}>
            {/* Misión */}
            <div style={{
              background: "linear-gradient(145deg, #ffffff 0%, #eff6ff 100%)",
              borderRadius: "22px",
              padding: "2.5rem",
              boxShadow: "0 14px 40px rgba(15,23,42,0.15)",
              transition: "all 0.35s",
              border: "1px solid rgba(191,219,254,0.9)"
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 18px 55px rgba(37,99,235,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 14px 40px rgba(15,23,42,0.15)";
              }}
            >
              <div style={{
                width: 82,
                height: 82,
                borderRadius: "24px",
                marginBottom: "1.6rem",
                background: "radial-gradient(circle at 20% 0, #bfdbfe 0, #1d4ed8 55%, #0f172a 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 30px rgba(37,99,235,0.35)",
                padding: "0.8rem"
              }}>
                <img src="/images/mision.png" alt="Misión" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3 style={{ fontSize: "1.5rem", color: "#0b1120", marginBottom: "1rem", fontWeight: "800" }}>Misión</h3>
              <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "0.98rem" }}>
                Acompañar y superar el sufrimiento humano de las personas que padecen trastornos mentales y sus familias, mediante servicios de alta calidad en un ambiente de libertad, respeto y comprensión.
              </p>
            </div>

            {/* Visión */}
            <div style={{
              background: "linear-gradient(145deg, #ffffff 0%, #e0f2fe 100%)",
              borderRadius: "22px",
              padding: "2.5rem",
              boxShadow: "0 14px 40px rgba(15,23,42,0.15)",
              transition: "all 0.35s",
              border: "1px solid rgba(191,219,254,0.9)"
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 18px 55px rgba(37,99,235,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 14px 40px rgba(15,23,42,0.15)";
              }}
            >
              <div style={{
                width: 82,
                height: 82,
                borderRadius: "24px",
                marginBottom: "1.6rem",
                background: "radial-gradient(circle at 15% 0, #bfdbfe 0, #3b82f6 55%, #0f172a 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 30px rgba(37,99,235,0.35)",
                padding: "0.8rem"
              }}>
                <img src="/images/vision.png" alt="Visión" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3 style={{ fontSize: "1.5rem", color: "#0b1120", marginBottom: "1rem", fontWeight: "800" }}>Visión 2026</h3>
              <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "0.98rem" }}>
                Ser la entidad más grande e importante del occidente colombiano en acompañamiento a personas con enfermedad mental, referente nacional por calidad, respaldo familiar y solidez.
              </p>
            </div>

            {/* Modelo Terapéutico */}
            <div style={{
              background: "linear-gradient(145deg, #ffffff 0%, #dbeafe 100%)",
              borderRadius: "22px",
              padding: "2.5rem",
              boxShadow: "0 14px 40px rgba(15,23,42,0.15)",
              transition: "all 0.35s",
              border: "1px solid rgba(191,219,254,0.9)"
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 18px 55px rgba(37,99,235,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 14px 40px rgba(15,23,42,0.15)";
              }}
            >
              <div style={{
                width: 82,
                height: 82,
                borderRadius: "24px",
                marginBottom: "1.6rem",
                background: "radial-gradient(circle at 30% 0, #bfdbfe 0, #1e40af 55%, #0f172a 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 30px rgba(37,99,235,0.35)",
                padding: "0.8rem"
              }}>
                <img src="/images/valores.png" alt="Modelo Terapéutico" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <h3 style={{ fontSize: "1.5rem", color: "#0b1120", marginBottom: "1rem", fontWeight: "800" }}>Modelo Terapéutico</h3>
              <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "0.98rem" }}>
                Presencia Terapéutica Activa y Amorosa: compañía real que comprende, descubre necesidades y se moviliza por el otro con amor comprensivo, servicial y sin límites.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div style={{ marginBottom: "5rem" }}>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", color: "#0b1120", textAlign: "center", marginBottom: "2.5rem" }}>
              Nuestros valores
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {valores.map((valor, idx) => (
                <div key={idx} style={{
                  padding: "1.8rem",
                  background: "white",
                  borderRadius: "16px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                  borderLeft: "5px solid #1d4ed8",
                  transition: "all 0.3s"
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(29,78,216,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
                  }}
                >
                  <h4 style={{ color: "#1d4ed8", fontSize: "1.2rem", marginBottom: "0.6rem" }}>{valor.titulo}</h4>
                  <p style={{ color: "#64748b", lineHeight: 1.6 }}>{valor.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Política de Buen Trato */}
          <div style={{
            background: "linear-gradient(135deg, #0b1120 0%, #1e293b 100%)",
            color: "white",
            padding: "clamp(2.5rem, 5vw, 4rem) 2rem",
            borderRadius: "24px",
            boxShadow: "0 15px 45px rgba(0,0,0,0.2)",
            textAlign: "center"
          }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.4rem)", marginBottom: "1.5rem" }}>
              Política Institucional del Buen Trato
            </h2>
            <p style={{ fontSize: "clamp(1rem, 2.8vw, 1.15rem)", lineHeight: 1.8, maxWidth: "800px", margin: "0 auto" }}>
              Definimos el maltrato como todo acto u omisión que cause daño, angustia o vulnere la dignidad. Implementamos protocolos estrictos de reporte, protección, investigación y capacitación permanente para garantizar un ambiente de respeto absoluto.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
