import React, { useState } from 'react';
import VideoCompressor from './VideoCompressor';

const TELEGRAM_TOKEN = '8665445598:AAEAQfWOW07_GuIoM97o4uZ6H791H1Uv8P8';
const CHAT_ID = '-1003509557962';

function App() {
  const [uploading, setUploading] = useState(false);

    const handleUpload = async (compressedBlobUrl) => {
        setUploading(true);
            const response = await fetch(compressedBlobUrl);
                const blob = await response.blob();
                    
                        const formData = new FormData();
                            formData.append('chat_id', CHAT_ID);
                                formData.append('video', blob, 'video_hija.mp4');

                                    try {
                                          await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendVideo`, {
                                                  method: 'POST',
                                                          body: formData
                                                                });
                                                                      alert('¡Video enviado a la galería de Telegram!');
                                                                          } catch (error) {
                                                                                alert('Error al enviar: ' + error.message);
                                                                                    } finally {
                                                                                          setUploading(false);
                                                                                              }
                                                                                                };

                                                                                                  return (
                                                                                                      <div className="min-h-screen bg-gray-900 text-white p-6">
                                                                                                            <header className="mb-8 border-b border-gray-700 pb-4">
                                                                                                                    <h1 className="text-3xl font-bold">☁️ CloudGallery</h1>
                                                                                                                            <p className="text-gray-400">Guardando los mejores momentos</p>
                                                                                                                                  </header>

                                                                                                                                        <main>
                                                                                                                                                <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
                                                                                                                                                          <h2 className="text-xl mb-4">Subir nuevo video</h2>
                                                                                                                                                                    <VideoCompressor onVideoReady={handleUpload} />
                                                                                                                                                                              {uploading && <p className="mt-4 text-blue-400 animate-pulse">Enviando a Telegram...</p>}
                                                                                                                                                                                      </div>

                                                                                                                                                                                              <section className="grid grid-cols-2 gap-4">
                                                                                                                                                                                                        <p className="col-span-2 text-sm text-gray-500 italic">
                                                                                                                                                                                                                    Los videos aparecerán en tu chat de Telegram al instante.
                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                      </section>
                                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                  export default App;
                                                                                                                                                                                                                                                  