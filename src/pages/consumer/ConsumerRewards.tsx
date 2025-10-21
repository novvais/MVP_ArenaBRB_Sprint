import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Star,
  Crown,
  Gem,
  Award,
  Medal,
  TrendingUp,
  Gift,
  Zap,
  ChevronRight,
} from "lucide-react";
import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";
import { useRewards } from "@/contexts/RewardsContext";
import LevelBenefits from "@/components/LevelBenefits";

const ConsumerRewards = () => {
  const {
    points,
    getCurrentLevel,
    getNextLevel,
    getPointsToNextLevel,
    getProgressPercentage,
    userLevels,
  } = useRewards();

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const pointsToNextLevel = getPointsToNextLevel();
  const progressPercentage = getProgressPercentage();

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
      Bronze: "from-amber-700 to-amber-900",
      Prata: "from-slate-400 to-slate-600",
      Ouro: "from-yellow-400 to-yellow-600",
      Platina: "from-cyan-400 to-blue-600",
      Diamante: "from-purple-400 to-pink-600",
    };
    return colors[levelName] || "from-primary to-accent";
  };

  const CurrentIcon = getLevelIcon(currentLevel.name);

  // Estatísticas rápidas
  const stats = [
    {
      icon: Trophy,
      label: "Pontos Totais",
      value: points.toLocaleString(),
      color: "text-primary",
    },
    {
      icon: Star,
      label: "Nível Atual",
      value: currentLevel.name,
      color: "text-accent",
    },
    {
      icon: TrendingUp,
      label: "Para Próximo Nível",
      value: nextLevel ? `${pointsToNextLevel} pts` : "Nível Máximo",
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={logoConsumidorArenaBRB} alt="Arena BRB" className="h-12" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Trophy className="w-8 h-8 text-accent" />
            Sistema de Níveis
          </h1>
          <p className="text-muted-foreground">
            Acumule pontos, suba de nível e desbloqueie benefícios exclusivos
          </p>
        </div>

        {/* Card de Progresso Principal */}
        <Card className="overflow-hidden shadow-elegant">
          <div
            className={`bg-gradient-to-br ${getLevelColor(currentLevel.name)} p-8 text-white relative`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute top-4 right-4 opacity-10">
              <CurrentIcon className="w-32 h-32" />
            </div>

            <div className="relative space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/90 text-sm mb-2">Seu Nível</p>
                  <h2 className="text-5xl font-bold mb-2">{currentLevel.name}</h2>
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                    <Star className="h-3 w-3 mr-1" />
                    {points.toLocaleString()} pontos
                  </Badge>
                </div>
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-glow">
                  <CurrentIcon className="h-10 w-10 text-white" />
                </div>
              </div>

              {nextLevel && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/90 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Progresso para {nextLevel.name}
                    </span>
                    <span className="font-semibold">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                      <div
                        className="bg-white h-full rounded-full transition-all duration-500 shadow-glow relative"
                        style={{ width: `${progressPercentage}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm">
                    Faltam apenas <strong>{pointsToNextLevel}</strong> pontos para o
                    próximo nível!
                  </p>
                </div>
              )}

              {!nextLevel && (
                <div className="flex items-center gap-3 bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <Crown className="h-6 w-6" />
                  <div>
                    <p className="font-semibold">Nível Máximo Alcançado!</p>
                    <p className="text-sm text-white/80">
                      Você desbloqueou todos os benefícios
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="p-4 text-center hover-lift transition-smooth"
              >
                <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="font-bold text-foreground text-sm">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Benefícios do Nível Atual */}
        <LevelBenefits
          currentLevel={currentLevel}
          nextLevel={nextLevel}
          currentPoints={points}
        />

        {/* Todos os Níveis - Versão Detalhada */}
        <Card className="p-6 shadow-elegant">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Gem className="w-6 h-6 text-accent" />
            Todos os Níveis e Benefícios
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Descubra todos os benefícios que você pode desbloquear
          </p>

          <div className="space-y-4">
            {userLevels.map((level, index) => {
              const LevelIcon = getLevelIcon(level.name);
              const isCurrentLevel = level.name === currentLevel.name;
              const isUnlocked = points >= level.minPoints;
              const colorClasses = getLevelColor(level.name);

              return (
                <Card
                  key={level.name}
                  className={`overflow-hidden transition-smooth ${
                    isCurrentLevel
                      ? "border-2 border-primary shadow-glow"
                      : isUnlocked
                        ? "border border-primary/30"
                        : "border border-border opacity-70"
                  }`}
                >
                  <div
                    className={`p-4 ${isUnlocked ? `bg-gradient-to-r ${colorClasses}` : "bg-muted"} text-white`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full ${isUnlocked ? "bg-white/20 backdrop-blur-sm" : "bg-muted-foreground/20"} flex items-center justify-center`}
                        >
                          <LevelIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{level.name}</h4>
                          <p
                            className={`text-sm ${isUnlocked ? "text-white/80" : "text-muted-foreground"}`}
                          >
                            {level.minPoints === 0
                              ? `0 - ${level.maxPoints} pts`
                              : level.maxPoints === Infinity
                                ? `${level.minPoints}+ pts`
                                : `${level.minPoints} - ${level.maxPoints} pts`}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {isCurrentLevel && (
                          <Badge className="bg-white/90 text-primary">
                            Nível Atual
                          </Badge>
                        )}
                        {!isUnlocked && (
                          <Badge variant="secondary" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            Bloqueado
                          </Badge>
                        )}
                        {isUnlocked && !isCurrentLevel && (
                          <Badge className="bg-white/20 text-white border-0">
                            <Star className="h-3 w-3 mr-1" />
                            Desbloqueado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Gift className="h-4 w-4 text-accent" />
                      <h5 className="font-semibold text-foreground text-sm">
                        Benefícios
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {level.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span
                            className={`mt-0.5 ${isUnlocked ? "text-primary" : "text-muted-foreground"}`}
                          >
                            {isUnlocked ? "✓" : "○"}
                          </span>
                          <span
                            className={
                              isUnlocked
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }
                          >
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {!isUnlocked && points < level.minPoints && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          <TrendingUp className="h-3 w-3" />
                          Faltam {level.minPoints - points} pontos para desbloquear
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>

        {/* Call to Action */}
        <Card className="p-6 bg-gradient-subtle border-primary/20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full gradient-accent flex items-center justify-center mx-auto shadow-glow">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg mb-2">
                Continue Acumulando Pontos!
              </h3>
              <p className="text-sm text-muted-foreground">
                Participe de eventos, compre ingressos e desbloqueie benefícios
                exclusivos
              </p>
            </div>
            <Button className="bg-gradient-to-r from-accent to-primary text-white hover:shadow-glow transition-smooth">
              Explorar Eventos
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ConsumerRewards;
