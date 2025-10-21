export interface MapPoint {
    id: string;
    title: string;
    description?: string;
    position: {
      lat: number;
      lng: number;
    };
    type: 'event' | 'venue' | 'parking' | 'food';
    icon?: string;
  }