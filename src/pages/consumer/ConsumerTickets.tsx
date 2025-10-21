import {
  QrCode,
  MapPin,
  Calendar,
  Ticket as TicketIcon,
  Plus,
  Trophy,
  Star,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";
import { useState } from "react";
import { useRewards } from "@/contexts/RewardsContext";
import WalletDialog from "@/components/WalletDialog";

const ConsumerTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [showWalletDialog, setShowWalletDialog] = useState(false);

  const {
    points,
    level,
    tickets,
    getNextLevel,
    getPointsToNextLevel,
    getProgressPercentage,
  } = useRewards();

  const nextLevel = getNextLevel();
  const pointsToNextLevel = getPointsToNextLevel();
  const progressPercentage = getProgressPercentage();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={logoConsumidorArenaBRB} alt="Arena BRB" className="h-12" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Seção de Pontos - Clicável */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Wallet className="w-7 h-7 text-primary" />
            Minha Carteira
          </h2>

          {/* Card de Pontos Clicável */}
          <Card
            className="overflow-hidden shadow-elegant cursor-pointer hover-lift transition-smooth"
            onClick={() => setShowWalletDialog(true)}
          >
            <div className="gradient-primary p-6 text-white relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/90 text-sm mb-1">Seus Pontos</p>
                  <h3 className="text-4xl font-bold">{points}</h3>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-glow">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="relative space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                    <Star className="h-3 w-3 mr-1" />
                    Nível {level}
                  </Badge>
                  {nextLevel && (
                    <span className="text-white/80">
                      {pointsToNextLevel} pts para {nextLevel.name}
                    </span>
                  )}
                </div>
                {nextLevel && (
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                    <div
                      className="bg-white h-full rounded-full transition-all duration-500 shadow-glow"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Indicação de que é clicável */}
            <div className="p-4 bg-gradient-subtle border-t border-primary/20 flex items-center justify-center gap-2 text-primary">
              <span className="text-sm font-medium">
                Toque para ver recompensas e detalhes
              </span>
              <Trophy className="w-4 h-4" />
            </div>
          </Card>
        </div>

        {/* Seção de Ingressos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <TicketIcon className="w-6 h-6 text-primary" />
              Meus Ingressos
            </h2>
            <Badge variant="secondary">{tickets.length}</Badge>
          </div>

          {tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-elegant hover-lift transition-smooth"
                >
                  <div className="gradient-primary p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <div className="relative flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-2xl mb-1">
                          {ticket.event}
                        </h3>
                        <p className="text-white/90 text-sm">{ticket.venue}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl shadow-glow">
                        <QrCode className="w-10 h-10" />
                      </div>
                    </div>
                    <div className="relative flex items-center gap-2">
                      <Badge className="bg-green-500/90 text-white border-0">
                        {ticket.status}
                      </Badge>
                      <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                        <Star className="h-3 w-3 mr-1" />+{ticket.pointsEarned}{" "}
                        pontos
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-secondary/50 p-4 rounded-xl">
                        <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">
                          Data
                        </p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <p className="font-bold text-foreground text-lg">
                            {ticket.date}
                          </p>
                        </div>
                      </div>
                      <div className="bg-secondary/50 p-4 rounded-xl">
                        <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">
                          Horário
                        </p>
                        <p className="font-bold text-foreground text-lg">
                          {ticket.time}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-gradient-to-br from-primary to-primary/80 p-4 rounded-xl text-white shadow-glow">
                        <p className="text-xs mb-1 font-semibold uppercase text-white/90">
                          Portão
                        </p>
                        <p className="font-bold text-2xl text-white">
                          {ticket.gate}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-accent to-accent/80 p-4 rounded-xl text-white shadow-glow">
                        <p className="text-xs mb-1 font-semibold uppercase text-white/90">
                          Assento
                        </p>
                        <p className="font-bold text-2xl text-white">
                          {ticket.seat}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl">
                        <MapPin className="w-5 h-5 text-accent mt-1" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {ticket.venue}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {ticket.address}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono mt-1">
                            Código: {ticket.code}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-glow transition-smooth text-white"
                      size="lg"
                      onClick={() =>
                        setSelectedTicket(
                          selectedTicket === ticket.id ? null : ticket.id,
                        )
                      }
                    >
                      {selectedTicket === ticket.id
                        ? "Ocultar QR Code"
                        : "Ver QR Code Completo"}
                    </Button>

                    {selectedTicket === ticket.id && (
                      <div className="mt-4 p-6 bg-white rounded-xl border-2 border-primary/20 flex flex-col items-center gap-4 animate-in fade-in-50 slide-in-from-top-5 duration-300">
                        <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                          <QrCode className="w-32 h-32 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          Apresente este QR Code na entrada do evento
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center shadow-card">
              <TicketIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Você ainda não possui ingressos
              </p>
              <Button className="bg-gradient-to-r from-accent to-primary text-white hover:shadow-glow">
                <Plus className="w-4 h-4 mr-2" />
                Explorar Eventos
              </Button>
            </Card>
          )}
        </div>
      </main>

      {/* Dialog da Carteira */}
      <WalletDialog
        open={showWalletDialog}
        onOpenChange={setShowWalletDialog}
      />
    </div>
  );
};

export default ConsumerTickets;
