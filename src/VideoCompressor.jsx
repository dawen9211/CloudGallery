import { useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

function VideoCompressor({ onVideoReady }) {
  const [status, setStatus] = useState('Esperando video...');

    const compressVideo = async (file) => {
        try {
              const ffmpeg = new FFmpeg();
                    setStatus('Cargando motor de compresión (espera un momento)...');
                          
                                const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
                                      await ffmpeg.load({
                                              coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                                                      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
                                                            });

                                                                  setStatus('Comprimiendo video...');
                                                                        await ffmpeg.writeFile('input.mp4', await fetchFile(file));
                                                                              
                                                                                    await ffmpeg.exec(['-i', 'input.mp4', '-vcodec', 'libx264', '-crf', '28', '-preset', 'ultrafast', 'output.mp4']);
                                                                                          
                                                                                                const data = await ffmpeg.readFile('output.mp4');
                                                                                                      const compressedBlob = new Blob([data.buffer], { type: 'video/mp4' });
                                                                                                            const compressedUrl = URL.createObjectURL(compressedBlob);
                                                                                                                  
                                                                                                                        setStatus('¡Compresión terminada!');
                                                                                                                              if (onVideoReady) onVideoReady(compressedUrl);
                                                                                                                                  } catch (error) {
                                                                                                                                        setStatus('Error: ' + error.message);
                                                                                                                                            }
                                                                                                                                              };

                                                                                                                                                return (
                                                                                                                                                    <div className="p-4 border border-gray-600 rounded-lg bg-gray-700">
                                                                                                                                                          <p className="mb-3 font-medium text-white">Estado: <span className="text-yellow-400">{status}</span></p>
                                                                                                                                                                <input 
                                                                                                                                                                        type="file" 
                                                                                                                                                                                accept="video/*" 
                                                                                                                                                                                        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white"
                                                                                                                                                                                                onChange={(e) => {
                                                                                                                                                                                                          if (e.target.files[0]) compressVideo(e.target.files[0]);
                                                                                                                                                                                                                  }} 
                                                                                                                                                                                                                        />
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                              );
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                              export default VideoCompressor;
                                                                                                                                                                                                                              