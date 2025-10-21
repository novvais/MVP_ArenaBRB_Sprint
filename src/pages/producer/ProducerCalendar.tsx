import { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
} from "lucide-react";
import logoProdutorArenaBRB from "@/assets/logo_produtor_ArenaBRB.svg";
import gunsNRosesImg from "@/assets/Gunsnroses.jpeg";
import linkinParkImg from "@/assets/linkinpark.jpg";
import sorrisoImg from "@/assets/sorriso.jpg";
import paysanduImg from "@/assets/ESCUDO-OFICIAL-PAYSANDU.png";
import "react-calendar/dist/Calendar.css";

type Value = Date | [Date, Date] | null;

interface ProducerCalendarProps {
  onNavigate?: (page: string) => void;
}

const ProducerCalendar = ({ onNavigate }: ProducerCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");

  // Eventos reais do Arena BRB
  const events = [
    {
      id: 1,
      title: "Guns N' Roses",
      date: new Date(2025, 10, 2), // 2 de Novembro, 2025
      time: "20:00",
      location: "Arena BRB Mané Garrincha",
      attendees: 85000,
      status: "Confirmado",
      type: "show",
      image: gunsNRosesImg,
      price: "A partir de R$ 280",
    },
    {
      id: 2,
      title: "Linkin Park",
      date: new Date(2025, 10, 11), // 11 de Novembro, 2025
      time: "21:00",
      location: "Arena BRB Mané Garrincha",
      attendees: 90000,
      status: "Confirmado",
      type: "show",
      image: linkinParkImg,
      price: "A partir de R$ 350",
    },
    {
      id: 3,
      title: "Basquete Paysandu",
      date: new Date(2025, 10, 17), // 17 de Novembro, 2025
      time: "19:00",
      location: "Arena BRB Nilson Nelson",
      attendees: 8000,
      status: "Confirmado",
      type: "sports",
      image: paysanduImg,
      price: "A partir de R$ 50",
    },
    {
      id: 4,
      title: "Sorriso as Antigas",
      date: new Date(2025, 11, 6), // 6 de Dezembro, 2025
      time: "20:30",
      location: "Arena BRB Mané Garrincha",
      attendees: 45000,
      status: "Em Análise",
      type: "show",
      image: sorrisoImg,
      price: "A partir de R$ 120",
    },
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString(),
    );
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    if (Array.isArray(selectedDate)) return [];
    return getEventsForDate(selectedDate);
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return (
          <div className="flex flex-col items-center">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mb-1 ${
                  event.type === "show"
                    ? "bg-producer-gold"
                    : event.type === "sports"
                      ? "bg-blue-500"
                      : event.type === "workshop"
                        ? "bg-green-500"
                        : "bg-gray-500"
                }`}
              />
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{dayEvents.length - 2}
              </div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "show":
        return "bg-producer-gold";
      case "sports":
        return "bg-producer-gold";
      case "workshop":
        return "bg-producer-gold";
      default:
        return "bg-producer-gold";
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "show":
        return "Show";
      case "sports":
        return "Esporte";
      case "workshop":
        return "Workshop";
      default:
        return "Evento";
    }
  };

  return (
    <div className="min-h-screen producer-theme bg-producer-background text-producer-foreground animate-fade-in">
      <header className="bg-producer-surface/80 backdrop-blur-lg border-b border-border p-4 sticky top-0 z-10 shadow-producer-card">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img
            src={logoProdutorArenaBRB}
            alt="Arena BRB"
            className="h-12 hover-producer-glow transition-smooth"
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {view === "calendar" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendário */}
            <div className="lg:col-span-2">
              <Card className="bg-producer-surface border-border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Calendário</h2>
                  <Button
                    onClick={() => onNavigate?.("create-event")}
                    className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Evento
                  </Button>
                </div>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  locale="pt-BR"
                  tileContent={tileContent}
                  className="producer-calendar"
                />
              </Card>
            </div>

            {/* Eventos do Dia Selecionado */}
            <div className="space-y-6">
              <Card className="bg-producer-surface border-border p-6">
                <h3 className="text-xl font-bold mb-4">
                  {selectedDate
                    ? format(selectedDate as Date, "dd 'de' MMMM", {
                        locale: ptBR,
                      })
                    : "Selecione uma data"}
                </h3>
                {getEventsForSelectedDate().length > 0 ? (
                  <div className="space-y-4">
                    {getEventsForSelectedDate().map((event) => (
                      <div
                        key={event.id}
                        className="bg-producer-background rounded-xl border border-border overflow-hidden hover:border-producer-gold transition-smooth group"
                      >
                        {/* Imagem do Evento */}
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute bottom-2 left-3">
                            <Badge
                              className={`${getEventTypeColor(event.type)} text-white`}
                            >
                              {getEventTypeLabel(event.type)}
                            </Badge>
                          </div>
                        </div>

                        {/* Conteúdo */}
                        <div className="p-4">
                          <h4 className="font-bold text-lg mb-3 group-hover:text-producer-gold transition-smooth">
                            {event.title}
                          </h4>
                          <div className="space-y-2 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-producer-gold" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-producer-gold" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-producer-gold" />
                              <span>
                                {event.attendees.toLocaleString()} pessoas
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <Badge variant="outline" className="text-xs">
                              {event.status}
                            </Badge>
                            <span className="text-xs font-semibold text-producer-gold">
                              {event.price}
                            </span>
                          </div>
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
                    <div className="w-3 h-3 bg-producer-gold rounded-full"></div>
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
              <Button
                onClick={() => onNavigate?.("create-event")}
                className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Evento
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="bg-producer-surface border-border overflow-hidden hover:border-producer-gold hover-producer-glow transition-smooth group"
                >
                  {/* Imagem do Evento */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge
                        className={`${getEventTypeColor(event.type)} text-white`}
                      >
                        {getEventTypeLabel(event.type)}
                      </Badge>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold group-hover:text-producer-gold transition-smooth mb-3">
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-producer-gold" />
                        <span>
                          {format(event.date, "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-producer-gold" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-producer-gold" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-producer-gold" />
                        <span>{event.attendees.toLocaleString()} pessoas</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className="text-xs w-fit">
                          {event.status}
                        </Badge>
                        <span className="text-xs font-semibold text-producer-gold">
                          {event.price}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:border-producer-gold hover:text-producer-gold transition-smooth"
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`
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
