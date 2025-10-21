import { Calendar, MapPin, Users, Plus, BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logoProdutorArenaBRB from "@/assets/logo_produtor_ArenaBRB.svg";
import gunsNRosesImg from "@/assets/Gunsnroses.jpeg";
import linkinParkImg from "@/assets/linkinpark.jpg";
import sorrisoImg from "@/assets/sorriso.jpg";
import paysanduImg from "@/assets/ESCUDO-OFICIAL-PAYSANDU.png";

interface ProducerDashboardProps {
  onNavigate?: (page: string) => void;
}

const ProducerDashboard = ({ onNavigate }: ProducerDashboardProps) => {
  const allEvents = [
    {
      id: 1,
      title: "Guns N' Roses",
      date: "2 de Novembro, 2025",
      location: "Arena BRB Mané Garrincha",
      status: "Confirmado",
      attendees: 85000,
      revenue: 23800000,
      views: 125000,
      statusColor: "bg-green-500",
      type: "show",
      image: gunsNRosesImg,
      price: "A partir de R$ 280",
    },
    {
      id: 2,
      title: "Linkin Park",
      date: "11 de Novembro, 2025",
      location: "Arena BRB Mané Garrincha",
      status: "Confirmado",
      attendees: 90000,
      revenue: 31500000,
      views: 180000,
      statusColor: "bg-green-500",
      type: "show",
      image: linkinParkImg,
      price: "A partir de R$ 350",
    },
    {
      id: 3,
      title: "Basquete Paysandu",
      date: "17 de Novembro, 2025",
      location: "Arena BRB Nilson Nelson",
      status: "Confirmado",
      attendees: 8000,
      revenue: 400000,
      views: 15600,
      statusColor: "bg-green-500",
      type: "sports",
      image: paysanduImg,
      price: "A partir de R$ 50",
    },
    {
      id: 4,
      title: "Sorriso as Antigas",
      date: "6 de Dezembro, 2025",
      location: "Arena BRB Mané Garrincha",
      status: "Em Análise",
      attendees: 45000,
      revenue: 5400000,
      views: 32000,
      statusColor: "bg-yellow-500",
      type: "show",
      image: sorrisoImg,
      price: "A partir de R$ 120",
    },
  ];
  const myEvents = allEvents.filter((e) => e.title === "Basquete Paysandu");

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
        {/* Seção Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Eventos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Meus Eventos</h2>
              <Button
                onClick={() => onNavigate?.("create-event")}
                className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Evento
              </Button>
            </div>

            {myEvents.length === 0 ? (
              <Card className="bg-producer-surface border-border p-12 text-center">
                <div className="relative inline-block mb-6">
                  <Calendar className="w-20 h-20 text-producer-gold mx-auto" />
                  <div className="absolute -inset-4 gradient-producer-accent blur-xl opacity-20 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Nenhum evento criado
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Comece criando seu primeiro evento no Arena BRB
                </p>
                <Button
                  onClick={() => onNavigate?.("create-event")}
                  className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Evento
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {myEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="bg-producer-surface border-border overflow-hidden hover:border-primary hover-producer-glow transition-smooth group"
                  >
                    <div className="flex flex-col lg:flex-row gap-0">
                      {/* Imagem do Evento */}
                      <div className="relative w-full lg:w-48 h-48 lg:h-auto overflow-hidden flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <Badge
                            className={`${
                              event.type === "show"
                                ? "bg-producer-gold"
                                : event.type === "sports"
                                  ? "bg-blue-500"
                                  : "bg-producer-gold"
                            } text-white text-xs px-2 py-1`}
                          >
                            {event.type === "show"
                              ? "Show"
                              : event.type === "sports"
                                ? "Esporte"
                                : "Outro"}
                          </Badge>
                        </div>
                      </div>

                      {/* Conteúdo do Evento */}
                      <div className="flex-1 p-5">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold group-hover:text-producer-gold transition-smooth mb-4">
                              {event.title}
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-producer-gold/10 flex items-center justify-center flex-shrink-0">
                                  <Calendar className="w-4 h-4 text-producer-gold" />
                                </div>
                                <div>
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                                    Data do Evento
                                  </p>
                                  <p className="text-sm font-semibold">
                                    {event.date}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-producer-gold/10 flex items-center justify-center flex-shrink-0">
                                  <Users className="w-4 h-4 text-producer-gold" />
                                </div>
                                <div>
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                                    Público Esperado
                                  </p>
                                  <p className="text-sm font-semibold">
                                    {event.attendees.toLocaleString()} pessoas
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-producer-gold/10 flex items-center justify-center flex-shrink-0">
                                  <MapPin className="w-4 h-4 text-producer-gold" />
                                </div>
                                <div>
                                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                                    Local
                                  </p>
                                  <p className="text-sm font-semibold">
                                    {event.location}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-producer-background border border-border self-start">
                            <div
                              className={`w-2 h-2 rounded-full ${event.statusColor} animate-pulse`}
                            />
                            <span className="text-xs font-semibold">
                              {event.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-border">
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:border-producer-gold hover:text-producer-gold transition-smooth"
                          >
                            Ver Detalhes
                          </Button>
                          <Button
                            size="sm"
                            className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold"
                          >
                            Editar Evento
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Próximos Eventos */}
            <Card className="bg-producer-surface border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-producer-gold" />
                <h3 className="text-lg font-bold">Próximos Eventos</h3>
              </div>
              <div className="space-y-3">
                {allEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-3 bg-producer-background rounded-lg border border-border"
                  >
                    <div className="w-12 h-12 bg-producer-gold/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-producer-gold" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {event.date}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Resumo de Performance */}
            <Card className="bg-producer-surface border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-producer-gold" />
                <h3 className="text-lg font-bold">Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total de Eventos
                  </span>
                  <span className="font-bold text-blue-500">
                    {allEvents.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Público Total
                  </span>
                  <span className="font-bold text-green-500">
                    {(
                      allEvents.reduce((sum, e) => sum + e.attendees, 0) / 1000
                    ).toFixed(0)}
                    K
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProducerDashboard;
