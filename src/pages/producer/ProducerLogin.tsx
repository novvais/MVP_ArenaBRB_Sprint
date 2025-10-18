import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import producerLogo from "@/assets/producer-logo.png";

interface ProducerLoginProps {
  onLogin: () => void;
  onBackToConsumer: () => void;
}

const ProducerLogin = ({ onLogin, onBackToConsumer }: ProducerLoginProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="producer-theme min-h-screen bg-producer-background text-producer-foreground flex flex-col animate-fade-in">
      <div className="p-4">
        <button
          onClick={onBackToConsumer}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-smooth" />
          <span className="text-sm font-medium">Voltar</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 animate-scale-in">
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <img src={producerLogo} alt="Arena BRB Produtor" className="h-24 mx-auto hover-producer-glow transition-smooth" />
              <div className="absolute -inset-4 gradient-producer-primary blur-2xl opacity-20 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold gradient-producer-primary bg-clip-text text-transparent">Portal do Produtor</h1>
            <p className="text-muted-foreground text-lg">Acesse sua conta profissional</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="producer-email" className="text-sm font-semibold">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-primary/70" />
                <Input
                  id="producer-email"
                  type="email"
                  placeholder="produtor@email.com"
                  className="pl-10 bg-producer-surface border-border transition-smooth focus:border-primary focus:shadow-producer-glow"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="producer-password" className="text-sm font-semibold">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-primary/70" />
                <Input
                  id="producer-password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-producer-surface border-border transition-smooth focus:border-primary focus:shadow-producer-glow"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold" size="lg">
              Entrar como Produtor
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProducerLogin;
