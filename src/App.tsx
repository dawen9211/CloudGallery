import React, { useState } from 'react';
import VideoCompressor from './VideoCompressor';

const TELEGRAM_TOKEN = '8665445598:AAEAQfWOW07_GuIoM97o4uZ6H791H1Uv8P8';
const CHAT_ID = '-1003509557962';

function App() {
  const [uploading, setUploading] = useState(false);

    const handleUpload = async (compressedBlobUrl) => {
        setUploading(true);
            try {
                  const response = await fetch(compressedBlobUrl);
                        const blob = await response.blob();
                              
                                    const formData = new FormData();
                                          formData.append('chat_id', CHAT_ID);
                                                formData.append('video', blob, 'video_familia.mp4');

                                                      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendVideo`, {
                                                              method: 'POST',
                                                                      body: formData
                                                                            });

                                                                                  if (res.ok) {
                                                                                          alert('✅ ¡Video enviado con éxito a Telegram!');
                                                                                                } else {
                                                                                                        alert('❌ Error de Telegram: ' + res.statusText);
                                                                                                              }
                                                                                                                  } catch (error) {
                                                                                                                        alert('Error al enviar: ' + error.message);
                                                                                                                            } finally {
                                                                                                                                  setUploading(false);
                                                                                                                                      }
                                                                                                                                        };

                                                                                                                                          return (
                                                                                                                                              <div className="min-h-screen bg-gray-900 text-white p-4">
                                                                                                                                                    <header className="mb-6 text-center">
                                                                                                                                                            <h1 className="text-2xl font-bold text-blue-400 text-white">☁️ CloudGallery</h1>
                                                                                                                                                                    <p className="text-gray-400 text-sm">Copia de seguridad para mi hija</p>
                                                                                                                                                                          </header>

                                                                                                                                                                                <main className="max-w-md mx-auto">
                                                                                                                                                                                        <div className="bg-gray-800 p-5 rounded-2xl shadow-2xl mb-6 border border-gray-700">
                                                                                                                                                                                                  <h2 className="text-lg font-semibold mb-4 text-white text-center">Subir nuevo video</h2>
                                                                                                                                                                                                            <VideoCompressor onVideoReady={handleUpload} />
                                                                                                                                                                                                                      {uploading && <div className="mt-4 text-center text-blue-400 animate-pulse">🚀 Enviando a Telegram...</div>}
                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                    </main>
                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                          export default App;
                                                                                                                                                                                                                                          