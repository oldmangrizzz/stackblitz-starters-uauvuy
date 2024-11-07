import { MemoryVisualizer } from '../components/MemoryVisualizer';
import { MapService } from '../services/MapService';
import { useState, useEffect } from 'react';
import { ConvexProvider, useQuery } from 'convex/react';
import { convex } from '../convex';

export default function Home() {
  const memories = useQuery('memories/list') || [];
  const [selectedMemory, setSelectedMemory] = useState(null);

  useEffect(() => {
    const mapService = new MapService();
    mapService.initializeMap('map');
  }, []);

  return (
    <ConvexProvider client={convex}>
      <main className="flex min-h-screen flex-col">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="relative">
            <MemoryVisualizer
              memories={memories}
              onMemorySelect={setSelectedMemory}
            />
          </div>
          <div className="relative">
            <div id="map" className="w-full h-full" />
          </div>
        </div>
        {selectedMemory && (
          <div className="fixed bottom-0 w-full bg-white p-4 shadow-lg">
            <h2 className="text-xl font-bold">{selectedMemory.metadata.context}</h2>
            <p className="text-gray-600">Type: {selectedMemory.type}</p>
          </div>
        )}
      </main>
    </ConvexProvider>
  );
}