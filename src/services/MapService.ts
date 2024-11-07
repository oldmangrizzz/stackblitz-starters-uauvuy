import mapboxgl from 'mapbox-gl';

export class MapService {
  private map: mapboxgl.Map | null = null;

  initializeMap(containerId: string): void {
    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
      throw new Error('Mapbox token is required');
    }

    this.map = new mapboxgl.Map({
      container: containerId,
      style: 'mapbox://styles/mapbox/dark-v10',
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      center: [0, 0],
      zoom: 2
    });
  }

  addMemoryPoint(
    coordinates: [number, number, number],
    metadata: { title: string; description: string }
  ): void {
    if (!this.map) return;

    const el = document.createElement('div');
    el.className = 'memory-marker';

    new mapboxgl.Marker(el)
      .setLngLat([coordinates[0], coordinates[1]])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3>${metadata.title}</h3><p>${metadata.description}</p>`)
      )
      .addTo(this.map);
  }
}

export default MapService;