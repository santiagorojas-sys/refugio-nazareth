export default function Home({ info, setSeccion }) {
  return (
    <>
      {/* ── HERO ── */}
      <div style={{
        position: "relative",
        minHeight: "85vh",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        overflow: "hidden"
      }}>

        {/* ✅ Imagen de fondo en su propio div — separada del flex */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/hero-home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0
        }} />

        {/* Overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(11,17,32,0.88) 0%, rgba(11,17,32,0.65) 50%, rgba(30,64,175,0.72) 100%)",
          zIndex: 1
        }} />

        {/* Contenido hero */}
        <div style={{
          position: "relative",
          zIndex: 3,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem clamp(1.5rem, 5vw, 4rem) 6rem",
          width: "100%",
          boxSizing: "border-box",
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>

          {/* Badge SEO */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(59,130,246,0.25)",
            border: "1px solid rgba(59,130,246,0.5)",
            borderRadius: "50px",
            padding: "0.4rem 1.2rem",
            marginBottom: "1.5rem"
          }}>
            <span style={{
              width: "8px", height: "8px",
              background: "#3b82f6",
              borderRadius: "50%",
              display: "inline-block"
            }} />
            <span style={{
              fontSize: "clamp(0.78rem, 2vw, 0.88rem)",
              fontWeight: "600",
              color: "#93c5fd",
              letterSpacing: "0.8px",
              textTransform: "uppercase"
            }}>{"Hogar Sustituto Psiquiátrico · Pereira, Colombia"}</span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontSize: "clamp(2.2rem, 7vw, 3.8rem)",
            lineHeight: 1.1,
            fontWeight: "900",
            color: "#ffffff",
            marginBottom: "1rem",
            letterSpacing: "-0.01em",
            fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
          }}>{"Refugio Nazareth"}</h1>

          {/* Subtítulo */}
          <p style={{
            fontSize: "clamp(1.05rem, 2.5vw, 1.25rem)",
            fontWeight: "600",
            color: "#93c5fd",
            marginBottom: "1rem",
            fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
          }}>{"Atención integral para personas con enfermedad mental crónica y sus familias"}</p>

          {/* Párrafo */}
          <p style={{
            fontSize: "clamp(1rem, 3vw, 1.2rem)",
            lineHeight: 1.75,
            color: "#e0f2fe",
            maxWidth: "620px",
            marginBottom: "2.5rem",
            fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
          }}>{"Un hogar sustituto que huele a aguapanela hirviendo, a sancocho de amor y a fríjoles calados con comprensión. Desde 2001 somos el hogar de quienes más lo necesitan."}</p>

          {/* Botones CTA */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => setSeccion && setSeccion('nosotros')}
              style={{
                padding: "0.95rem 2rem",
                fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
                background: "white",
                color: "#0b1120",
                border: "none",
                borderRadius: "14px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 12px 30px rgba(255,255,255,0.3)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s",
                fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-5px) scale(1.04)";
                e.target.style.boxShadow = "0 18px 40px rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 12px 30px rgba(255,255,255,0.3)";
              }}
            >
              {"Conoce nuestra historia →"}
              <div style={{
                position: "absolute",
                top: "-50%", left: "-120%",
                width: "50%", height: "200%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                transform: "skewX(-20deg)",
                animation: "shine 4s infinite"
              }} />
            </button>

            <button
              onClick={() => setSeccion && setSeccion('servicios')}
              style={{
                padding: "0.95rem 2rem",
                fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "2px solid rgba(255,255,255,0.4)",
                borderRadius: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                fontFamily: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.borderColor = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
            >
              {"Ver nuestros servicios"}
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex",
            gap: "clamp(1.5rem, 4vw, 3rem)",
            marginTop: "3rem",
            flexWrap: "wrap"
          }}>
            {[
              { num: "+25", label: "años de experiencia" },
              { num: "24/7", label: "atención continua" },
              { num: "100%", label: "enfoque humano" }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: "900",
                  color: "#3b82f6",
                  lineHeight: 1
                }}>{stat.num}</div>
                <div style={{
                  fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                  color: "rgba(255,255,255,0.7)",
                  marginTop: "0.3rem"
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Separador animado */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 4, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "clamp(60px, 10vw, 80px)" }}>
            <defs>
              <linearGradient id="r1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0c4a6e" stopOpacity="0.98" />
                <stop offset="50%"  stopColor="#1e40af" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.98" />
              </linearGradient>
              <linearGradient id="r2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#1e40af" stopOpacity="0.8" />
                <stop offset="50%"  stopColor="#3b82f6" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#1e40af" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path d="M0,40 Q360,15 720,38 Q1080,58 1440,32 L1440,120 L0,120 Z" fill="url(#r1)">
              <animate attributeName="d" dur="20s" repeatCount="indefinite"
                values="M0,40 Q360,15 720,38 Q1080,58 1440,32 L1440,120 L0,120 Z;
                        M0,48 Q360,28 720,45 Q1080,35 1440,42 L1440,120 L0,120 Z;
                        M0,40 Q360,15 720,38 Q1080,58 1440,32 L1440,120 L0,120 Z" />
            </path>
            <path d="M0,60 Q300,40 720,58 Q1140,45 1440,55 L1440,120 L0,120 Z" fill="url(#r2)">
              <animate attributeName="d" dur="16s" repeatCount="indefinite"
                values="M0,60 Q300,40 720,58 Q1140,45 1440,55 L1440,120 L0,120 Z;
                        M0,68 Q300,52 720,65 Q1140,55 1440,62 L1440,120 L0,120 Z;
                        M0,60 Q300,40 720,58 Q1140,45 1440,55 L1440,120 L0,120 Z" />
            </path>
            <rect x="0" y="105" width="1440" height="15" fill="#f0f4f8" />
          </svg>
        </div>
      </div>

      {/* ── CONTENIDO ── */}
      <div style={{
        background: "#f0f4f8",
        padding: "clamp(2rem, 6vw, 4rem) 1.5rem",
        width: "100%"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>

          {/* Introducción */}
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 3.5rem)" }}>
            <div style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
              borderRadius: "50px",
              padding: "0.4rem 1.2rem",
              marginBottom: "1rem",
              fontSize: "0.85rem",
              fontWeight: "700",
              color: "#1d4ed8",
              letterSpacing: "0.5px",
              textTransform: "uppercase"
            }}>{"¿Quiénes somos?"}</div>

            <h2 style={{
              fontSize: "clamp(1.5rem, 5vw, 2.4rem)",
              color: "#0b1120",
              marginBottom: "1rem",
              fontWeight: "800"
            }}>{"Un hogar donde el amor sana"}</h2>

            <p style={{
              fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
              color: "#475569",
              maxWidth: "750px",
              margin: "0 auto",
              lineHeight: 1.8
            }}>{"Somos un hogar sustituto para pacientes con enfermedades psiquiatricas, ubicado en Pereira, Risaralda. Desde 2001 brindamos atención integral, continua y amorosa a personas con enfermedad mental crónica, siendo un puente entre el tratamiento clínico y la vida familiar."}</p>
          </div>

          {/* Tarjetas */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(1.5rem, 3vw, 2rem)",
            maxWidth: "1100px",
            margin: "0 auto",
            width: "100%"
          }}>
            {[
              {
                img: "/images/hogar.png",
                bg: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                emoji: "🏡",
                title: "Hogar sustituto",
                desc: "No somos una clínica: somos un hogar real con rutinas, afecto y acompañamiento diario para cada residente."
              },
              {
                img: "/images/atencion.png",
                bg: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
                emoji: "⚕️",
                title: "Atención psiquiátrica",
                desc: "Acompañamiento terapéutico profesional con enfoque humano para personas con enfermedad mental crónica."
              },
              {
                img: "/images/familia.png",
                bg: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)",
                emoji: "👨‍👩‍👧",
                title: "Vínculo familiar",
                desc: "Promovemos visitas, salidas y la reintegración familiar cuando el proceso terapéutico lo permite."
              }
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  transition: "all 0.4s",
                  cursor: "pointer",
                  width: "100%"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(29,78,216,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{
                  height: "clamp(140px, 25vw, 160px)",
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1.5rem",
                  overflow: "hidden"
                }}>
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      transition: "transform 0.5s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  />
                </div>
                <div style={{ padding: "clamp(1.2rem, 3vw, 1.8rem)" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>{card.emoji}</div>
                  <h3 style={{
                    fontSize: "clamp(1.1rem, 3vw, 1.25rem)",
                    marginBottom: "0.8rem",
                    color: "#0b1120",
                    fontWeight: "700",
                    lineHeight: 1.3
                  }}>{card.title}</h3>
                  <p style={{
                    color: "#64748b",
                    lineHeight: 1.7,
                    fontSize: "clamp(0.9rem, 2vw, 0.98rem)"
                  }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Final */}
          <div style={{
            background: "linear-gradient(135deg, #0b1120 0%, #1e293b 50%, #1e40af 100%)",
            borderRadius: "clamp(16px, 4vw, 24px)",
            padding: "clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)",
            textAlign: "center",
            boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
            marginTop: "clamp(2.5rem, 5vw, 4rem)",
            width: "100%"
          }}>
            <h2 style={{
              color: "white",
              fontSize: "clamp(1.4rem, 4vw, 2rem)",
              marginBottom: "1rem",
              fontWeight: "800"
            }}>{"Más de 25 años de experiencia"}</h2>

            <p style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
              lineHeight: 1.7,
              maxWidth: "680px",
              margin: "0 auto 2rem"
            }}>{"Acompañando personas con enfermedad mental crónica con los más altos estándares de calidad y calidez humana."}</p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setSeccion && setSeccion('servicios')}
                style={{
                  padding: "0.9rem 1.8rem",
                  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                  background: "white", color: "#0b1120",
                  border: "none", borderRadius: "12px",
                  cursor: "pointer", fontWeight: "700",
                  transition: "all 0.3s", minWidth: "140px"
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.06)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >{"Ver servicios"}</button>

              <button
                onClick={() => setSeccion && setSeccion('contacto')}
                style={{
                  padding: "0.9rem 1.8rem",
                  fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
                  background: "transparent", color: "white",
                  border: "2px solid white", borderRadius: "12px",
                  cursor: "pointer", fontWeight: "700",
                  transition: "all 0.3s", minWidth: "140px"
                }}
                onMouseEnter={(e) => { e.target.style.background = "white"; e.target.style.color = "#0b1120"; }}
                onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "white"; }}
              >{"Contáctanos"}</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
