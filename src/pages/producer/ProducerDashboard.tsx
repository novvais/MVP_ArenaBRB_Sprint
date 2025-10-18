import { Calendar, MapPin, Users, TrendingUp, DollarSign, Eye, Plus, BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import producerLogo from "@/assets/producer-logo.png";

const ProducerDashboard = () => {
  const events = [
    {
      id: 1,
      title: "Festival de Verão 2025",
      date: "20 de Janeiro, 2025",
      status: "Confirmado",
      attendees: 15000,
      revenue: 450000,
      views: 12500,
      statusColor: "bg-green-500",
      type: "show"
    },
    {
      id: 2,
      title: "Show de Rock Nacional",
      date: "15 de Fevereiro, 2025",
      status: "Em Análise",
      attendees: 8000,
      revenue: 320000,
      views: 8900,
      statusColor: "bg-yellow-500",
      type: "show"
    },
    {
      id: 3,
      title: "Campeonato de MMA",
      date: "28 de Fevereiro, 2025",
      status: "Confirmado",
      attendees: 12000,
      revenue: 280000,
      views: 15600,
      statusColor: "bg-green-500",
      type: "sports"
    },
  ];

  const stats = [
    {
      title: "Total de Eventos",
      value: "12",
      change: "+2 este mês",
      icon: Calendar,
      color: "text-blue-500"
    },
    {
      title: "Público Total",
      value: "156K",
      change: "+15% vs mês anterior",
      icon: Users,
      color: "text-green-500"
    },
    {
      title: "Receita Total",
      value: "R$ 2.1M",
      change: "+23% vs mês anterior",
      icon: DollarSign,
      color: "text-yellow-500"
    },
    {
      title: "Taxa de Conversão",
      value: "8.4%",
      change: "+1.2% vs mês anterior",
      icon: TrendingUp,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen producer-theme bg-producer-background text-producer-foreground animate-fade-in">
      <header className="bg-producer-surface/80 backdrop-blur-lg border-b border-border p-4 sticky top-0 z-10 shadow-producer-card">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <img src={producerLogo} alt="Arena BRB Produtor" className="h-12 hover-producer-glow transition-smooth" />
          <h1 className="text-xl font-bold gradient-producer-primary bg-clip-text text-transparent">Meus Eventos</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-producer-surface border-border p-6 hover-producer-glow transition-smooth">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-producer-background border border-border ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Seção Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Eventos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Meus Eventos</h2>
              <Button className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold">
                <Plus className="w-4 h-4 mr-2" />
                Novo Evento
              </Button>
            </div>

            {events.length === 0 ? (
              <Card className="bg-producer-surface border-border p-12 text-center">
                <div className="relative inline-block mb-6">
                  <Calendar className="w-20 h-20 text-primary mx-auto" />
                  <div className="absolute -inset-4 gradient-producer-primary blur-xl opacity-20 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Nenhum evento criado</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Comece criando seu primeiro evento no Arena BRB
                </p>
                <Button className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Evento
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className="bg-producer-surface border-border p-6 hover:border-primary hover-producer-glow transition-smooth group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-smooth">{event.title}</h3>
                          <Badge className={`${
                            event.type === 'show' ? 'bg-primary' :
                            event.type === 'sports' ? 'bg-blue-500' :
                            'bg-green-500'
                          } text-white text-xs`}>
                            {event.type === 'show' ? 'Show' : event.type === 'sports' ? 'Esporte' : 'Outro'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span>{event.attendees.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span>R$ {event.revenue.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-primary" />
                            <span>{event.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-producer-background border border-border">
                        <div className={`w-2 h-2 rounded-full ${event.statusColor} animate-pulse`} />
                        <span className="text-sm font-semibold">{event.status}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="hover:border-primary hover:text-primary transition-smooth">
                        Ver Detalhes
                      </Button>
                      <Button
                        size="sm"
                        className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold"
                      >
                        Editar Evento
                      </Button>
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
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Próximos Eventos</h3>
              </div>
              <div className="space-y-3">
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-producer-background rounded-lg border border-border">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
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
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Taxa de Ocupação</span>
                  <span className="font-bold text-green-400">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Vendas Online</span>
                  <span className="font-bold text-primary">R$ 1.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Novos Clientes</span>
                  <span className="font-bold text-blue-400">+340</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Satisfação</span>
                  <span className="font-bold text-yellow-400">4.8★</span>
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
