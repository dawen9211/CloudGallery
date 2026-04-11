import { useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

function VideoCompressor({ onVideoReady }) {
  const [queue, setQueue] = useState({ current: 0, total: 0 });
    const [status, setStatus] = useState('Listo');
      const [progress, setProgress] = useState(0); // Para los MB

        const processFiles = async (files) => {
            const fileList = Array.from(files);
                setQueue({ current: 0, total: fileList.length });

                    for (let i = 0; i < fileList.length; i++) {
                          const file = fileList[i];
                                setQueue(prev => ({ ...prev, current: i + 1 }));
                                      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

                                            if (file.size / (1024 * 1024) < 50) {
                                                    setStatus(`Enviando ${file.name} (${sizeMB}MB)...`);
                                                            await onVideoReady(URL.createObjectURL(file), file.name, file.size, i + 1, fileList.length);
                                                                  } else {
                                                                          setStatus(`Comprimiendo ${file.name}...`);
                                                                                  // Aquí iría la lógica de FFmpeg que ya tenemos, pero adaptada a la cola
                                                                                          // (La mantendremos simplificada para que pruebes primero la subida múltiple)
                                                                                                  await onVideoReady(URL.createObjectURL(file), file.name, file.size, i + 1, fileList.length);
                                                                                                        }
                                                                                                            }
                                                                                                                setStatus('¡Todo terminado!');
                                                                                                                    setQueue({ current: 0, total: 0 });
                                                                                                                      };

                                                                                                                        return (
                                                                                                                            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-inner">
                                                                                                                                  <div className="relative border-2 border-dashed border-blue-500/30 rounded-lg p-6 text-center">
                                                                                                                                          <input 
                                                                                                                                                    type="file" 
                                                                                                                                                              multiple // ESTO PERMITE ELEGIR MUCHOS ARCHIVOS
                                                                                                                                                                        accept="video/*,image/*" 
                                                                                                                                                                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                                                                                                                                                                            onChange={(e) => e.target.files.length > 0 && processFiles(e.target.files)} 
                                                                                                                                                                                                    />
                                                                                                                                                                                                            <p className="text-blue-400 font-bold text-sm">📁 Seleccionar archivos o carpeta</p>
                                                                                                                                                                                                                    <p className="text-[10px] text-gray-500 mt-1">Puedes elegir varios de una vez</p>
                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                {queue.total > 0 && (
                                                                                                                                                                                                                                        <div className="mt-4 space-y-2">
                                                                                                                                                                                                                                                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                                                                                                                                                                                                                                              <span>Procesando: {queue.current} de {queue.total}</span>
                                                                                                                                                                                                                                                                          <span className="text-blue-400">{status}</span>
                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                              <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                                                                                                                                                                                                                                                                                                          <div 
                                                                                                                                                                                                                                                                                                                        className="bg-blue-500 h-full transition-all duration-500" 
                                                                                                                                                                                                                                                                                                                                      style={{ width: `${(queue.current / queue.total) * 100}%` }}
                                                                                                                                                                                                                                                                                                                                                  ></div>
                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                export default VideoCompressor;
                                                                                                                                                                                                                                                                                                                                                                                