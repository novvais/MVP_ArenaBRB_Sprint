import { QrCode, MapPin, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";

const ConsumerTickets = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={logoConsumidorArenaBRB} alt="Arena BRB" className="h-12" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Meus Ingressos</h1>

        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-elegant hover-lift transition-smooth">
          <div className="gradient-primary p-6 text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-2xl mb-1">Rock in Rio 2025</h3>
                <p className="text-primary-foreground/90 text-sm">Arena BRB Mané Garrincha</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl shadow-glow">
                <QrCode className="w-10 h-10" />
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 p-4 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">Data</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <p className="font-bold text-foreground text-lg">15 Jun, 2025</p>
                </div>
              </div>
              <div className="bg-secondary/50 p-4 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">Horário</p>
                <p className="font-bold text-foreground text-lg">20:00</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-gradient-primary p-4 rounded-xl text-black shadow-glow">
                <p className="text-xs mb-1 font-semibold uppercase opacity-90">Portão</p>
                <p className="font-bold text-2xl">Portão 3</p>
              </div>
              <div className="bg-gradient-accent p-4 rounded-xl text-black shadow-glow">
                <p className="text-xs mb-1 font-semibold uppercase opacity-90">Assento</p>
                <p className="font-bold text-2xl">A-125</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Arena BRB Mané Garrincha</p>
                  <p className="text-xs text-muted-foreground">SRPN - Brasília, DF</p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-glow transition-smooth text-white" size="lg">
              Ver QR Code Completo
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsumerTickets;
