import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Crown, Gem, Award, Medal } from "lucide-react";
import { UserLevel } from "@/contexts/RewardsContext";

interface LevelBenefitsProps {
  currentLevel: UserLevel;
  nextLevel: UserLevel | null;
  currentPoints: number;
}

const LevelBenefits = ({ currentLevel, nextLevel, currentPoints }: LevelBenefitsProps) => {
  const getLevelIcon = (levelName: string) => {
    const icons: Record<string, typeof Trophy> = {
      Bronze: Medal,
      Prata: Award,
      Ouro: Trophy,
      Platina: Star,
      Diamante: Crown,
    };
    return icons[levelName] || Trophy;
  };

  const getLevelColor = (levelName: string) => {
    const colors: Record<string, string> = {
      Bronze: "bg-gradient-to-br from-amber-700 to-amber-900",
      Prata: "bg-gradient-to-br from-slate-400 to-slate-600",
      Ouro: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      Platina: "bg-gradient-to-br from-cyan-400 to-blue-600",
      Diamante: "bg-gradient-to-br from-purple-400 to-pink-600",
    };
    return colors[levelName] || "bg-gradient-primary";
  };

  const CurrentIcon = getLevelIcon(currentLevel.name);
  const currentColor = getLevelColor(currentLevel.name);

  return (
    <div className="space-y-4">
      {/* Nível Atual */}
      <Card className="overflow-hidden shadow-elegant">
        <div className={`${currentColor} p-6 text-white relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative flex items-center justify-between mb-4">
            <div>
              <p className="text-white/90 text-sm mb-1">Seu Nível Atual</p>
              <h3 className="text-3xl font-bold flex items-center gap-2">
                {currentLevel.name}
              </h3>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-glow">
              <CurrentIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
            {currentPoints} pontos acumulados
          </Badge>
        </div>

        <div className="p-6">
          <h4 className="font-semibold text-foreground mb-3">Benefícios Ativos</h4>
          <ul className="space-y-2">
            {currentLevel.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5">✓</span>
                <span className="text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Próximo Nível */}
      {nextLevel && (
        <Card className="overflow-hidden shadow-card border-primary/30">
          <div className="bg-gradient-subtle p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Próximo Nível</p>
                <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                  {nextLevel.name}
                  <Gem className="h-5 w-5 text-accent" />
                </h4>
              </div>
              <Badge variant="secondary" className="text-primary">
                {nextLevel.minPoints - currentPoints} pts faltando
              </Badge>
            </div>
          </div>

          <div className="p-6">
            <h4 className="font-semibold text-foreground mb-3">
              Novos Benefícios Desbloqueados
            </h4>
            <ul className="space-y-2">
              {nextLevel.benefits
                .filter((benefit) => !currentLevel.benefits.includes(benefit))
                .map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-0.5">★</span>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
            </ul>
          </div>
        </Card>
      )}

      {/* Informação sobre todos os níveis */}
      <Card className="p-6 bg-card shadow-card">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          Todos os Níveis
        </h4>
        <div className="space-y-3">
          {[
            { name: "Bronze", range: "0 - 499 pts", icon: Medal },
            { name: "Prata", range: "500 - 999 pts", icon: Award },
            { name: "Ouro", range: "1.000 - 1.999 pts", icon: Trophy },
            { name: "Platina", range: "2.000 - 4.999 pts", icon: Star },
            { name: "Diamante", range: "5.000+ pts", icon: Crown },
          ].map((level) => {
            const LevelIcon = level.icon;
            const isCurrentLevel = level.name === currentLevel.name;
            const color = getLevelColor(level.name);

            return (
              <div
                key={level.name}
                className={`flex items-center gap-3 p-3 rounded-lg transition-smooth ${
                  isCurrentLevel
                    ? "bg-primary/10 border-2 border-primary/30"
                    : "bg-secondary/50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${color} flex items-center justify-center shadow-sm`}
                >
                  <LevelIcon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p
                    className={`font-semibold ${isCurrentLevel ? "text-primary" : "text-foreground"}`}
                  >
                    {level.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{level.range}</p>
                </div>
                {isCurrentLevel && (
                  <Badge className="bg-primary text-white">Atual</Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default LevelBenefits;
