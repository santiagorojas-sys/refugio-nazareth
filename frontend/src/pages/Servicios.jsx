import { useState } from "react";

export default function Servicios() {
  const [expandido, setExpandido] = useState(null);

  const rutaSteps = [
    {
      icon: "https://api.iconify.design/mdi:phone-in-talk.svg?color=%233b82f6",
      text: "Solicitud telefónica o virtual"
    },
    {
      icon: "https://api.iconify.design/mdi:account-group.svg?color=%233b82f6",
      text: "Entrevista previa con el comité técnico y revisión de historia clínica"
    },
    {
      icon: "https://api.iconify.design/mdi:home-heart.svg?color=%233b82f6",
      text: "Visita domiciliaria"
    },
    {
      icon: "https://api.iconify.design/mdi:stethoscope.svg?color=%233b82f6",
      text: "Valoración psiquiátrica adicional cuando se requiere"
    },
    {
      icon: "https://api.iconify.design/mdi:check-circle.svg?color=%233b82f6",
      text: "Decisión de ingreso, firma de contrato y entrega de documentos"
    }
  ];

  const hojaRuta = [
    {
      icon: "https://api.iconify.design/mdi:door-open.svg?color=white&width=48",
      titulo: "Ingreso",
      desc: "Apertura de ficha, firma de convenio, valoración integral, pruebas funcionales, recorrido por las instalaciones y presentación al grupo."
    },
    {
      icon: "https://api.iconify.design/mdi:calendar-month.svg?color=white&width=48",
      titulo: "Primer mes",
      desc: "Valoraciones de medicina general, nutrición, odontología, psicología, psiquiatría, fisioterapia y elaboración del Plan de Atención Individual (PAI)."
    },
    {
      icon: "https://api.iconify.design/mdi:weather-sunny.svg?color=white&width=48",
      titulo: "Atención diaria",
      desc: "Actividades de la vida diaria, administración de medicamentos, signos vitales y talleres de manualidades, música, actividad física, formación humana, recreación y asistencia espiritual."
    },
    {
      icon: "https://api.iconify.design/mdi:refresh-circle.svg?color=white&width=48",
      titulo: "Controles periódicos",
      desc: "Revisiones médicas, odontológicas, nutricionales, psiquiátricas, psicológicas y de fisioterapia, y ajustes trimestrales del PAI."
    },
    {
      icon: "https://api.iconify.design/mdi:ambulance.svg?color=white&width=48",
      titulo: "Por evento",
      desc: "Atención de urgencias según protocolos establecidos."
    }
  ];

  return (
    <>
      {/* HERO FULL-WIDTH */}
      <div style={{
        position: "relative",
        minHeight: "70vh",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        background: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=900&fit=crop') center/cover no-repeat",
        display: "flex",
        alignItems: "center",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(11,17,32,0.88) 0%, rgba(30,64,175,0.75) 100%)",
          zIndex: 1
        }} />

        <div style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          padding: "2rem 1.5rem 6rem",
          width: "100%",
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: "clamp(2.5rem, 6vw, 3.8rem)",
            fontWeight: "900",
            color: "white",
            marginBottom: "1.5rem",
            textShadow: "0 6px 25px rgba(0,0,0,0.6)"
          }}>
            Servicios y Modelo de Atención
          </h1>
          <p style={{
            fontSize: "clamp(1.1rem, 3vw, 1.35rem)",
            color: "#e0f2fe",
            maxWidth: "720px",
            margin: "0 auto",
            lineHeight: 1.6,
            textShadow: "0 2px 12px rgba(0,0,0,0.5)"
          }}>
            Atención integral, humana y profesional para personas con enfermedad mental crónica
          </p>
        </div>

        {/* Separador animado */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 3, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{
            display: "block",
            width: "100%",
            height: "clamp(60px, 10vw, 80px)"
          }}>
            <defs>
              <linearGradient id="s1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0c4a6e" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
            </defs>
            <path d="M0,30 Q360,15 720,35 Q1080,50 1440,25 L1440,100 L0,100 Z" fill="url(#s1)" opacity="0.95">
              <animate attributeName="d" dur="20s" repeatCount="indefinite" values="
                M0,30 Q360,15 720,35 Q1080,50 1440,25 L1440,100 L0,100 Z;
                M0,40 Q360,25 720,45 Q1080,30 1440,35 L1440,100 L0,100 Z;
                M0,30 Q360,15 720,35 Q1080,50 1440,25 L1440,100 L0,100 Z" />
            </path>
            <rect x="0" y="85" width="1440" height="15" fill="#f0f4f8" />
          </svg>
        </div>
      </div>

      {/* CONTENIDO */}
      <div style={{ background: "#f0f4f8", padding: "clamp(3rem, 6vw, 5rem) 1.5rem" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", width: "100%" }}>

         {/* PERFIL DE USUARIOS */}
<div style={{
  background: "linear-gradient(145deg, #ffffff 0%, #dbeafe 100%)",
  borderRadius: "24px",
  padding: "clamp(2rem, 4vw, 3rem)",
  boxShadow: "0 20px 50px rgba(15,23,42,0.15)",
  marginBottom: "4rem",
  border: "2px solid rgba(59,130,246,0.2)"
}}>
  <div style={{ textAlign: "center", marginBottom: "2rem" }}>
    <div style={{
      width: "80px",
      height: "80px",
      background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1.5rem",
      boxShadow: "0 12px 30px rgba(29,78,216,0.3)",
      padding: "1rem"
    }}>
      <img
        src="https://api.iconify.design/mdi:account-multiple.svg?color=white&width=48"
        alt="Usuarios"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
    <h2 style={{
      fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
      color: "#0b1120",
      fontWeight: "800",
      marginBottom: "1rem"
    }}>
      Perfil de Usuarios
    </h2>
  </div>

  <p style={{
    fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
    lineHeight: 1.8,
    color: "#475569",
    marginBottom: "2rem",          // más espacio debajo del texto principal
    textAlign: "center"
  }}>
    Atendemos personas mayores de 18 años, de cualquier género, con diagnóstico claro de enfermedad mental crónica (trastorno afectivo bipolar, esquizofrenia, TOC, demencias, daño cognitivo mayor, retraso mental, trastorno mental orgánico), sin consumo reciente de sustancias psicoactivas y con concepto médico que justifique internamiento de larga estancia.
  </p>

  {/* ALERTA - Versión más grande y con mejor uso del espacio */}
  <div style={{
    background: "rgba(239,68,68,0.12)",
    border: "3px solid #ef4444",
    borderRadius: "20px",
    padding: "clamp(1.8rem, 5vw, 2.5rem) clamp(1.2rem, 4vw, 2rem)",
    margin: "0 auto",
    maxWidth: "clamp(320px, 85%, 480px)",   // más ancho en móvil, límite razonable en pantallas grandes
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.2rem",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(239,68,68,0.15)"
  }}>
    {/* Fila superior: ícono + texto principal */}
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      width: "100%"
    }}>
      <img
        src="https://api.iconify.design/mdi:alert-circle.svg?color=%23dc2626&width=48"
        alt="Alerta"
        style={{ width: "48px", height: "48px", flexShrink: 0 }}
      />
      <strong style={{
        color: "#dc2626",
        fontSize: "clamp(1.25rem, 4.5vw, 1.5rem)",
        fontWeight: "800",
        lineHeight: 1.2
      }}>
        ¡No atendemos!
      </strong>
    </div>

    {/* Texto explicativo - más grande y con mejor espaciado */}
    <p style={{
      fontSize: "clamp(1rem, 3.5vw, 1.15rem)",
      color: "#475569",
      margin: 0,
      lineHeight: 1.65,
      hyphens: "auto",
      wordBreak: "break-word",
      maxWidth: "100%"
    }} lang="es">
      farmacodependientes ni personas que puedan vivir adecuadamente en su hogar.
    </p>
  </div>
