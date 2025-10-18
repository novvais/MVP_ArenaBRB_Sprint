import { Button } from "@/components/ui/button";
import { User, ArrowRight, LogOut } from "lucide-react";
import brbLogo from "@/assets/brb-logo.png";

interface ConsumerProfileProps {
  onNavigateToUserData: () => void;
  onSwitchToProducer: () => void;
}

const ConsumerProfile = ({ onNavigateToUserData, onSwitchToProducer }: ConsumerProfileProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card/80 backdrop-blur-lg border-b border-border p-4 sticky top-0 z-10 shadow-card">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={brbLogo} alt="Arena BRB" className="h-12 hover-lift" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-6 animate-fade-in">
        <div className="text-center space-y-4 py-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="absolute -inset-2 gradient-primary blur-xl opacity-30 animate-pulse" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">João Silva</h2>
            <p className="text-muted-foreground text-lg">joao.silva@email.com</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onNavigateToUserData}
            className="w-full flex items-center justify-between p-5 bg-card border border-border rounded-2xl hover:border-primary hover-lift transition-smooth group shadow-card"
          >
            <span className="font-bold text-foreground text-lg">Meus Dados</span>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-smooth" />
          </button>

          <button
            onClick={onSwitchToProducer}
            className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-accent to-primary border-2 border-accent/50 rounded-2xl hover:shadow-glow transition-smooth group text-white font-bold"
          >
            <span className="font-bold text-lg">Mudar para Produtor</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
          </button>
        </div>

        <div className="pt-8">
          <Button 
            variant="outline" 
            className="w-full border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-smooth font-medium"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da Conta
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ConsumerProfile;
