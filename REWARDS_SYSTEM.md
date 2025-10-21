# Sistema de Pontos e Recompensas - Arena BRB

## 📋 Visão Geral

O Sistema de Pontos e Recompensas foi implementado para aumentar o engajamento dos usuários na plataforma Arena BRB. Os usuários acumulam pontos através de ações na plataforma e podem trocá-los por benefícios exclusivos.

## 🎯 Funcionalidades Principais

### 1. Sistema de Pontos
- Acúmulo de pontos através da compra de ingressos
- Pontos extras por participação em eventos
- Sistema de bônus por indicação
- Desafios especiais para pontos extras

### 2. Sistema de Níveis
O sistema possui 5 níveis de usuário:

#### 🥉 Bronze (0 - 499 pontos)
- Acesso a eventos básicos
- 5% de desconto em ingressos

#### 🥈 Prata (500 - 999 pontos)
- 10% de desconto em ingressos
- Acesso prioritário a vendas
- Bônus de 5 pontos por compra

#### 🥇 Ouro (1.000 - 1.999 pontos)
- 15% de desconto em ingressos
- Acesso VIP a eventos selecionados
- Bônus de 10 pontos por compra
- Upgrade gratuito de assento (quando disponível)

#### 💎 Platina (2.000 - 4.999 pontos)
- 20% de desconto em ingressos
- Acesso VIP a todos os eventos
- Bônus de 20 pontos por compra
- Meet & Greet exclusivos
- Estacionamento preferencial

#### 💠 Diamante (5.000+ pontos)
- 25% de desconto em ingressos
- Acesso ilimitado a áreas VIP
- Bônus de 50 pontos por compra
- Experiências exclusivas com artistas
- Concierge personalizado
- Ingressos gratuitos mensais

### 3. Recompensas Disponíveis

Os usuários podem resgatar suas recompensas através da página de ingressos:

- **Ingresso Grátis** (2.000 pontos) - Válido para qualquer evento
- **Desconto 50%** (500 pontos) - No próximo ingresso
- **Upgrade de Assento** (800 pontos) - Para área VIP
- **Meet & Greet** (1.500 pontos) - Encontro exclusivo com artistas
- **Estacionamento VIP** (300 pontos) - Vaga preferencial em qualquer evento
- **Kit de Boas-Vindas** (1.000 pontos) - Camiseta oficial + acessórios

## 🏗️ Arquitetura

### Estrutura de Arquivos

```
src/
├── contexts/
│   └── RewardsContext.tsx          # Contexto global para gerenciamento de pontos
├── components/
│   └── LevelBenefits.tsx           # Componente de visualização de níveis
└── pages/
    └── consumer/
        ├── ConsumerTickets.tsx     # Página de ingressos com sistema de pontos
        └── ConsumerRewards.tsx     # Página detalhada de níveis e benefícios
```

### Contexto de Recompensas (`RewardsContext.tsx`)

O contexto centraliza toda a lógica de pontos e recompensas:

```typescript
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
```

### Tipos de Dados

#### Ticket
```typescript
interface Ticket {
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
```

#### Reward
```typescript
interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  available: boolean;
  icon: string;
}
```

#### UserLevel
```typescript
interface UserLevel {
  name: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
}
```

## 🎨 Interface do Usuário

### Página de Ingressos (`ConsumerTickets.tsx`)

A página de ingressos foi reformulada para incluir:

1. **Card de Pontos** - Exibe pontos totais, nível atual e progresso para o próximo nível
2. **Seção de Recompensas** - Lista de recompensas disponíveis com indicação de quais podem ser resgatadas
3. **Lista de Ingressos** - Ingressos do usuário com indicação de pontos ganhos por cada um
4. **Dicas de Pontos** - Seção educativa sobre como ganhar mais pontos

### Página de Recompensas (`ConsumerRewards.tsx`)

Página dedicada para visualização detalhada:

1. **Hero Section** - Card destacado com nível atual e progresso
2. **Estatísticas Rápidas** - Visão geral de pontos, nível e progresso
3. **Benefícios Atuais** - Lista completa dos benefícios do nível atual
4. **Próximo Nível** - Preview dos benefícios a desbloquear
5. **Todos os Níveis** - Visão completa de todos os níveis e benefícios

## 🚀 Como Usar

### 1. Adicionar o Provider na Aplicação

```tsx
import { RewardsProvider } from "@/contexts/RewardsContext";

function App() {
  return (
    <RewardsProvider>
      {/* Resto da aplicação */}
    </RewardsProvider>
  );
}
```

### 2. Usar o Hook em Componentes

```tsx
import { useRewards } from "@/contexts/RewardsContext";

function MeuComponente() {
  const {
    points,
    level,
    addPoints,
    redeemReward,
    getCurrentLevel
  } = useRewards();

  return (
    <div>
      <p>Pontos: {points}</p>
      <p>Nível: {level}</p>
    </div>
  );
}
```

### 3. Adicionar Pontos

```tsx
// Ao comprar um ingresso
const handleTicketPurchase = (ticket: Ticket) => {
  addTicket(ticket); // Adiciona o ingresso e os pontos automaticamente
};

// Ou adicionar pontos manualmente
addPoints(100);
```

### 4. Resgatar Recompensa

```tsx
const handleRedeem = (rewardId: number) => {
  const success = redeemReward(rewardId);
  if (success) {
    alert("Recompensa resgatada com sucesso!");
  } else {
    alert("Pontos insuficientes ou recompensa indisponível.");
  }
};
```