</div>

          {/* RUTA DE INGRESO - Versión vertical + centrada en móvil */}
<div style={{ marginBottom: "4rem" }}>
  <div style={{ textAlign: "center", marginBottom: "3rem" }}>
    <div style={{
      width: "70px",
      height: "70px",
      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1rem",
      boxShadow: "0 10px 25px rgba(29,78,216,0.3)",
      padding: "1rem"
    }}>
      <img
        src="https://api.iconify.design/mdi:map-marker-path.svg?color=white&width=40"
        alt="Ruta"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
    <h2 style={{
      fontSize: "clamp(2rem, 5vw, 2.6rem)",
      color: "#0b1120",
      fontWeight: "800"
    }}>
      Ruta de Ingreso
    </h2>
  </div>

  <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    position: "relative",
    maxWidth: "94%",
    margin: "0 auto",
    padding: "0 1rem"           // margen lateral más equilibrado
  }}>
    {/* Línea conectora - centrada */}
    <div style={{
      position: "absolute",
      left: "50%",
      transform: "translateX(-1.5px)",   // centra la línea de 3px de ancho
      top: "70px",                       // ajustado para empezar debajo del primer círculo
      bottom: "70px",
      width: "3px",
      background: "linear-gradient(180deg, #3b82f6 0%, #1e40af 100%)",
      borderRadius: "10px",
      opacity: 0.25,
      zIndex: 1
    }} />

    {rutaSteps.map((paso, idx) => (
      <div
        key={idx}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",              // ¡Cambio clave! centrado general
          gap: "1rem",
          padding: "1.8rem 1.2rem",          // padding simétrico, menos izquierdo
          background: "white",
          borderRadius: "18px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          transition: "all 0.3s",
          position: "relative",
          zIndex: 2,
          textAlign: "center"                // texto centrado
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 12px 35px rgba(29,78,216,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
        }}
      >
        {/* Número + Icono centrados */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.2rem",
          width: "100%",
          marginBottom: "0.5rem"
        }}>
          <div style={{
            minWidth: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.8rem",
            fontWeight: "900",
            boxShadow: "0 8px 20px rgba(29,78,216,0.3)",
            flexShrink: 0,
            zIndex: 3
          }}>
            {idx + 1}
          </div>

          <img
            src={paso.icon}
            alt={`Paso ${idx + 1}`}
            style={{ width: "48px", height: "48px", flexShrink: 0 }}
          />
        </div>

        {/* Texto centrado */}
        <p style={{
          margin: 0,
          fontSize: "clamp(1rem, 3.2vw, 1.1rem)",
          color: "#475569",
          lineHeight: 1.5,
          fontWeight: "500",
          hyphens: "auto",
          wordBreak: "break-word",
          maxWidth: "90%"                    // evita que se estire demasiado
        }} lang="es">
          {paso.text}
        </p>
      </div>
    ))}
  </div>
