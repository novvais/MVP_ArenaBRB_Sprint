import { createContext, useContext, useState, ReactNode } from "react";

export interface Ticket {
  id: number;
  event: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  gate: string;
  seat: string;
  code: string;
  status: string;
  pointsEarned: number;
}

export interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  available: boolean;
  icon: string;
}

export interface UserLevel {
  name: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
}

interface RewardsContextType {
  points: number;
  level: string;
  tickets: Ticket[];
  rewards: Reward[];
  userLevels: UserLevel[];
  addPoints: (amount: number) => void;
  redeemReward: (rewardId: number) => boolean;
  addTicket: (ticket: Ticket) => void;
  getCurrentLevel: () => UserLevel;
  getNextLevel: () => UserLevel | null;
  getPointsToNextLevel: () => number;
  getProgressPercentage: () => number;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

const USER_LEVELS: UserLevel[] = [
  {
    name: "Bronze",
    minPoints: 0,
    maxPoints: 499,
    benefits: [
      "Acesso a eventos básicos",
      "5% de desconto em ingressos",
    ],
  },
  {
    name: "Prata",
    minPoints: 500,
    maxPoints: 999,
    benefits: [
      "10% de desconto em ingressos",
      "Acesso prioritário a vendas",
      "Bônus de 5 pontos por compra",
    ],
  },
  {
    name: "Ouro",
    minPoints: 1000,
    maxPoints: 1999,
    benefits: [
      "15% de desconto em ingressos",
      "Acesso VIP a eventos selecionados",
      "Bônus de 10 pontos por compra",
      "Upgrade gratuito de assento (quando disponível)",
    ],
  },
  {
    name: "Platina",
    minPoints: 2000,
    maxPoints: 4999,
    benefits: [
      "20% de desconto em ingressos",
      "Acesso VIP a todos os eventos",
      "Bônus de 20 pontos por compra",
      "Meet & Greet exclusivos",
      "Estacionamento preferencial",
    ],
  },
  {
    name: "Diamante",
    minPoints: 5000,
    maxPoints: Infinity,
    benefits: [
      "25% de desconto em ingressos",
      "Acesso ilimitado a áreas VIP",
      "Bônus de 50 pontos por compra",
      "Experiências exclusivas com artistas",
      "Concierge personalizado",
      "Ingressos gratuitos mensais",
    ],
  },
];

const INITIAL_REWARDS: Reward[] = [
  {
    id: 1,
    title: "Ingresso Grátis",
    description: "Válido para qualquer evento",
    points: 2000,
    available: true,
    icon: "ticket",
  },
  {
    id: 2,
    title: "Desconto 50%",
    description: "No próximo ingresso",
    points: 500,
    available: true,
    icon: "gift",
  },
  {
    id: 3,
    title: "Upgrade de Assento",
    description: "Para área VIP",
    points: 800,
    available: true,
    icon: "star",
  },
  {
    id: 4,
    title: "Meet & Greet",
    description: "Encontro exclusivo com artistas",
    points: 1500,
    available: true,
    icon: "trophy",
  },
  {
    id: 5,
    title: "Estacionamento VIP",
    description: "Vaga preferencial em qualquer evento",
    points: 300,
    available: true,
    icon: "parking",
  },
  {
    id: 6,
    title: "Kit de Boas-Vindas",
    description: "Camiseta oficial + acessórios",
    points: 1000,
    available: true,
    icon: "gift",
  },
];

export const RewardsProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState(1250);
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      event: "Rock in Rio 2025",
      venue: "Arena BRB Mané Garrincha",
      address: "SRPN - Brasília, DF",
      date: "15 Jun, 2025",
      time: "20:00",
      gate: "Portão 3",
      seat: "A-125",
      code: "TKT-12345",
      status: "Válido",
      pointsEarned: 150,
    },
    {
      id: 2,
      event: "Festival Gastronômico",
      venue: "Arena BRB Mané Garrincha",
      address: "SRPN - Brasília, DF",
      date: "22 Jan, 2025",
      time: "12:00",
      gate: "Portão 2",
      seat: "B-87",
      code: "TKT-67890",
      status: "Válido",
      pointsEarned: 100,
    },
  ]);
  const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);
  const userLevels = USER_LEVELS;

  const getCurrentLevel = (): UserLevel => {
    return (
      userLevels.find(
        (level) => points >= level.minPoints && points <= level.maxPoints
      ) || userLevels[0]
    );
  };

  const getNextLevel = (): UserLevel | null => {
    const currentLevel = getCurrentLevel();
    const currentIndex = userLevels.findIndex(
      (level) => level.name === currentLevel.name
    );
    return currentIndex < userLevels.length - 1
      ? userLevels[currentIndex + 1]
      : null;
  };

  const getPointsToNextLevel = (): number => {
    const nextLevel = getNextLevel();
    return nextLevel ? nextLevel.minPoints - points : 0;
  };

  const getProgressPercentage = (): number => {
    const nextLevel = getNextLevel();
    if (!nextLevel) return 100;

    const currentLevel = getCurrentLevel();
    const levelRange = nextLevel.minPoints - currentLevel.minPoints;
    const currentProgress = points - currentLevel.minPoints;

    return Math.min((currentProgress / levelRange) * 100, 100);
  };

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const redeemReward = (rewardId: number): boolean => {
    const reward = rewards.find((r) => r.id === rewardId);

    if (!reward || !reward.available) {
      return false;
    }

    if (points < reward.points) {
      return false;
    }

    setPoints((prev) => prev - reward.points);

    // Você pode adicionar lógica adicional aqui, como marcar a recompensa como resgatada
    // ou adicionar à lista de recompensas do usuário

    return true;
  };

  const addTicket = (ticket: Ticket) => {
    setTickets((prev) => [...prev, ticket]);
    addPoints(ticket.pointsEarned);
  };

  const level = getCurrentLevel().name;

  return (
    <RewardsContext.Provider
      value={{
        points,
        level,
        tickets,
        rewards,
        userLevels,
        addPoints,
        redeemReward,
        addTicket,
        getCurrentLevel,
        getNextLevel,
        getPointsToNextLevel,
        getProgressPercentage,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = (): RewardsContextType => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error("useRewards must be used within a RewardsProvider");
  }
  return context;
};
