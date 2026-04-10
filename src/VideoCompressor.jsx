import { useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

function VideoCompressor() {
  const [status, setStatus] = useState('Listo');
    const [progress, setProgress] = useState(0);

      const compressVideo = async (file) => {
          const ffmpeg = new FFmpeg();
              setStatus('Cargando motor de compresión...');
                  
                      await ffmpeg.load({
                            coreURL: await toBlobURL(`https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm/ffmpeg-core.js`, 'text/javascript'),
                                });

                                    setStatus('Comprimiendo video para Telegram...');
                                        await ffmpeg.writeFile('input.mp4', await fetchFile(file));
                                            
                                                // Comando para reducir peso a menos de 50MB
                                                    await ffmpeg.exec(['-i', 'input.mp4', '-vcodec', 'libx264', '-crf', '28', 'output.mp4']);
                                                        
                                                            const data = await ffmpeg.readFile('output.mp4');
                                                                const compressedUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
                                                                    
                                                                        setStatus('¡Compresión lista!');
                                                                            return compressedUrl;
                                                                              };

                                                                                return (
                                                                                    <div className="p-4 border rounded bg-gray-800 text-white">
                                                                                          <p>Estado: {status}</p>
                                                                                                <input type="file" accept="video/*" onChange={(e) => compressVideo(e.target.files[0])} />
                                                                                                    </div>
                                                                                                      );
                                                                                                      }

                                                                                                      export default VideoCompressor;
                                                                                                      