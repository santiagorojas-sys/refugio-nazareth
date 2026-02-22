import { useState, useEffect } from 'react';

const API = 'http://localhost:8000/api';
const PASSWORD_ADMIN = "piolin";

export default function Comunidad() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publicacionAbierta, setPublicacionAbierta] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [comentarioTexto, setComentarioTexto] = useState('');
  const [nombreComentario, setNombreComentario] = useState('');
  const [enviandoComentario, setEnviandoComentario] = useState(false);

  // Form nueva publicación
  const [form, setForm] = useState({
    titulo: '', contenido: '', autor: 'Refugio Nazareth'
  });
  const [imagenPrincipal, setImagenPrincipal] = useState(null);
  const [imagenesExtra, setImagenesExtra] = useState([]);
  const [publicando, setPublicando] = useState(false);

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const cargarPublicaciones = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/comunidad`);
      const data = await res.json();
      setPublicaciones(data);
    } catch (err) {
      console.error('Error cargando publicaciones:', err);
    } finally {
      setLoading(false);
    }
  };

  const abrirPublicacion = async (id) => {
    try {
      const res = await fetch(`${API}/comunidad/${id}`);
      const data = await res.json();
      setPublicacionAbierta(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const verificarAdmin = () => {
    const pass = prompt("Contraseña de administrador:");
    if (pass === PASSWORD_ADMIN) setMostrarFormulario(true);
    else alert("Contraseña incorrecta.");
  };

  const publicar = async () => {
    if (!form.titulo || !form.contenido) {
      alert('El título y contenido son obligatorios');
      return;
    }
    setPublicando(true);
    try {
      const formData = new FormData();
      formData.append('titulo', form.titulo);
      formData.append('contenido', form.contenido);
      formData.append('autor', form.autor);
      if (imagenPrincipal) formData.append('imagen_principal', imagenPrincipal);
      imagenesExtra.forEach((img) => formData.append('imagenes_extra[]', img));

      const res = await fetch(`${API}/admin/comunidad`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Error al publicar');
      alert('¡Publicación creada!');
      setMostrarFormulario(false);
      setForm({ titulo: '', contenido: '', autor: 'Refugio Nazareth' });
      setImagenPrincipal(null);
      setImagenesExtra([]);
      cargarPublicaciones();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setPublicando(false);
    }
  };

  const comentar = async () => {
    if (!comentarioTexto.trim()) return;
    setEnviandoComentario(true);
    try {
      const res = await fetch(`${API}/comunidad/${publicacionAbierta.id}/comentar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contenido: comentarioTexto,
          nombre: nombreComentario || 'Anónimo'
        })
      });
      if (!res.ok) throw new Error('Error');
      setComentarioTexto('');
      setNombreComentario('');
      abrirPublicacion(publicacionAbierta.id);
    } catch (err) {
      alert('Error al comentar');
    } finally {
      setEnviandoComentario(false);
    }
  };

  const reaccionar = async (id, tipo) => {
    try {
      await fetch(`${API}/comunidad/${id}/reaccionar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo })
      });
      if (publicacionAbierta?.id === id) abrirPublicacion(id);
      cargarPublicaciones();
    } catch (err) {
      console.error('Error al reaccionar');
    }
  };

  const buildUrl = (path) => path?.startsWith('http')
    ? path
    : `http://localhost:8000/storage/${path}`;

  const formatFecha = (fecha) => new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <>
      {/* ── HERO ── */}
      <div style={{
  position: "relative", minHeight: "60vh",
  width: "100vw",
  marginLeft: "calc(-50vw + 50%)",
  marginRight: "calc(-50vw + 50%)",
  background: "linear-gradient(135deg, #0b1120 0%, #1e293b 50%, #1e40af 100%)",
  display: "flex", alignItems: "center", overflow: "hidden"
}}>

        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 60% 50%, rgba(59,130,246,0.15) 0%, transparent 70%)"
        }} />

        {/* Botón admin */}
        <button onClick={verificarAdmin} style={{
          position: "absolute", top: "5rem", right: "1.2rem",
zIndex: 10,
          width: "44px", height: "44px", borderRadius: "50%",
          background: "rgba(29,78,216,0.85)", color: "white",
          border: "2px solid rgba(255,255,255,0.3)", fontSize: "1.5rem",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s"
        }} title="Nueva publicación">+</button>

        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: "var(--max-width)", margin: "0 auto",
          padding: "2rem 1.5rem 6rem", width: "100%", textAlign: "center"
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
            padding: '0.5rem 1.5rem', borderRadius: '50px',
            display: 'inline-block', marginBottom: '1.5rem',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>
              🏡 Comunidad
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: "900",
            color: "white", marginBottom: "1rem"
          }}>{"Nuestros Momentos"}</h1>
          <p style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "#e0f2fe",
            maxWidth: "600px", margin: "0 auto", lineHeight: 1.6
          }}>{"Noticias, actividades y momentos especiales de nuestra comunidad"}</p>
        </div>

        {/* Separador */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", zIndex: 3, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "clamp(50px, 8vw, 70px)" }}>
            <path d="M0,30 Q360,10 720,32 Q1080,50 1440,20 L1440,80 L0,80 Z" fill="#f0f4f8" opacity="0.98" />
          </svg>
        </div>
      </div>

      {/* ── CONTENIDO ── */}
      <div style={{ background: "#f0f4f8", padding: "clamp(2rem, 5vw, 4rem) 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 55, height: 55,
                border: '5px solid #e0f2fe', borderTop: '5px solid #3b82f6',
                borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem'
              }} />
              <p style={{ color: '#64748b', fontWeight: '500' }}>Cargando publicaciones...</p>
            </div>
          ) : publicaciones.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '5rem 2rem',
              background: 'white', borderRadius: '20px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.06)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ color: '#0b1120', marginBottom: '0.5rem', fontSize: '1.4rem' }}>Aún no hay publicaciones</h3>
              <p style={{ color: '#64748b' }}>Pronto compartiremos momentos especiales aquí</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {publicaciones.map((pub) => (
                <div key={pub.id} style={{
                  background: 'white', borderRadius: '20px',
                  overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.07)',
                  transition: 'all 0.3s'
                }}>
                  {/* Imagen principal */}
                  {pub.imagen_principal && (
                    <div style={{ height: 'clamp(200px, 40vw, 320px)', overflow: 'hidden' }}>
                      <img src={buildUrl(pub.imagen_principal)} alt={pub.titulo}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.04)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </div>
                  )}

                  <div style={{ padding: 'clamp(1.2rem, 3vw, 2rem)' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div>
                        <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', color: '#0b1120', fontWeight: '800', marginBottom: '0.3rem' }}>
                          {pub.titulo}
                        </h2>
                        <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                          ✍️ {pub.autor} · {formatFecha(pub.created_at)}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                        <span>💬 {pub.comentarios_count || 0}</span>
                        <span>❤️ {pub.reacciones_count || 0}</span>
                      </div>
                    </div>

                    {/* Contenido (preview) */}
                    <p style={{
                      color: '#475569', lineHeight: 1.8,
                      fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                      display: '-webkit-box', WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>{pub.contenido}</p>

                    {/* Reacciones rápidas + leer más */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.2rem', flexWrap: 'wrap', gap: '0.8rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {['❤️', '👏', '🙏'].map((emoji) => (
                          <button key={emoji} onClick={() => reaccionar(pub.id, emoji)}
                            style={{
                              background: '#f1f5f9', border: 'none', borderRadius: '20px',
                              padding: '0.4rem 0.8rem', cursor: 'pointer', fontSize: '1rem',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#dbeafe'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#f1f5f9'}
                          >{emoji}</button>
                        ))}
                      </div>
                      <button onClick={() => abrirPublicacion(pub.id)} style={{
                        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        color: 'white', border: 'none', borderRadius: '10px',
                        padding: '0.6rem 1.4rem', cursor: 'pointer',
                        fontWeight: '600', fontSize: '0.9rem', transition: 'all 0.3s'
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >Leer más →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── MODAL PUBLICACIÓN COMPLETA ── */}
      {publicacionAbierta && (
        <div onClick={() => setPublicacionAbierta(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(11,17,32,0.85)',
          backdropFilter: 'blur(8px)', zIndex: 9999,
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          padding: '2rem 1rem', overflowY: 'auto'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'white', borderRadius: '20px',
            maxWidth: '720px', width: '100%',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            marginTop: '1rem', marginBottom: '2rem'
          }}>
            {/* Imagen principal */}
            {publicacionAbierta.imagen_principal && (
              <div style={{ height: 'clamp(200px, 40vw, 300px)', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
                <img src={buildUrl(publicacionAbierta.imagen_principal)}
                  alt={publicacionAbierta.titulo}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
              {/* Cerrar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', color: '#0b1120', fontWeight: '800' }}>
                    {publicacionAbierta.titulo}
                  </h2>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    ✍️ {publicacionAbierta.autor} · {formatFecha(publicacionAbierta.created_at)}
                  </span>
                </div>
                <button onClick={() => setPublicacionAbierta(null)} style={{
                  background: '#f1f5f9', border: 'none', borderRadius: '50%',
                  width: '36px', height: '36px', fontSize: '1.2rem',
                  cursor: 'pointer', flexShrink: 0
                }}>×</button>
              </div>

              {/* Contenido completo */}
              <p style={{ color: '#475569', lineHeight: 1.9, fontSize: '1.05rem', marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
                {publicacionAbierta.contenido}
              </p>

              {/* Imágenes extra */}
              {publicacionAbierta.imagenes_extra?.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '0.8rem', marginBottom: '1.5rem'
                }}>
                  {publicacionAbierta.imagenes_extra.map((img, i) => (
                    <img key={i} src={buildUrl(img)} alt={`extra-${i}`}
                      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '10px' }} />
                  ))}
                </div>
              )}

              {/* Reacciones */}
              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {['❤️', '👏', '🙏'].map((emoji) => {
                  const count = publicacionAbierta.reacciones?.filter(r => r.tipo === emoji).length || 0;
                  return (
                    <button key={emoji} onClick={() => reaccionar(publicacionAbierta.id, emoji)} style={{
                      background: '#f1f5f9', border: '2px solid #e2e8f0',
                      borderRadius: '20px', padding: '0.5rem 1rem',
                      cursor: 'pointer', fontSize: '1rem', fontWeight: '600',
                      transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem'
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.borderColor = '#3b82f6'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                    >
                      {emoji} <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Separador */}
              <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '1.5rem' }} />

              {/* Comentarios */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0b1120', marginBottom: '1rem' }}>
                💬 Comentarios ({publicacionAbierta.comentarios?.length || 0})
              </h3>

              {/* Lista comentarios */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                {publicacionAbierta.comentarios?.length === 0 ? (
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Sé el primero en comentar</p>
                ) : (
                  publicacionAbierta.comentarios?.map((com) => (
                    <div key={com.id} style={{
                      background: '#f8fafc', borderRadius: '12px',
                      padding: '0.9rem 1.1rem',
                      borderLeft: '3px solid #3b82f6'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1e40af' }}>{com.nombre}</span>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{formatFecha(com.created_at)}</span>
                      </div>
                      <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>{com.contenido}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Formulario comentar */}
              <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '1.2rem' }}>
                <input
                  type="text" placeholder="Tu nombre (opcional)"
                  value={nombreComentario}
                  onChange={(e) => setNombreComentario(e.target.value)}
                  style={{
                    width: '100%', padding: '0.7rem 1rem', marginBottom: '0.8rem',
                    border: '1px solid #e2e8f0', borderRadius: '10px',
                    fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box'
                  }}
                />
                <textarea
                  placeholder="Escribe un comentario..."
                  value={comentarioTexto}
                  onChange={(e) => setComentarioTexto(e.target.value)}
                  rows={3}
                  style={{
                    width: '100%', padding: '0.7rem 1rem', marginBottom: '0.8rem',
                    border: '1px solid #e2e8f0', borderRadius: '10px',
                    fontSize: '0.95rem', resize: 'vertical', outline: 'none',
                    fontFamily: 'inherit', boxSizing: 'border-box'
                  }}
                />
                <button onClick={comentar} disabled={enviandoComentario || !comentarioTexto.trim()} style={{
                  background: comentarioTexto.trim()
                    ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                    : '#cbd5e1',
                  color: 'white', border: 'none', borderRadius: '10px',
                  padding: '0.7rem 1.5rem', cursor: comentarioTexto.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: '600', fontSize: '0.95rem', transition: 'all 0.3s'
                }}>
                  {enviandoComentario ? 'Enviando...' : 'Comentar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL NUEVA PUBLICACIÓN ── */}
      {mostrarFormulario && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          zIndex: 10000, padding: '2rem 1rem', overflowY: 'auto'
        }}>
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            maxWidth: '600px', width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0b1120' }}>📝 Nueva publicación</h3>
              <button onClick={() => setMostrarFormulario(false)} style={{
                background: '#f1f5f9', border: 'none', borderRadius: '50%',
                width: '36px', height: '36px', fontSize: '1.2rem', cursor: 'pointer'
              }}>×</button>
            </div>

            {/* Título */}
            <input type="text" placeholder="Título de la publicación *"
              value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              style={{
                width: '100%', padding: '0.8rem 1rem', marginBottom: '1rem',
                border: '2px solid #e2e8f0', borderRadius: '10px',
                fontSize: '1rem', outline: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />

            {/* Autor */}
            <input type="text" placeholder="Autor"
              value={form.autor} onChange={(e) => setForm({ ...form, autor: e.target.value })}
              style={{
                width: '100%', padding: '0.8rem 1rem', marginBottom: '1rem',
                border: '2px solid #e2e8f0', borderRadius: '10px',
                fontSize: '1rem', outline: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />

            {/* Contenido */}
            <textarea placeholder="Escribe el contenido de la publicación *"
              value={form.contenido} onChange={(e) => setForm({ ...form, contenido: e.target.value })}
              rows={6}
              style={{
                width: '100%', padding: '0.8rem 1rem', marginBottom: '1rem',
                border: '2px solid #e2e8f0', borderRadius: '10px',
                fontSize: '1rem', resize: 'vertical', outline: 'none',
                fontFamily: 'inherit', boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />

            {/* Imagen principal */}
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
              Imagen principal
            </label>
            <input type="file" accept="image/*"
              onChange={(e) => setImagenPrincipal(e.target.files[0])}
              style={{
                display: 'block', width: '100%', marginBottom: '1rem',
                padding: '0.7rem', border: '2px dashed #3b82f6',
                borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem',
                boxSizing: 'border-box'
              }}
            />

            {/* Imágenes extra */}
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
              Fotos adicionales (máximo 4)
            </label>
            <input type="file" accept="image/*" multiple
              onChange={(e) => setImagenesExtra(Array.from(e.target.files).slice(0, 4))}
              style={{
                display: 'block', width: '100%', marginBottom: '1.5rem',
                padding: '0.7rem', border: '2px dashed #93c5fd',
                borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem',
                boxSizing: 'border-box'
              }}
            />

            {imagenesExtra.length > 0 && (
              <p style={{
                background: '#f0f9ff', border: '1px solid #bae6fd',
                borderRadius: '8px', padding: '0.5rem 1rem',
                fontSize: '0.85rem', color: '#0369a1', marginBottom: '1rem'
              }}>
                ✅ {imagenesExtra.length} foto(s) adicional(es) seleccionada(s)
              </p>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setMostrarFormulario(false)} style={{
                padding: '0.8rem 1.5rem', background: '#f1f5f9',
                border: 'none', borderRadius: '10px', cursor: 'pointer',
                fontWeight: '600'
              }}>Cancelar</button>
              <button onClick={publicar} disabled={publicando} style={{
                padding: '0.8rem 2rem',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white', border: 'none', borderRadius: '10px',
                cursor: publicando ? 'not-allowed' : 'pointer',
                fontWeight: '700', fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(59,130,246,0.4)'
              }}>
                {publicando ? 'Publicando...' : 'Publicar 🚀'}
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
