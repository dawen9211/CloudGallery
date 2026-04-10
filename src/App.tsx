import React, { useState, useEffect } from 'react';
import VideoCompressor from './VideoCompressor';

function App() {
  const [uploading, setUploading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
      
        // Carga los datos guardados o usa los actuales por defecto
          const [token, setToken] = useState(localStorage.getItem('tg_token') || '8665445598:AAEAQfWOW07_GuIoM97o4uZ6H791H1Uv8P8');
            const [chatId, setChatId] = useState(localStorage.getItem('tg_chatid') || '-1003509557962');

              const saveSettings = () => {
                  localStorage.setItem('tg_token', token);
                      localStorage.setItem('tg_chatid', chatId);
                          setShowSettings(false);
                              alert('Configuración guardada localmente');
                                };

                                  const handleUpload = async (fileUrl) => {
                                      setUploading(true);
                                          try {
                                                const response = await fetch(fileUrl);
                                                      const blob = await response.blob();
                                                            const formData = new FormData();
                                                                  formData.append('chat_id', chatId);
                                                                        formData.append('video', blob, 'video_cloud.mp4');

                                                                              const res = await fetch(`https://api.telegram.org/bot${token}/sendVideo`, {
                                                                                      method: 'POST',
                                                                                              body: formData
                                                                                                    });

                                                                                                          if (res.ok) alert('✅ ¡Subido con éxito!');
                                                                                                                else alert('❌ Error: Verifica el Token o el ID');
                                                                                                                    } catch (e) {
                                                                                                                          alert('Error: ' + e.message);
                                                                                                                              } finally {
                                                                                                                                    setUploading(false);
                                                                                                                                        }
                                                                                                                                          };

                                                                                                                                            return (
                                                                                                                                                <div className="min-h-screen bg-gray-900 text-white p-4 font-sans text-center">
                                                                                                                                                      <header className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
                                                                                                                                                              <h1 className="text-xl font-bold text-blue-400">☁️ CloudGallery</h1>
                                                                                                                                                                      <button onClick={() => setShowSettings(!showSettings)} className="text-xl">⚙️</button>
                                                                                                                                                                            </header>

                                                                                                                                                                                  {showSettings ? (
                                                                                                                                                                                          <div className="bg-gray-800 p-4 rounded-xl mb-6 text-left border border-blue-500">
                                                                                                                                                                                                    <h2 className="font-bold mb-4">Ajustes del Bot</h2>
                                                                                                                                                                                                              <label className="block text-xs text-gray-400">Token del Bot:</label>
                                                                                                                                                                                                                        <input value={token} onChange={e => setToken(e.target.value)} className="w-full bg-gray-700 p-2 rounded mb-3 text-xs" />
                                                                                                                                                                                                                                  <label className="block text-xs text-gray-400">ID de Chat:</label>
                                                                                                                                                                                                                                            <input value={chatId} onChange={e => setChatId(e.target.value)} className="w-full bg-gray-700 p-2 rounded mb-4 text-xs" />
                                                                                                                                                                                                                                                      <button onClick={saveSettings} className="w-full bg-green-600 py-2 rounded font-bold">Guardar Cambios</button>
                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                    ) : (
                                                                                                                                                                                                                                                                            <main className="max-w-md mx-auto">
                                                                                                                                                                                                                                                                                      <div className="bg-gray-800 p-5 rounded-2xl shadow-2xl mb-6">
                                                                                                                                                                                                                                                                                                  <h2 className="text-lg mb-4">Subir Recuerdo</h2>
                                                                                                                                                                                                                                                                                                              <VideoCompressor onVideoReady={handleUpload} />
                                                                                                                                                                                                                                                                                                                          {uploading && <p className="mt-4 text-blue-400 animate-pulse font-bold">🚀 Enviando...</p>}
                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                        export default App;
                                                                                                                                                                                                                                                                                                                                                        