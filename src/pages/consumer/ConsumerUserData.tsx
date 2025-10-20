import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";

interface ConsumerUserDataProps {
  onBack: () => void;
}

const ConsumerUserData = ({ onBack }: ConsumerUserDataProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBack();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={logoConsumidorArenaBRB} alt="Arena BRB" className="h-12" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-8">
        <h1 className="text-2xl font-bold text-foreground">Meus Dados</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              type="text"
              defaultValue="João Silva"
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="joao.silva@email.com"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              defaultValue="(61) 98765-4321"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              type="text"
              defaultValue="123.456.789-00"
              placeholder="000.000.000-00"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-accent to-primary hover:shadow-glow transition-smooth text-white">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ConsumerUserData;