## 🎨 Customização de Estilos

### Cores dos Níveis

As cores são definidas no componente através de gradientes:

```typescript
const getLevelColor = (levelName: string) => {
  const colors = {
    Bronze: "from-amber-700 to-amber-900",
    Prata: "from-slate-400 to-slate-600",
    Ouro: "from-yellow-400 to-yellow-600",
    Platina: "from-cyan-400 to-blue-600",
    Diamante: "from-purple-400 to-pink-600",
  };
  return colors[levelName] || "from-primary to-accent";
};
```

### Ícones dos Níveis

```typescript
const getLevelIcon = (levelName: string) => {
  const icons = {
    Bronze: Medal,
    Prata: Award,
    Ouro: Trophy,
    Platina: Star,
    Diamante: Crown,
  };
  return icons[levelName] || Trophy;
};
```

## 📊 Lógica de Negócio

### Cálculo de Progresso

```typescript
const getProgressPercentage = (): number => {
  const nextLevel = getNextLevel();
  if (!nextLevel) return 100;

  const currentLevel = getCurrentLevel();
  const levelRange = nextLevel.minPoints - currentLevel.minPoints;
  const currentProgress = points - currentLevel.minPoints;

  return Math.min((currentProgress / levelRange) * 100, 100);
};
```

### Validação de Resgate

```typescript
const redeemReward = (rewardId: number): boolean => {
  const reward = rewards.find((r) => r.id === rewardId);

  // Verifica se a recompensa existe e está disponível
  if (!reward || !reward.available) {
    return false;
  }

  // Verifica se o usuário tem pontos suficientes
  if (points < reward.points) {
    return false;
  }

  // Deduz os pontos
  setPoints((prev) => prev - reward.points);

  return true;
};
```

## 🔄 Integração com Backend

### Endpoints Sugeridos

```typescript
// GET - Buscar pontos do usuário
GET /api/users/:userId/points

// POST - Adicionar pontos
POST /api/users/:userId/points
Body: { amount: number, reason: string }

// POST - Resgatar recompensa
POST /api/users/:userId/rewards/redeem
Body: { rewardId: number }

// GET - Histórico de transações
GET /api/users/:userId/points/history

// GET - Recompensas disponíveis
GET /api/rewards
```

### Exemplo de Integração

```typescript
// Buscar pontos do servidor
useEffect(() => {
  const fetchPoints = async () => {
    const response = await fetch(`/api/users/${userId}/points`);
    const data = await response.json();
    setPoints(data.points);
  };
  
  fetchPoints();
}, [userId]);

// Resgatar recompensa com API
const redeemReward = async (rewardId: number) => {
  try {
    const response = await fetch(`/api/users/${userId}/rewards/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rewardId })
    });
    
    if (response.ok) {
      const data = await response.json();
      setPoints(data.newPoints);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erro ao resgatar recompensa:', error);
    return false;
  }
};
```

## 📱 Recursos Visuais

### Animações e Transições

- Barra de progresso animada
- Efeito hover nos cards de recompensas
- Transições suaves ao expandir QR codes
- Efeito de glow nos elementos premium

### Responsividade

- Layout adaptável para mobile e desktop
- Grid responsivo para recompensas
- Cards que se ajustam ao tamanho da tela

## 🔐 Segurança

### Considerações de Segurança

1. **Validação no Backend**: Todas as operações de pontos devem ser validadas no servidor
2. **Autenticação**: Verificar identidade do usuário antes de permitir resgates
3. **Rate Limiting**: Limitar tentativas de resgate para evitar abuso
4. **Auditoria**: Manter log de todas as transações de pontos

## 🧪 Testes

### Casos de Teste Sugeridos

```typescript
describe('RewardsContext', () => {
  test('adiciona pontos corretamente', () => {
    // Testar adição de pontos
  });

  test('calcula nível atual baseado nos pontos', () => {
    // Testar cálculo de nível
  });

  test('não permite resgatar recompensa sem pontos suficientes', () => {
    // Testar validação de resgate
  });

  test('calcula progresso para próximo nível', () => {
    // Testar cálculo de progresso
  });
});
```

## 📈 Métricas e Analytics

### Eventos para Rastrear

- `points_earned` - Quando usuário ganha pontos
- `level_up` - Quando usuário sobe de nível
- `reward_viewed` - Quando usuário visualiza recompensas
- `reward_redeemed` - Quando usuário resgata uma recompensa
- `progress_viewed` - Quando usuário visualiza página de níveis

## 🎁 Futuras Melhorias

1. **Gamificação Avançada**
   - Badges e conquistas
   - Desafios diários/semanais
   - Ranking de usuários

2. **Personalização**
   - Recompensas personalizadas baseadas em preferências
   - Ofertas especiais baseadas no histórico

3. **Social**
   - Compartilhar conquistas
   - Competir com amigos
   - Presentes de pontos

4. **Notificações**
   - Alertas quando próximo de subir de nível
   - Notificação de novas recompensas
   - Lembretes de pontos expirando

## 🤝 Contribuindo

Para adicionar novas recompensas ou níveis, edite:
- `src/contexts/RewardsContext.tsx` - Adicionar dados de recompensas
- `src/components/LevelBenefits.tsx` - Atualizar visualização de níveis
- `REWARDS_SYSTEM.md` - Documentar mudanças

## 📞 Suporte

Para dúvidas ou problemas relacionados ao sistema de recompensas, entre em contato com a equipe de desenvolvimento.

---

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2025  
**Desenvolvido para:** Arena BRB MVP Sprint