</div>
          {/* HOJA DE RUTA - Accordion interactivo */}
          <div style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderRadius: "24px",
            padding: "clamp(2.5rem, 5vw, 3.5rem)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            marginBottom: "4rem",
            color: "white"
          }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{
                width: "70px",
                height: "70px",
                background: "rgba(59,130,246,0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                border: "2px solid rgba(59,130,246,0.4)",
                padding: "1rem"
              }}>
                <img
                  src="https://api.iconify.design/mdi:clipboard-text.svg?color=white&width=40"
                  alt="Hoja de Ruta"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <h2 style={{
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                fontWeight: "800"
              }}>
                Hoja de Ruta de Atención
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              justifyContent: "center"
            }}>
              {hojaRuta.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: expandido === idx
                      ? "rgba(59,130,246,0.25)"
                      : "rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    padding: "1.8rem",
                    border: expandido === idx
                      ? "2px solid rgba(59,130,246,0.5)"
                      : "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.3s",
                    cursor: "pointer",
                    maxWidth: "400px",
                    justifySelf: "center"
                  }}
                  onClick={() => setExpandido(expandido === idx ? null : idx)}
                  onMouseEnter={(e) => {
                    if (expandido !== idx) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    }
                    e.currentTarget.style.transform = "translateY(-6px)";
                  }}
                  onMouseLeave={(e) => {
                    if (expandido !== idx) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    }
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem"
                  }}>
                    <img
                      src={item.icon}
                      alt={item.titulo}
                      style={{ width: "48px", height: "48px" }}
                    />
                    <h3 style={{
                      fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                      fontWeight: "700",
                      margin: 0
                    }}>
                      {item.titulo}
                    </h3>
                  </div>
                  <p style={{
                    fontSize: "clamp(0.9rem, 2vw, 0.98rem)",
                    lineHeight: 1.7,
                    margin: 0,
                    opacity: expandido === idx ? 1 : 0.75,
                    maxHeight: expandido === idx ? "500px" : "0",
                    overflow: "hidden",
                    transition: "all 0.4s ease-in-out",
                    hyphens: "auto",
                    wordBreak: "break-word"
                  }} lang="es">
                    {item.desc}
                  </p>
                  {expandido !== idx && (
                    <div style={{
                      marginTop: "1rem",
                      fontSize: "0.85rem",
                      color: "#93c5fd",
                      fontWeight: "600"
                    }}>
                      Clic para ver más ↓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* INTEGRACIÓN FAMILIAR Y ESPIRITUAL */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            justifyContent: "center"
          }}>
            {/* Integración Familiar */}
            <div style={{
              background: "linear-gradient(145deg, #ffffff 0%, #eff6ff 100%)",
              borderRadius: "24px",
              padding: "2.5rem",
              boxShadow: "0 15px 40px rgba(15,23,42,0.12)",
              border: "2px solid rgba(191,219,254,0.5)",
              transition: "all 0.4s",
              maxWidth: "500px",
              justifySelf: "center"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 25px 60px rgba(29,78,216,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(15,23,42,0.12)";
            }}>
              <div style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                boxShadow: "0 10px 25px rgba(29,78,216,0.3)",
                padding: "1rem"
              }}>
                <img
                  src="https://api.iconify.design/mdi:account-heart.svg?color=white&width=40"
                  alt="Familia"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <h3 style={{
                fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                color: "#0b1120",
                marginBottom: "1rem",
                fontWeight: "800"
              }}>
                Integración Familiar y Social
              </h3>
              <p style={{
                fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
                color: "#475569",
                lineHeight: 1.8,
                hyphens: "auto",
                wordBreak: "break-word"
              }} lang="es">
                Creemos que el mejor lugar para vivir es la propia casa, por eso el internamiento es la última alternativa. Realizamos visitas domiciliarias, promovemos salidas terapéuticas, pruebas de regreso a casa y, cuando es posible, el retorno definitivo con controles.
              </p>
            </div>

            {/* Atención Espiritual */}
            <div style={{
              background: "linear-gradient(145deg, #ffffff 0%, #e0f2fe 100%)",
              borderRadius: "24px",
              padding: "2.5rem",
              boxShadow: "0 15px 40px rgba(15,23,42,0.12)",
              border: "2px solid rgba(191,219,254,0.5)",
              transition: "all 0.4s",
              maxWidth: "500px",
              justifySelf: "center"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 25px 60px rgba(29,78,216,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(15,23,42,0.12)";
            }}>
              <div style={{
                width: "70px",
                height: "70px",
                background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                boxShadow: "0 10px 25px rgba(29,78,216,0.3)",
                padding: "1rem"
              }}>
                <img
                  src="https://api.iconify.design/mdi:hands-pray.svg?color=white&width=40"
                  alt="Espiritual"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <h3 style={{
                fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                color: "#0b1120",
                marginBottom: "1rem",
                fontWeight: "800"
              }}>
                Atención Espiritual
              </h3>
              <p style={{
                fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
                color: "#475569",
                lineHeight: 1.8,
                hyphens: "auto",
                wordBreak: "break-word"
              }} lang="es">
                Brindamos acompañamiento espiritual respetando la creencia y práctica de cada residente. Sabemos que la dimensión espiritual es fundamental en el proceso de sanación y bienestar integral.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}