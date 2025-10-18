import { Button } from "@/components/ui/button";
import { User, ArrowRight, LogOut } from "lucide-react";
import logoProdutorArenaBRB from "@/assets/logo_produtor_ArenaBRB.svg";

interface ProducerProfileProps {
  onSwitchToConsumer: () => void;
}

const ProducerProfile = ({ onSwitchToConsumer }: ProducerProfileProps) => {
  return (
    <div className="min-h-screen producer-theme bg-producer-background text-producer-foreground animate-fade-in">
      <header className="bg-producer-surface/80 backdrop-blur-lg border-b border-border p-4 sticky top-0 z-10 shadow-producer-card">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={logoProdutorArenaBRB} alt="Arena BRB" className="h-12 hover-producer-glow transition-smooth" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-4 py-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 gradient-producer-accent rounded-full flex items-center justify-center mx-auto shadow-producer-glow">
              <User className="w-12 h-12 text-secondary-foreground" />
            </div>
            <div className="absolute -inset-4 gradient-producer-accent blur-2xl opacity-20 animate-pulse" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Maria Produtora</h2>
            <p className="text-muted-foreground text-lg">maria.produtora@eventos.com</p>
            <p className="text-sm gradient-producer-accent bg-clip-text text-transparent font-bold mt-2">Produtor Profissional</p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-5 bg-producer-surface border border-border rounded-2xl hover:border-producer-gold hover-producer-glow transition-smooth group shadow-producer-card">
            <span className="font-bold text-lg">Meus Dados</span>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-producer-gold group-hover:translate-x-1 transition-smooth" />
          </button>

          <button className="w-full flex items-center justify-between p-5 bg-producer-surface border border-border rounded-2xl hover:border-producer-gold hover-producer-glow transition-smooth group shadow-producer-card">
            <span className="font-bold text-lg">Configurações</span>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-producer-gold group-hover:translate-x-1 transition-smooth" />
          </button>

          <button
            onClick={onSwitchToConsumer}
            className="w-full flex items-center justify-between p-5 gradient-producer-accent border-2 border-primary/30 rounded-2xl hover:shadow-producer-glow transition-smooth group text-producer-gold-foreground"
          >
            <span className="font-bold text-lg">Mudar para Consumidor</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
          </button>
        </div>

        <div className="pt-8">
          <Button variant="outline" className="w-full hover:border-producer-gold hover:text-producer-gold transition-smooth">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProducerProfile;
