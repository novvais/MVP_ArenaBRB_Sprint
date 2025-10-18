import { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus } from "lucide-react";
import producerLogo from "@/assets/producer-logo.png";
import "react-calendar/dist/Calendar.css";

type Value = Date | [Date, Date] | null;

const ProducerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  // Mock data para eventos
  const events = [
    {
      id: 1,
      title: "Festival de Verão 2025",
      date: new Date(2025, 0, 20),
      time: "20:00",
      location: "Estádio Arena BRB",
      attendees: 15000,
      status: "Confirmado",
      type: "show"
    },
    {
      id: 2,
      title: "Show de Rock Nacional",
      date: new Date(2025, 1, 15),
      time: "19:30",
      location: "Ginásio Arena BRB",
      attendees: 8000,
      status: "Em Análise",
      type: "show"
    },
    {
      id: 3,
      title: "Partida de Futebol",
      date: new Date(2025, 1, 22),
      time: "16:00",
      location: "Estádio Arena BRB",
      attendees: 25000,
      status: "Confirmado",
      type: "sports"
    },
    {
      id: 4,
      title: "Workshop de Produção",
      date: new Date(2025, 2, 10),
      time: "14:00",
      location: "Sala de Eventos",
      attendees: 50,
      status: "Confirmado",
      type: "workshop"
    }
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    if (Array.isArray(selectedDate)) return [];
    return getEventsForDate(selectedDate);
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return (
          <div className="flex flex-col items-center">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mb-1 ${
                  event.type === 'show' ? 'bg-primary' :
                  event.type === 'sports' ? 'bg-blue-500' :
                  event.type === 'workshop' ? 'bg-green-500' : 'bg-gray-500'
                }`}
              />
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground">+{dayEvents.length - 2}</div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'show': return 'bg-primary';
      case 'sports': return 'bg-blue-500';
      case 'workshop': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'show': return 'Show';
      case 'sports': return 'Esporte';
      case 'workshop': return 'Workshop';
      default: return 'Evento';
    }
  };

  return (
    <div className="min-h-screen producer-theme bg-producer-background text-producer-foreground animate-fade-in">
      <header className="bg-producer-surface/80 backdrop-blur-lg border-b border-border p-4 sticky top-0 z-10 shadow-producer-card">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <img src={producerLogo} alt="Arena BRB Produtor" className="h-12 hover-producer-glow transition-smooth" />
          <h1 className="text-xl font-bold gradient-producer-primary bg-clip-text text-transparent">Calendário de Eventos</h1>
          <div className="flex gap-2">
            <Button
              variant={view === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('calendar')}
              className="hover:border-primary hover:text-primary transition-smooth"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendário
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('list')}
              className="hover:border-primary hover:text-primary transition-smooth"
            >
              Lista
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {view === 'calendar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendário */}
            <div className="lg:col-span-2">
              <Card className="bg-producer-surface border-border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Calendário</h2>
                  <Button className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Evento
                  </Button>
                </div>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  locale={ptBR}
                  tileContent={tileContent}
                  className="producer-calendar"
                />
              </Card>
            </div>

            {/* Eventos do Dia Selecionado */}
            <div className="space-y-6">
              <Card className="bg-producer-surface border-border p-6">
                <h3 className="text-xl font-bold mb-4">
                  {selectedDate ? format(selectedDate as Date, "dd 'de' MMMM", { locale: ptBR }) : 'Selecione uma data'}
                </h3>
                {getEventsForSelectedDate().length > 0 ? (
                  <div className="space-y-4">
                    {getEventsForSelectedDate().map((event) => (
                      <div
                        key={event.id}
                        className="bg-producer-background rounded-xl border border-border p-4 hover:border-primary transition-smooth"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-lg">{event.title}</h4>
                          <Badge className={`${getEventTypeColor(event.type)} text-white`}>
                            {getEventTypeLabel(event.type)}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span>{event.attendees.toLocaleString()} pessoas</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Badge variant="outline" className="text-xs">
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum evento nesta data</p>
                  </div>
                )}
              </Card>

              {/* Legenda */}
              <Card className="bg-producer-surface border-border p-6">
                <h3 className="text-lg font-bold mb-4">Legenda</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm">Shows e Música</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Eventos Esportivos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Workshops e Treinamentos</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          /* Vista de Lista */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Todos os Eventos</h2>
              <Button className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold">
                <Plus className="w-4 h-4 mr-2" />
                Novo Evento
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="bg-producer-surface border-border p-6 hover:border-primary hover-producer-glow transition-smooth group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-smooth">{event.title}</h3>
                    <Badge className={`${getEventTypeColor(event.type)} text-white`}>
                      {getEventTypeLabel(event.type)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      <span>{format(event.date, "dd/MM/yyyy", { locale: ptBR })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{event.attendees.toLocaleString()} pessoas</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {event.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="hover:border-primary hover:text-primary transition-smooth">
                      Ver Detalhes
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        .producer-calendar {
          background: transparent;
          border: none;
        }
        
        .producer-calendar .react-calendar__tile {
          background: transparent;
          border: none;
          color: hsl(var(--producer-foreground));
          padding: 0.5rem;
          min-height: 3rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .producer-calendar .react-calendar__tile:hover {
          background: hsl(var(--producer-surface));
        }
        
        .producer-calendar .react-calendar__tile--active {
          background: hsl(var(--producer-primary));
          color: white;
        }
        
        .producer-calendar .react-calendar__tile--now {
          background: hsl(var(--producer-gold) / 0.2);
          color: hsl(var(--producer-gold));
        }
        
        .producer-calendar .react-calendar__navigation {
          margin-bottom: 1rem;
        }
        
        .producer-calendar .react-calendar__navigation button {
          background: transparent;
          border: none;
          color: hsl(var(--producer-foreground));
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .producer-calendar .react-calendar__navigation button:hover {
          background: hsl(var(--producer-surface));
        }
        
        .producer-calendar .react-calendar__month-view__weekdays {
          margin-bottom: 0.5rem;
        }
        
        .producer-calendar .react-calendar__month-view__weekdays__weekday {
          color: hsl(var(--producer-foreground));
          font-weight: 600;
          padding: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default ProducerCalendar;

