import { Calendar, MapPin, Star, TrendingUp, Users, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import brbLogo from "@/assets/brb-logo.png";

const ConsumerHome = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Rock in Rio 2025",
      date: "15 de Junho, 2025",
      location: "Arena BRB Mané Garrincha",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
      category: "Show",
      price: "A partir de R$ 180",
      rating: 4.8,
      attendees: 85000,
      featured: true,
    },
    {
      id: 2,
      title: "Flamengo vs Corinthians",
      date: "22 de Junho, 2025",
      location: "Arena BRB Mané Garrincha",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      category: "Futebol",
      price: "A partir de R$ 120",
      rating: 4.9,
      attendees: 72000,
      featured: true,
    },
  ];

  const upcomingEvents = [
    {
      id: 3,
      title: "Festival de Música Eletrônica",
      date: "30 de Junho, 2025",
      location: "Arena BRB Mané Garrincha",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
      category: "Festival",
      price: "A partir de R$ 200",
      rating: 4.7,
      attendees: 45000,
    },
    {
      id: 4,
      title: "Show de Sertanejo",
      date: "5 de Julho, 2025",
      location: "Arena BRB Mané Garrincha",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
      category: "Show",
      price: "A partir de R$ 150",
      rating: 4.6,
      attendees: 65000,
    },
    {
      id: 5,
      title: "Campeonato de MMA",
      date: "12 de Julho, 2025",
      location: "Arena BRB Mané Garrincha",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
      category: "Esporte",
      price: "A partir de R$ 90",
      rating: 4.5,
      attendees: 18000,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card/80 backdrop-blur-lg border-b border-border p-4 sticky top-0 z-10 shadow-card">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <img src={brbLogo} alt="Arena BRB" className="h-12 hover-lift" />
          <h1 className="text-xl font-bold gradient-primary bg-clip-text text-transparent">Arena BRB</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8 animate-fade-in">
        {/* Eventos em Destaque */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Eventos em Destaque</h2>
            <Button variant="outline" className="hover:border-primary hover:text-primary transition-smooth">
              Ver Todos
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-card rounded-3xl overflow-hidden border border-border hover-lift shadow-card transition-smooth group relative"
              >
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-smooth">
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-smooth">
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                <div className="relative overflow-hidden h-64">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="gradient-primary text-white shadow-glow">
                      {event.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-2xl text-foreground group-hover:text-primary transition-smooth flex-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1 ml-4">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{event.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{event.attendees.toLocaleString()} pessoas esperadas</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-lg font-bold text-foreground">{event.price}</div>
                    <Button className="gradient-primary hover:shadow-glow transition-smooth font-bold">
                      Comprar Ingresso
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Próximos Eventos */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Próximos Eventos</h2>
            <Button variant="outline" className="hover:border-primary hover:text-primary transition-smooth">
              Ver Todos
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-card rounded-2xl overflow-hidden border border-border hover-lift shadow-card transition-smooth group"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge className="gradient-primary text-white text-xs">
                      {event.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-smooth flex-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold">{event.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{event.attendees.toLocaleString()} pessoas</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="font-bold text-primary">{event.price}</span>
                    <Button size="sm" className="gradient-primary hover:shadow-glow transition-smooth">
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ConsumerHome;
