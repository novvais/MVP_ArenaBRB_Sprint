import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Star,
  Gift,
  Ticket as TicketIcon,
  Award,
  MapPin,
  TrendingUp,
  Zap,
  X,
} from "lucide-react";
import { useRewards } from "@/contexts/RewardsContext";
import { useState, useEffect } from "react";

interface WalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletDialog = ({ open, onOpenChange }: WalletDialogProps) => {
  const {
    points,
    level,
    rewards,
    redeemReward,
    getNextLevel,
    getPointsToNextLevel,
    getProgressPercentage,
  } = useRewards();

  const [showFirstTimePopup, setShowFirstTimePopup] = useState(false);

  useEffect(() => {
    // Verifica se é a primeira vez que o usuário abre o dialog
    const hasSeenWalletInfo = localStorage.getItem("hasSeenWalletInfo");

    if (!hasSeenWalletInfo && open) {
      setShowFirstTimePopup(true);
      localStorage.setItem("hasSeenWalletInfo", "true");
    }
  }, [open]);

  const nextLevel = getNextLevel();
  const pointsToNextLevel = getPointsToNextLevel();
  const progressPercentage = getProgressPercentage();

  const handleRedeemReward = (rewardId: number) => {
    const success = redeemReward(rewardId);
    if (success) {
      alert("Recompensa resgatada com sucesso! 🎉");
    } else {
      alert("Não foi possível resgatar esta recompensa.");
    }
  };

  const getRewardIcon = (iconName: string) => {
    const icons: Record<string, typeof TicketIcon> = {
      ticket: TicketIcon,
      gift: Gift,
      star: Star,
      trophy: Trophy,
      award: Award,
      parking: MapPin,
    };
    return icons[iconName] || Gift;
  };

  return (
    <>
      {/* Dialog Principal da Carteira */}
      <Dialog open={open && !showFirstTimePopup} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0">
          {/* Header com Pontos */}
          <div className="gradient-primary p-6 text-white relative overflow-hidden sticky top-0 z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors backdrop-blur-sm z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-3xl font-bold text-white flex items-center gap-3">
                  <Trophy className="w-8 h-8" />
                  Minha Carteira
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/90 text-sm mb-1">Seus Pontos</p>
                    <h3 className="text-4xl font-bold">{points}</h3>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-glow">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
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
            </div>
          </div>

          {/* Conteúdo do Dialog */}
          <div className="p-6 space-y-6">
            {/* Seção de Recompensas Disponíveis */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Gift className="w-6 h-6 text-accent" />
                  Recompensas Disponíveis
                </h3>
                <Badge variant="secondary" className="text-sm">
                  {rewards.filter((r) => r.available).length} disponíveis
                </Badge>
              </div>

              <div className="grid gap-3">
                {rewards.map((reward) => {
                  const Icon = getRewardIcon(reward.icon);
                  const canRedeem = reward.available && points >= reward.points;
                  const pointsNeeded = reward.points - points;

                  return (
                    <Card
                      key={reward.id}
                      className={`p-4 transition-smooth ${
                        canRedeem
                          ? "hover-lift cursor-pointer border-accent/50"
                          : "opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                            canRedeem
                              ? "gradient-accent shadow-glow"
                              : "bg-muted"
                          }`}
                        >
                          <Icon
                            className={`h-6 w-6 ${canRedeem ? "text-white" : "text-muted-foreground"}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground mb-1">
                            {reward.title}
                          </h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {reward.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {reward.points} pontos
                          </p>
                        </div>
                        {canRedeem ? (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-accent to-primary text-white hover:shadow-glow transition-smooth"
                            onClick={() => handleRedeemReward(reward.id)}
                          >
                            Resgatar
                          </Button>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="text-xs whitespace-nowrap"
                          >
                            {pointsNeeded > 0
                              ? `${pointsNeeded} pts faltando`
                              : "Indisponível"}
                          </Badge>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Dicas de Como Ganhar Pontos */}
            <Card className="p-6 bg-gradient-subtle border-primary/20">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Como Ganhar Mais Pontos?
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Compre ingressos e ganhe pontos a cada compra</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Participe dos eventos e ganhe pontos extras</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Indique amigos e ganhe bônus de indicação</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Complete desafios especiais para pontos extras</span>
                </li>
              </ul>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pop-up Educativo de Primeira Vez */}
      <Dialog open={showFirstTimePopup} onOpenChange={setShowFirstTimePopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <Zap className="w-7 h-7 text-accent" />
              Bem-vindo à sua Carteira!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-muted-foreground">
              Aqui você pode acompanhar seus pontos e resgatar recompensas
              exclusivas!
            </p>

            <Card className="p-4 bg-gradient-subtle border-primary/20">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Como Ganhar Pontos
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 text-lg">🎫</span>
                  <span>
                    <strong className="text-foreground">Compre ingressos</strong> e
                    ganhe pontos a cada compra
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 text-lg">🎪</span>
                  <span>
                    <strong className="text-foreground">Participe de eventos</strong>{" "}
                    e ganhe pontos extras
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 text-lg">👥</span>
                  <span>
                    <strong className="text-foreground">Indique amigos</strong> e
                    ganhe bônus de indicação
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 text-lg">🎯</span>
                  <span>
                    <strong className="text-foreground">Complete desafios</strong>{" "}
                    especiais para pontos extras
                  </span>
                </li>
              </ul>
            </Card>

            <Card className="p-4 gradient-accent text-white">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 flex-shrink-0" />
                <div>
                  <p className="font-bold mb-1">Sistema de Níveis</p>
                  <p className="text-sm text-white/90">
                    Quanto mais pontos você acumular, mais benefícios exclusivos
                    você desbloqueia!
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Button
            onClick={() => setShowFirstTimePopup(false)}
            className="w-full bg-gradient-to-r from-accent to-primary text-white hover:shadow-glow transition-smooth"
            size="lg"
          >
            Entendi, vamos começar!
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletDialog;
