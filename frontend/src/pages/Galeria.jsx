import { useState, useEffect } from 'react';

export default function Galeria() {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mostrarSubirModal, setMostrarSubirModal] = useState(false);
  const [archivosSeleccionados, setArchivosSeleccionados] = useState([]);
  const [subiendo, setSubiendo] = useState(false);

  const PASSWORD_ADMIN = "piolin";

  useEffect(() => {
    cargarImagenes();

    const handleEsc = (e) => {
      if (e.key === 'Escape') cerrarLightbox();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const cargarImagenes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/galeria');
      if (!response.ok) throw new Error('Error en API');

      const data = await response.json();

      if (data && data.length > 0) {
        setImagenes(
          data.map((img) => ({
            ...img,
            titulo: img.titulo || 'Momento especial',
            descripcion: img.descripcion || '',
            imagen: img.imagen?.startsWith('http')
              ? img.imagen
              : `http://localhost:8000/storage/${img.imagen}`,
          }))
        );
      } else {
        usarFallback();
      }
    } catch (error) {
      console.error('Error al cargar galería:', error);
      usarFallback();
    } finally {
      setLoading(false);
    }
  };

  const usarFallback = () => {
    setImagenes([
      { id: 1, titulo: 'Actividades recreativas', descripcion: 'Momentos de alegría compartida', imagen: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800' },
      { id: 2, titulo: 'Terapia ocupacional', descripcion: 'Talleres de arte y manualidades', imagen: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800' },
      { id: 3, titulo: 'Momentos de convivencia', descripcion: 'Compartiendo en familia', imagen: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800' },
      { id: 4, titulo: 'Espacios al aire libre', descripcion: 'Conexión con la naturaleza', imagen: 'https://images.unsplash.com/photo-1441986380878-c4248f5b8b5b?w=800' },
      { id: 5, titulo: 'Celebraciones especiales', descripcion: 'Festejando juntos', imagen: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800' },
      { id: 6, titulo: 'Cuidado diario', descripcion: 'Atención profesional y cariñosa', imagen: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800' }
    ]);
  };

  const abrirLightbox = (index) => {
    setSelectedIndex(index);
    setImagenSeleccionada(imagenes[index]);
  };

  const cerrarLightbox = () => setImagenSeleccionada(null);

  const siguienteImagen = () => {
    const next = (selectedIndex + 1) % imagenes.length;
    setSelectedIndex(next);
    setImagenSeleccionada(imagenes[next]);
  };

  const anteriorImagen = () => {
    const prev = (selectedIndex - 1 + imagenes.length) % imagenes.length;
    setSelectedIndex(prev);
    setImagenSeleccionada(imagenes[prev]);
  };

  const verificarAdmin = () => {
    const pass = prompt("Ingresa la contraseña de administrador:");
    if (pass === PASSWORD_ADMIN) {
      setMostrarSubirModal(true);
    } else {
      alert("Contraseña incorrecta.");
    }
  };

  const manejarCambioArchivos = (e) => {
    const files = Array.from(e.target.files || []);
    setArchivosSeleccionados(files);
  };

  const cerrarModalSubida = () => {
    setMostrarSubirModal(false);
    setArchivosSeleccionados([]);
    setSubiendo(false);
  };

  const manejarSubida = async () => {
    if (!archivosSeleccionados.length) {
      alert("Primero selecciona una o varias imágenes");
      return;
    }

    const formData = new FormData();

    archivosSeleccionados.forEach((archivo) => {
      formData.append('imagenes[]', archivo);
    });

    try {
      setSubiendo(true);

      const res = await fetch('http://localhost:8000/api/admin/galeria', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Error ${res.status}`);
      }

      alert(`¡${archivosSeleccionados.length} imagen(es) subida(s) con éxito!`);
      cerrarModalSubida();
      cargarImagenes();
    } catch (err) {
      alert("Error al subir las imágenes: " + err.message);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          minHeight: "70vh",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          background: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80') center/cover no-repeat",
          display: "flex",
          alignItems: "center",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(11,17,32,0.88) 0%, rgba(30,64,175,0.75) 100%)",
            zIndex: 1
          }}
        />

        <button
          onClick={verificarAdmin}
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "1.2rem",
            zIndex: 10,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(29,78,216,0.85)",
            color: "white",
            border: "2px solid rgba(255,255,255,0.3)",
            fontSize: "1.5rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            transition: "all 0.3s"
          }}
          title="Subir imágenes"
        >
          +
        </button>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "var(--max-width)",
            margin: "0 auto",
            padding: "2rem 1.5rem 6rem",
            width: "100%",
            textAlign: "center"
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
              padding: '0.6rem 1.8rem',
              borderRadius: '50px',
              display: 'inline-block',
              marginBottom: '2rem',
              border: '1px solid rgba(255,255,255,0.25)'
            }}
          >
            <span
              style={{
                fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                fontWeight: '700',
                letterSpacing: '1.5px',
                color: 'white',
                textTransform: 'uppercase'
              }}
            >
              📸 Galería
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.8rem)",
              fontWeight: "900",
              color: "white",
              marginBottom: "1.5rem",
              textShadow: "0 6px 25px rgba(0,0,0,0.6)"
            }}
          >
            Nuestra Galería
          </h1>

          <p
            style={{
              fontSize: "clamp(1.1rem, 3vw, 1.35rem)",
              color: "#e0f2fe",
              maxWidth: "720px",
              margin: "0 auto",
              lineHeight: 1.6,
              textShadow: "0 2px 12px rgba(0,0,0,0.5)"
            }}
          >
            Momentos especiales y actividades que realizamos día a día en Refugio Nazareth
          </p>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 3, lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "clamp(60px, 10vw, 80px)" }}
          >
            <defs>
              <linearGradient id="galGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0c4a6e" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
            </defs>
            <path d="M0,30 Q360,15 720,35 Q1080,50 1440,25 L1440,100 L0,100 Z" fill="url(#galGrad)" opacity="0.95">
              <animate
                attributeName="d"
                dur="20s"
                repeatCount="indefinite"
                values="
                  M0,30 Q360,15 720,35 Q1080,50 1440,25 L1440,100 L0,100 Z;
                  M0,40 Q360,25 720,45 Q1080,30 1440,35 L1440,100 L0,100 Z;
                  M0,30 Q360,15 720,35 Q1080,50 1440,25 L1440,100 L0,100 Z"
              />
            </path>
            <rect x="0" y="85" width="1440" height="15" fill="#f0f4f8" />
          </svg>
        </div>
      </div>

      <div style={{ background: "#f0f4f8", padding: "clamp(3rem, 6vw, 5rem) 1.5rem" }}>
        <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", width: "100%" }}>
          {loading ? (
            <div
              style={{
                textAlign: 'center',
                padding: '6rem 2rem',
                minHeight: '50vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  border: '5px solid #e0f2fe',
                  borderTop: '5px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '1.5rem'
                }}
              />
              <p style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: '500' }}>
                Cargando galería...
              </p>
            </div>
          ) : imagenes.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '6rem 2rem',
                minHeight: '50vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 10px 40px rgba(59,130,246,0.1)'
              }}
            >
              <h3
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                  color: '#0b1120',
                  marginBottom: '1rem'
                }}
              >
                Aún no hay imágenes
              </h3>
              <p style={{ color: '#64748b', fontSize: '1.15rem', maxWidth: '500px' }}>
                Estamos preparando la galería con momentos especiales del refugio
              </p>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                <h2
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.3rem)',
                    color: '#0b1120',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}
                >
                  Momentos que nos definen
                </h2>
                <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
                  {imagenes.length} {imagenes.length === 1 ? 'imagen' : 'imágenes'} en nuestra colección
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 'clamp(1.2rem, 2.5vw, 2rem)'
                }}
              >
                {imagenes.map((imagen, index) => (
                  <div
                    key={imagen.id || index}
                    onClick={() => abrirLightbox(index)}
                    style={{
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      aspectRatio: '4/3',
                      background: '#e2e8f0',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                      transition: 'all 0.4s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(59,130,246,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                    }}
                  >
                    <img
                      src={imagen.imagen}
                      alt={imagen.titulo}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {imagen.titulo && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(11,17,32,0.9) 0%, transparent 100%)',
                          color: 'white',
                          padding: '2.5rem 1.2rem 1rem',
                          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                          fontWeight: '600'
                        }}
                      >
                        {imagen.titulo}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {imagenSeleccionada && (
        <div
          onClick={cerrarLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(11,17,32,0.96)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '2rem',
            cursor: 'pointer'
          }}
        >
          <button
            onClick={cerrarLightbox}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(239,68,68,0.8)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
          >
            ×
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); anteriorImagen(); }}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              fontSize: '2.5rem',
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(59,130,246,0.7)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            ‹
          </button>

          <div style={{ maxWidth: '90vw', maxHeight: '90vh', textAlign: 'center' }}>
            <img
              src={imagenSeleccionada.imagen}
              alt={imagenSeleccionada.titulo}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                borderRadius: '12px',
                objectFit: 'contain',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
              }}
              onClick={(e) => e.stopPropagation()}
            />
            {imagenSeleccionada.titulo && (
              <div
                style={{
                  marginTop: '1rem',
                  color: 'white',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <strong style={{ fontSize: '1.1rem' }}>{imagenSeleccionada.titulo}</strong>
                {imagenSeleccionada.descripcion && (
                  <p style={{ margin: '0.4rem 0 0', opacity: 0.85, fontSize: '0.95rem' }}>
                    {imagenSeleccionada.descripcion}
                  </p>
                )}
              </div>
            )}
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.8rem', fontSize: '0.9rem' }}>
              {selectedIndex + 1} / {imagenes.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); siguienteImagen(); }}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              fontSize: '2.5rem',
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(59,130,246,0.7)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            ›
          </button>
        </div>
      )}

      {mostrarSubirModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '2rem'
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#0b1120', fontWeight: '700' }}>
              📤 Subir nuevas imágenes
            </h3>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={manejarCambioArchivos}
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '1.5rem',
                padding: '0.75rem',
                border: '2px dashed #3b82f6',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            />

            {archivosSeleccionados.length > 0 && (
              <div
                style={{
                  background: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: '8px',
                  padding: '0.8rem 1rem',
                  marginBottom: '1.5rem'
                }}
              >
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#0369a1',
                    margin: '0 0 0.5rem',
                    fontWeight: '600'
                  }}
                >
                  ✅ {archivosSeleccionados.length} archivo(s) seleccionado(s)
                </p>

                <div style={{ maxHeight: '140px', overflowY: 'auto' }}>
                  {archivosSeleccionados.map((archivo, index) => (
                    <p
                      key={index}
                      style={{
                        margin: '0.2rem 0',
                        fontSize: '0.85rem',
                        color: '#0f172a'
                      }}
                    >
                      • {archivo.name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                onClick={cerrarModalSubida}
                style={{
                  padding: '0.8rem 1.5rem',
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem'
                }}
              >
                Cancelar
              </button>

              <button
                onClick={manejarSubida}
                disabled={!archivosSeleccionados.length || subiendo}
                style={{
                  padding: '0.8rem 1.8rem',
                  background: archivosSeleccionados.length && !subiendo
                    ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                    : '#cbd5e1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: archivosSeleccionados.length && !subiendo ? 'pointer' : 'not-allowed',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  boxShadow: archivosSeleccionados.length && !subiendo
                    ? '0 4px 15px rgba(59,130,246,0.4)'
                    : 'none'
                }}
              >
                {subiendo ? 'Subiendo...' : 'Subir imágenes'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}