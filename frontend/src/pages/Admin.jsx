import { useState, useEffect } from 'react';

const API = 'http://localhost:8000/api';
const PASSWORD_ADMIN = "piolin";

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [tab, setTab] = useState('publicaciones');

  const [publicaciones, setPublicaciones] = useState([]);
  const [loadingPubs, setLoadingPubs] = useState(false);

  const [editandoId, setEditandoId] = useState(null);
  const [editForm, setEditForm] = useState({ titulo: '', contenido: '' });

  const [comentariosAbiertos, setComentariosAbiertos] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loadingComentarios, setLoadingComentarios] = useState(false);

  const [galeria, setGaleria] = useState([]);
  const [loadingGal, setLoadingGal] = useState(false);

  // ── LOGIN ──
  const login = () => {
    if (passwordInput === PASSWORD_ADMIN) {
      setAutenticado(true);
      cargarPublicaciones();
      cargarGaleria();
    } else {
      alert('Contraseña incorrecta');
    }
  };

  // ── CARGAR DATOS ──
  const cargarPublicaciones = async () => {
    setLoadingPubs(true);
    try {
      const res = await fetch(`${API}/comunidad`);
      const data = await res.json();
      setPublicaciones(data);
    } catch (err) {
      console.error('Error cargando publicaciones:', err);
    } finally {
      setLoadingPubs(false);
    }
  };

  const cargarGaleria = async () => {
    setLoadingGal(true);
    try {
      const res = await fetch(`${API}/galeria`);
      const data = await res.json();
      setGaleria(data);
    } catch (err) {
      console.error('Error cargando galería:', err);
    } finally {
      setLoadingGal(false);
    }
  };

  const cargarComentarios = async (pubId) => {
    setLoadingComentarios(true);
    setComentarios([]);
    try {
      const res = await fetch(`${API}/admin/comunidad/${pubId}/comentarios`);
      const data = await res.json();
      setComentarios(data);
    } catch (err) {
      console.error('Error cargando comentarios:', err);
      alert('Error al cargar comentarios');
    } finally {
      setLoadingComentarios(false);
    }
  };

  // ── PUBLICACIONES ──
  const eliminarPublicacion = async (id) => {
    if (!confirm('¿Eliminar esta publicación y TODOS sus comentarios?')) return;
    try {
      await fetch(`${API}/admin/comunidad/${id}`, { method: 'DELETE' });
      cargarPublicaciones();
      if (comentariosAbiertos === id) setComentariosAbiertos(null);
    } catch (err) {
      alert('Error al eliminar publicación');
    }
  };

  const iniciarEdicion = (pub) => {
    setEditandoId(pub.id);
    setEditForm({ titulo: pub.titulo || '', contenido: pub.contenido || '' });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setEditForm({ titulo: '', contenido: '' });
  };

  const guardarEdicion = async (id) => {
    if (!editForm.titulo.trim()) { alert('El título no puede estar vacío'); return; }
    try {
      const res = await fetch(`${API}/admin/comunidad/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (!res.ok) throw new Error('Error en el servidor');
      cargarPublicaciones();
      cancelarEdicion();
      alert('✅ Publicación actualizada');
    } catch (err) {
      console.error(err);
      alert('No se pudo guardar los cambios');
    }
  };

  // ── COMENTARIOS ──
  const toggleComentarios = (pubId) => {
    if (comentariosAbiertos === pubId) {
      setComentariosAbiertos(null);
    } else {
      setComentariosAbiertos(pubId);
      cargarComentarios(pubId);
    }
  };

  const eliminarComentario = async (comentarioId, pubId) => {
    if (!confirm('¿Eliminar este comentario?')) return;
    try {
      await fetch(`${API}/admin/comentarios/${comentarioId}`, { method: 'DELETE' });
      cargarComentarios(pubId);
      cargarPublicaciones();
    } catch (err) {
      alert('Error al eliminar comentario');
    }
  };

  // ── GALERÍA ──
  const eliminarImagen = async (id) => {
    if (!confirm('¿Eliminar esta imagen de la galería?')) return;
    try {
      await fetch(`${API}/admin/galeria/${id}`, { method: 'DELETE' });
      cargarGaleria();
    } catch (err) {
      alert('Error al eliminar imagen');
    }
  };

  // ── HELPERS ──
const buildUrl = (img) => {
  if (!img) return '';
  const ruta = img.ruta || img.url || img.imagen || img.path || '';
  if (!ruta) return '';
  if (ruta.startsWith('http')) return ruta;
  return `http://localhost:8000/storage/${ruta}`;
};


  const formatFecha = (fecha) =>
    new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

  // ══════════════════════════════════════════════
  // PANTALLA DE LOGIN
  // ══════════════════════════════════════════════
  if (!autenticado) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '80vh', background: '#f0f4f8'
      }}>
        <div style={{
          background: 'white', padding: '3rem 2.5rem', borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)', width: '340px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔐</div>
          <h2 style={{ margin: '0 0 0.3rem', color: '#1e40af' }}>Panel Admin</h2>
          <p style={{ color: '#64748b', margin: '0 0 2rem', fontSize: '0.9rem' }}>
            Refugio Nazareth
          </p>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Contraseña"
            style={{
              width: '100%', padding: '0.9rem', fontSize: '1rem',
              borderRadius: '10px', border: '2px solid #e2e8f0',
              marginBottom: '1rem', boxSizing: 'border-box', textAlign: 'center'
            }}
          />
          <button onClick={login} style={{
            width: '100%', padding: '0.9rem', background: '#3b82f6',
            color: 'white', border: 'none', borderRadius: '10px',
            fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold'
          }}>
            Entrar
          </button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════
  // PANEL PRINCIPAL
  // ══════════════════════════════════════════════
  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
        color: 'white', padding: '1.5rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.4rem' }}>⚙️ Panel de Administración</h1>
          <p style={{ margin: '0.2rem 0 0', opacity: 0.8, fontSize: '0.85rem' }}>
            Refugio Nazareth
          </p>
        </div>
        <button onClick={() => setAutenticado(false)} style={{
          background: 'rgba(255,255,255,0.2)', color: 'white',
          border: 'none', borderRadius: '8px', padding: '0.5rem 1rem',
          cursor: 'pointer', fontSize: '0.85rem'
        }}>
          Cerrar sesión
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        background: 'white', borderBottom: '1px solid #e2e8f0',
        display: 'flex', padding: '0 2rem'
      }}>
        {['publicaciones', 'galeria'].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '1rem 1.5rem', border: 'none', cursor: 'pointer',
            background: 'transparent', fontSize: '0.95rem', fontWeight: tab === t ? '700' : '400',
            color: tab === t ? '#1e40af' : '#64748b',
            borderBottom: tab === t ? '3px solid #3b82f6' : '3px solid transparent',
            textTransform: 'capitalize'
          }}>
            {t === 'publicaciones' ? '📝 Publicaciones' : '🖼️ Galería'}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* ── TAB PUBLICACIONES ── */}
        {tab === 'publicaciones' && (
          <div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '1.5rem'
            }}>
              <h2 style={{ margin: 0, color: '#1e293b' }}>
                Publicaciones ({publicaciones.length})
              </h2>
              <button onClick={cargarPublicaciones} style={{
                padding: '0.6rem 1.2rem', background: '#e0f2fe',
                border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
              }}>
                🔄 Actualizar
              </button>
            </div>

            {loadingPubs ? (
              <p style={{ textAlign: 'center', color: '#64748b' }}>Cargando publicaciones...</p>
            ) : publicaciones.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#94a3b8' }}>No hay publicaciones aún.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {publicaciones.map((pub) => (
                  <div key={pub.id} style={{
                    background: 'white', borderRadius: '14px',
                    padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
                  }}>

                    {/* ── MODO EDICIÓN ── */}
                    {editandoId === pub.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
                          EDITANDO PUBLICACIÓN #{pub.id}
                        </p>
                        <input
                          value={editForm.titulo}
                          onChange={(e) => setEditForm({ ...editForm, titulo: e.target.value })}
                          placeholder="Título"
                          style={{
                            padding: '0.9rem', fontSize: '1.1rem', fontWeight: 'bold',
                            borderRadius: '10px', border: '2px solid #3b82f6',
                            width: '100%', boxSizing: 'border-box'
                          }}
                        />
                        <textarea
                          value={editForm.contenido}
                          onChange={(e) => setEditForm({ ...editForm, contenido: e.target.value })}
                          placeholder="Contenido"
                          rows={6}
                          style={{
                            padding: '0.9rem', borderRadius: '10px',
                            border: '2px solid #3b82f6', resize: 'vertical',
                            fontFamily: 'inherit', fontSize: '0.95rem',
                            width: '100%', boxSizing: 'border-box'
                          }}
                        />
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                          <button onClick={cancelarEdicion} style={{
                            padding: '0.7rem 1.5rem', background: '#e2e8f0',
                            border: 'none', borderRadius: '8px', cursor: 'pointer',
                            fontWeight: '600'
                          }}>
                            ✕ Cancelar
                          </button>
                          <button onClick={() => guardarEdicion(pub.id)} style={{
                            padding: '0.7rem 1.5rem', background: '#22c55e',
                            color: 'white', border: 'none', borderRadius: '8px',
                            cursor: 'pointer', fontWeight: '600'
                          }}>
                            💾 Guardar
                          </button>
                        </div>
                      </div>

                    ) : (
                    /* ── MODO VISTA ── */
                      <>
                        <div style={{
                          display: 'flex', justifyContent: 'space-between',
                          alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap'
                        }}>
                          <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 0.5rem', color: '#1e40af', fontSize: '1.1rem' }}>
                              {pub.titulo}
                            </h3>
                            <p style={{
                              margin: '0 0 0.7rem', color: '#374151',
                              whiteSpace: 'pre-wrap', fontSize: '0.92rem',
                              maxHeight: '80px', overflow: 'hidden'
                            }}>
                              {pub.contenido}
                            </p>
                            <small style={{ color: '#94a3b8' }}>
                              ✍️ {pub.autor} · 📅 {formatFecha(pub.created_at)}
                            </small>
                          </div>

                          {/* Botones acción */}
                          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                            <button onClick={() => toggleComentarios(pub.id)} style={{
                              padding: '0.5rem 1rem',
                              background: comentariosAbiertos === pub.id ? '#bfdbfe' : '#e0f2fe',
                              border: 'none', borderRadius: '8px', cursor: 'pointer',
                              fontSize: '0.85rem', fontWeight: '600'
                            }}>
                              💬 {pub.comentarios_count || 0}
                            </button>
                            <button onClick={() => iniciarEdicion(pub)} style={{
                              padding: '0.5rem 1rem', background: '#fef9c3',
                              border: 'none', borderRadius: '8px', cursor: 'pointer',
                              fontSize: '0.85rem', fontWeight: '600'
                            }}>
                              ✏️ Editar
                            </button>
                            <button onClick={() => eliminarPublicacion(pub.id)} style={{
                              padding: '0.5rem 1rem', background: '#fee2e2',
                              color: '#b91c1c', border: 'none', borderRadius: '8px',
                              cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600'
                            }}>
                              🗑️ Eliminar
                            </button>
                          </div>
                        </div>

                        {/* ── SECCIÓN COMENTARIOS ── */}
                        {comentariosAbiertos === pub.id && (
                          <div style={{
                            marginTop: '1.5rem', paddingTop: '1.2rem',
                            borderTop: '2px solid #e0f2fe'
                          }}>
                            <h4 style={{ margin: '0 0 1rem', color: '#1e40af' }}>
                              💬 Comentarios
                            </h4>
                            {loadingComentarios ? (
                              <p style={{ color: '#64748b' }}>Cargando comentarios...</p>
                            ) : comentarios.length === 0 ? (
                              <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                                Esta publicación no tiene comentarios.
                              </p>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {comentarios.map((com) => (
                                  <div key={com.id} style={{
                                    background: '#f8fafc', padding: '1rem',
                                    borderRadius: '10px', position: 'relative',
                                    borderLeft: '4px solid #3b82f6'
                                  }}>
                                    <p style={{
                                      margin: '0 0 0.3rem', fontWeight: '700',
                                      fontSize: '0.9rem', color: '#1e40af'
                                    }}>
                                      👤 {com.nombre || 'Anónimo'}
                                    </p>
                                    <p style={{
                                      margin: '0 0 0.4rem', color: '#374151',
                                      fontSize: '0.9rem', paddingRight: '2.5rem'
                                    }}>
                                      {com.contenido}
                                    </p>
                                    <small style={{ color: '#94a3b8' }}>
                                      {formatFecha(com.created_at)}
                                    </small>
                                    <button
                                      onClick={() => eliminarComentario(com.id, pub.id)}
                                      title="Eliminar comentario"
                                      style={{
                                        position: 'absolute', top: '0.8rem', right: '0.8rem',
                                        background: '#fee2e2', border: 'none', color: '#b91c1c',
                                        cursor: 'pointer', fontSize: '1rem', borderRadius: '6px',
                                        padding: '0.3rem 0.5rem'
                                      }}
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB GALERÍA ── */}
        {tab === 'galeria' && (
          <div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '1.5rem'
            }}>
              <h2 style={{ margin: 0, color: '#1e293b' }}>
                Galería ({galeria.length} imágenes)
              </h2>
              <button onClick={cargarGaleria} style={{
                padding: '0.6rem 1.2rem', background: '#e0f2fe',
                border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
              }}>
                🔄 Actualizar
              </button>
            </div>

            {loadingGal ? (
              <p style={{ textAlign: 'center', color: '#64748b' }}>Cargando galería...</p>
            ) : galeria.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#94a3b8' }}>No hay imágenes en la galería.</p>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {galeria.map((img) => (
                  <div key={img.id} style={{
                    background: 'white', borderRadius: '12px', overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                    display: 'flex', flexDirection: 'column'
                  }}>
                    <img
                      src={buildUrl(img)}

                      alt={img.descripcion || 'Imagen galería'}
                      style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div style={{ padding: '0.8rem' }}>
                      {img.descripcion && (
                        <p style={{
                          margin: '0 0 0.6rem', fontSize: '0.82rem',
                          color: '#374151', overflow: 'hidden',
                          textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                        }}>
                          {img.descripcion}
                        </p>
                      )}
                      <button onClick={() => eliminarImagen(img.id)} style={{
                        width: '100%', padding: '0.5rem',
                        background: '#fee2e2', color: '#b91c1c',
                        border: 'none', borderRadius: '8px',
                        cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem'
                      }}>
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
