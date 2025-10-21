import {
  Calendar,
  MapPin,
  Users,
  Star,
  Heart,
  Share2,
  Clock,
  Ticket,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";
import gunsNRosesImg from "@/assets/Gunsnroses.jpeg";
import linkinParkImg from "@/assets/linkinpark.jpg";
import sorrisoImg from "@/assets/sorriso.jpg";
import paysanduImg from "@/assets/ESCUDO-OFICIAL-PAYSANDU.png";

interface ConsumerEventDetailsProps {
  eventId: number | null;
  onBack: () => void;
}

const ConsumerEventDetails = ({
  eventId,
  onBack,
}: ConsumerEventDetailsProps) => {
  const events = [
    {
      id: 1,
      title: "Guns N' Roses",
      date: "2 de Novembro, 2025",
      time: "20:00",
      location: "Arena BRB Mané Garrincha",
      address: "SRPN - Brasília, DF",
      image: gunsNRosesImg,
      category: "Show",
      price: "A partir de R$ 280",
      rating: 4.9,
      attendees: 85000,
      description:
        "Uma das maiores bandas de rock de todos os tempos retorna a Brasília com a turnê mundial. Prepare-se para uma noite inesquecível com sucessos como Sweet Child O' Mine, November Rain e Welcome to the Jungle.",
      featured: true,
      ticketLink:
        "https://www.eventim.com.br/event/guns-n-roses-arena-brb-mane-garrincha-20345413/",
    },
    {
      id: 2,
      title: "Linkin Park",
      date: "11 de Novembro, 2025",
      time: "21:00",
      location: "Arena BRB Mané Garrincha",
      address: "SRPN - Brasília, DF",
      image: linkinParkImg,
      category: "Show",
      price: "A partir de R$ 350",
      rating: 4.9,
      attendees: 90000,
      description:
        "A lendária banda de rock alternativo traz sua energia única para Brasília. Uma experiência imperdível com os maiores hits que marcaram gerações, incluindo In The End, Numb e What I've Done.",
      featured: true,
      ticketLink:
        "https://www.ticketmaster.com.br/event/venda-geral-linkin-park-brasilia",
    },
    {
      id: 3,
      title: "Sorriso as Antigas",
      date: "6 de Dezembro, 2025",
      time: "19:00",
      location: "Arena BRB Mané Garrincha",
      address: "SRPN - Brasília, DF",
      image: sorrisoImg,
      category: "Show",
      price: "A partir de R$ 120",
      rating: 4.7,
      attendees: 45000,
      description:
        "O Sorriso Maroto apresenta o projeto 'As Antigas' com os maiores sucessos do pagode que marcaram época. Uma noite de muita nostalgia, romance e diversão garantida.",
      ticketLink: "https://www.ingresse.com/sorriso-maroto-as-antigasbrasilia/",
    },
    {
      id: 4,
      title: "Basquete Paysandu",
      date: "17 de Novembro, 2025",
      time: "16:00",
      location: "Arena BRB Nilson Nelson",
      address: "SRPN - Brasília, DF",
      image: paysanduImg,
      category: "Esporte",
      price: "A partir de R$ 50",
      rating: 4.6,
      attendees: 8000,
      description:
        "Campeonato brasileiro de basquete com o time do Paysandu. Venha apoiar seu time e prestigiar este grande espetáculo esportivo.",
      ticketLink: "#",
    },
  ];

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Evento não encontrado
          </h2>
          <Button onClick={onBack}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  const handleBuyTicket = () => {
    if (event.ticketLink && event.ticketLink !== "#") {
      window.open(event.ticketLink, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card/80 backdrop-blur-lg border-b border-border p-4 sticky top-0 z-10 shadow-card">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-accent/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
          <img
            src={logoConsumidorArenaBRB}
            alt="Arena BRB"
            className="h-12 hover-lift"
          />
          <div className="w-24"></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8 animate-fade-in">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-card">
          <div className="relative h-96">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-smooth">
                <Heart className="w-5 h-5 text-white" />
              </button>
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-smooth">
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <Badge className="gradient-primary text-white shadow-glow mb-4">
                {event.category}
              </Badge>
              <h1 className="text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{event.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>
                    {event.attendees.toLocaleString()} pessoas esperadas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descrição */}
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Sobre o Evento
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </Card>

            {/* Informações do Local */}
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Local do Evento
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {event.location}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.address}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Data e Horário */}
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Data e Horário
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{event.time}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar - Compra */}
          <div className="lg:col-span-1">
            <Card className="p-6 space-y-6 sticky top-24">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Ingressos a partir de
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {event.price.replace("A partir de ", "")}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-glow transition-smooth font-bold text-white text-lg py-6"
                  onClick={handleBuyTicket}
                  disabled={!event.ticketLink || event.ticketLink === "#"}
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  Comprar Ingresso
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Ao clicar em "Comprar Ingresso", você será redirecionado para
                  o site oficial de vendas
                </p>
              </div>

              <div className="border-t border-border pt-6 space-y-3">
                <h3 className="font-semibold text-foreground">
                  Informações Importantes
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Classificação etária conforme setor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Apresentação do ingresso digital ou físico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Chegue com antecedência</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Confira os itens permitidos</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsumerEventDetails;
