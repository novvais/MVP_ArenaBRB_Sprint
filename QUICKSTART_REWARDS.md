# Guia de Início Rápido - Sistema de Pontos e Recompensas

## 🚀 Começando

O sistema de pontos e recompensas já está totalmente integrado na aba **Ingressos** do projeto. Este guia mostra como usar e personalizar o sistema.

## 📍 Onde Encontrar

### Página Principal: Ingressos
- **Localização**: `src/pages/consumer/ConsumerTickets.tsx`
- **Acesso**: Aba "Ingressos" na navegação inferior
- **Conteúdo**:
  - Card de pontos com nível atual
  - Barra de progresso para próximo nível
  - Recompensas disponíveis para resgate
  - Lista de ingressos com pontos ganhos

### Página de Detalhes: Níveis e Benefícios
- **Localização**: `src/pages/consumer/ConsumerRewards.tsx`
- **Conteúdo**:
  - Visão detalhada de todos os níveis
  - Benefícios completos de cada nível
  - Estatísticas e progresso
  - Comparação entre níveis

## 🎯 Uso Básico

### 1. Visualizar Pontos e Nível

```tsx
import { useRewards } from "@/contexts/RewardsContext";

function MeuComponente() {
  const { points, level } = useRewards();
  
  return (
    <div>
      <p>Você tem {points} pontos</p>
      <p>Nível: {level}</p>
    </div>
  );
}
```

### 2. Adicionar Pontos ao Comprar Ingresso

```tsx
import { useRewards } from "@/contexts/RewardsContext";

function CompraIngresso() {
  const { addTicket } = useRewards();
  
  const handlePurchase = () => {
    const novoIngresso = {
      id: Date.now(),
      event: "Nome do Evento",
      venue: "Arena BRB",
      address: "SRPN - Brasília, DF",
      date: "15 Jan, 2025",
      time: "20:00",
      gate: "Portão 1",
      seat: "A-100",
      code: `TKT-${Date.now()}`,
      status: "Válido",
      pointsEarned: 150, // Pontos ganhos
    };
    
    addTicket(novoIngresso); // Adiciona ingresso E pontos automaticamente
  };
  
  return <button onClick={handlePurchase}>Comprar</button>;
}
```

### 3. Resgatar Recompensa

```tsx
import { useRewards } from "@/contexts/RewardsContext";

function MinhasRecompensas() {
  const { rewards, redeemReward, points } = useRewards();
  
  const handleRedeem = (rewardId: number) => {
    const success = redeemReward(rewardId);
    
    if (success) {
      alert("Recompensa resgatada! 🎉");
    } else {
      alert("Pontos insuficientes ou recompensa indisponível");
    }
  };
  
  return (
    <div>
      {rewards.map(reward => (
        <div key={reward.id}>
          <h3>{reward.title}</h3>
          <p>{reward.points} pontos</p>
          <button 
            onClick={() => handleRedeem(reward.id)}
            disabled={points < reward.points}
          >
            Resgatar
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 4. Verificar Progresso para Próximo Nível

```tsx
import { useRewards } from "@/contexts/RewardsContext";

function MeuProgresso() {
  const {
    getCurrentLevel,
    getNextLevel,
    getPointsToNextLevel,
    getProgressPercentage
  } = useRewards();
  
  const nivelAtual = getCurrentLevel();
  const proximoNivel = getNextLevel();
  const pontosRestantes = getPointsToNextLevel();
  const progresso = getProgressPercentage();
  
  return (
    <div>
      <p>Nível Atual: {nivelAtual.name}</p>
      {proximoNivel && (
        <>
          <p>Próximo: {proximoNivel.name}</p>
          <p>Faltam {pontosRestantes} pontos</p>
          <div>Progresso: {progresso.toFixed(0)}%</div>
        </>
      )}
    </div>
  );
}
```

## 🎨 Personalização

### Modificar Níveis

Edite `src/contexts/RewardsContext.tsx`:

```typescript
const USER_LEVELS: UserLevel[] = [
  {
    name: "Bronze",
    minPoints: 0,
    maxPoints: 499,
    benefits: [
      "Acesso a eventos básicos",
      "5% de desconto em ingressos",
      // Adicione mais benefícios aqui
    ],
  },
  // Adicione mais níveis ou modifique existentes
];
```

### Adicionar Novas Recompensas

Edite `src/contexts/RewardsContext.tsx`:

```typescript
const INITIAL_REWARDS: Reward[] = [
  {
    id: 1,
    title: "Minha Nova Recompensa",
    description: "Descrição da recompensa",
    points: 1000,
    available: true,
    icon: "gift", // ticket, gift, star, trophy, award, parking
  },
  // Adicione mais recompensas aqui
];
```

### Customizar Cores dos Níveis

Edite `src/components/LevelBenefits.tsx` ou `src/pages/consumer/ConsumerRewards.tsx`:

```typescript
const getLevelColor = (levelName: string) => {
  const colors: Record<string, string> = {
    Bronze: "from-amber-700 to-amber-900",
    Prata: "from-slate-400 to-slate-600",
    Ouro: "from-yellow-400 to-yellow-600",
    Platina: "from-cyan-400 to-blue-600",
    Diamante: "from-purple-400 to-pink-600",
    // Adicione cores para novos níveis aqui
  };
  return colors[levelName] || "from-primary to-accent";
};
```

## 📊 Sistema de Níveis

### Bronze (0-499 pts)
- ✅ Acesso a eventos básicos
- ✅ 5% de desconto

### Prata (500-999 pts)
- ✅ 10% de desconto
- ✅ Acesso prioritário
- ✅ +5 pts por compra

### Ouro (1.000-1.999 pts)
- ✅ 15% de desconto
- ✅ Acesso VIP selecionado
- ✅ +10 pts por compra
- ✅ Upgrade de assento

### Platina (2.000-4.999 pts)
- ✅ 20% de desconto
- ✅ Acesso VIP total
- ✅ +20 pts por compra
- ✅ Meet & Greet
- ✅ Estacionamento preferencial

### Diamante (5.000+ pts)
- ✅ 25% de desconto
- ✅ Acesso VIP ilimitado
- ✅ +50 pts por compra
- ✅ Experiências exclusivas
- ✅ Concierge personalizado
- ✅ Ingressos mensais grátis

## 💡 Como Ganhar Pontos

1. **Comprar Ingressos** - Ganhe pontos a cada compra
2. **Participar de Eventos** - Pontos extras por presença
3. **Indicar Amigos** - Bônus de indicação
4. **Completar Desafios** - Pontos extras em desafios especiais

## 🎁 Recompensas Disponíveis

| Recompensa | Pontos | Descrição |
|------------|--------|-----------|
| Ingresso Grátis | 2.000 | Válido para qualquer evento |
| Desconto 50% | 500 | No próximo ingresso |
| Upgrade VIP | 800 | Melhore seu assento |
| Meet & Greet | 1.500 | Encontro com artistas |
| Estacionamento VIP | 300 | Vaga preferencial |
| Kit Boas-Vindas | 1.000 | Camiseta + acessórios |

## 🔧 Integração com Backend

### Exemplo com API

```typescript
// No RewardsContext.tsx, adicione:

useEffect(() => {
  // Buscar pontos do servidor
  const fetchUserPoints = async () => {
    try {
      const response = await fetch('/api/users/me/points');
      const data = await response.json();
      setPoints(data.points);
      setTickets(data.tickets);
    } catch (error) {
      console.error('Erro ao buscar pontos:', error);
    }
  };
  
  fetchUserPoints();
}, []);

// Modificar redeemReward para chamar API
const redeemReward = async (rewardId: number): boolean => {
  try {
    const response = await fetch('/api/rewards/redeem', {
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
    console.error('Erro ao resgatar:', error);
    return false;
  }
};
```

## 📱 Navegação

### Para ir à página de Ingressos:
```tsx
// O sistema já está integrado na aba "Ingressos"
// Navegue pela barra inferior: Home → Ingressos
```

### Para acessar detalhes de Níveis:
```tsx
// Você pode criar um botão que navegue para ConsumerRewards
import { useNavigate } from 'react-router-dom';

function VerMaisNiveis() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/rewards')}>
      Ver Todos os Níveis
    </button>
  );
}
```

## ✅ Checklist de Implementação

- [x] Contexto de Recompensas criado (`RewardsContext.tsx`)
- [x] Sistema de pontos implementado
- [x] Sistema de níveis (Bronze → Diamante)
- [x] Página de ingressos atualizada
- [x] Componente de benefícios (`LevelBenefits.tsx`)
- [x] Página detalhada de recompensas (`ConsumerRewards.tsx`)
- [x] Interface visual com gradientes
- [x] Barra de progresso animada
- [x] Sistema de resgate de recompensas
- [x] Documentação completa

## 🐛 Resolução de Problemas

### Pontos não atualizam
- Verifique se o `RewardsProvider` está envolvendo toda a aplicação no `App.tsx`
- Confirme que está usando o hook `useRewards()` corretamente

### Recompensa não resgata
- Verifique se o usuário tem pontos suficientes
- Confirme que a recompensa está marcada como `available: true`

### Nível não atualiza
- Os níveis são calculados automaticamente baseados nos pontos
- Use `getCurrentLevel()` para obter o nível atualizado

## 📚 Documentação Completa

Para documentação detalhada, veja:
- `REWARDS_SYSTEM.md` - Documentação técnica completa
- `src/contexts/RewardsContext.tsx` - Código fonte do contexto
- `src/pages/consumer/ConsumerTickets.tsx` - Implementação na página de ingressos

## 🎉 Pronto!

O sistema de pontos e recompensas está totalmente funcional e pronto para uso!

Acesse a aba **Ingressos** para ver o sistema em ação.