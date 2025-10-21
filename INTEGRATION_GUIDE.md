# Guia de Integração - Página de Recompensas

## 📋 Visão Geral

Este guia mostra como adicionar a página de recompensas detalhada (`ConsumerRewards.tsx`) na navegação da aplicação, caso você queira que os usuários possam acessá-la diretamente.

## 🎯 Opções de Integração

### Opção 1: Adicionar como Aba na Navegação Inferior (Recomendado)

Esta opção adiciona um ícone de troféu na barra de navegação inferior.

#### Passo 1: Atualizar ConsumerLayout.tsx

Edite `src/components/layouts/ConsumerLayout.tsx`:

```tsx
import { Home, Ticket, Map, User, Trophy } from "lucide-react"; // Adicione Trophy

// No array navItems, adicione:
const navItems = [
  { id: "home", label: "Início", icon: Home },
  { id: "tickets", label: "Ingressos", icon: Ticket },
  { id: "rewards", label: "Recompensas", icon: Trophy }, // NOVO
  { id: "map", label: "Mapa", icon: Map },
  { id: "profile", label: "Perfil", icon: User },
];
```

#### Passo 2: Atualizar Index.tsx

Edite `src/pages/Index.tsx`:

```tsx
import ConsumerRewards from "./consumer/ConsumerRewards"; // Adicione no topo

// Adicione no type AppScreen:
type AppScreen =
  | "consumer-login"
  | "preferences"
  | "home"
  | "tickets"
  | "rewards" // NOVO
  | "map"
  | "profile"
  // ... resto dos tipos

// Adicione no switch do renderScreen():
case "rewards":
  return (
    <ConsumerLayout currentPage="rewards" onNavigate={(page) => setCurrentScreen(page as AppScreen)}>
      <ConsumerRewards />
    </ConsumerLayout>
  );
```

---

### Opção 2: Adicionar Botão na Página de Ingressos

Esta opção mantém a navegação atual e adiciona um botão "Ver Todos os Níveis" na página de ingressos.

#### Edite ConsumerTickets.tsx

Adicione no final da seção de pontos (após o Card de Pontos):

```tsx
import { ChevronRight } from "lucide-react";

// Dentro do componente, adicione uma prop para navegação:
interface ConsumerTicketsProps {
  onNavigateToRewards?: () => void;
}

const ConsumerTickets = ({ onNavigateToRewards }: ConsumerTicketsProps) => {
  // ... código existente

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* ... código existente ... */}
      
      <main className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Card de Pontos existente */}
        <Card className="overflow-hidden shadow-elegant">
          {/* ... conteúdo do card ... */}
          
          {/* ADICIONE ESTE BOTÃO: */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-between text-primary hover:bg-primary/10"
              onClick={onNavigateToRewards}
            >
              <span>Ver Todos os Níveis e Benefícios</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
        
        {/* ... resto do código ... */}
      </main>
    </div>
  );
};
```

#### Atualize Index.tsx para passar a prop:

```tsx
case "tickets":
  return (
    <ConsumerLayout currentPage="tickets" onNavigate={(page) => setCurrentScreen(page as AppScreen)}>
      <ConsumerTickets onNavigateToRewards={() => setCurrentScreen("rewards")} />
    </ConsumerLayout>
  );

// E adicione o case "rewards" como mostrado na Opção 1
```

---

### Opção 3: Adicionar no Menu de Perfil

Esta opção adiciona um item no menu do perfil do usuário.

#### Edite ConsumerProfile.tsx

```tsx
// Adicione uma nova prop
interface ConsumerProfileProps {
  onNavigateToUserData: () => void;
  onNavigateToRewards?: () => void; // NOVO
  onSwitchToProducer: () => void;
  onLogout: () => void;
}

const ConsumerProfile = ({
  onNavigateToUserData,
  onNavigateToRewards, // NOVO
  onSwitchToProducer,
  onLogout,
}: ConsumerProfileProps) => {
  // ... código existente

  // Na lista de opções de menu, adicione:
  const menuOptions = [
    {
      icon: Trophy,
      label: "Níveis e Recompensas",
      description: "Veja seus benefícios",
      onClick: onNavigateToRewards,
    },
    // ... outras opções
  ];
};
```

#### Atualize Index.tsx:

```tsx
case "profile":
  return (
    <ConsumerLayout currentPage="profile" onNavigate={(page) => setCurrentScreen(page as AppScreen)}>
      <ConsumerProfile
        onNavigateToUserData={() => setCurrentScreen("user-data")}
        onNavigateToRewards={() => setCurrentScreen("rewards")} // NOVO
        onSwitchToProducer={() => setCurrentScreen("producer-login")}
        onLogout={() => setCurrentScreen("consumer-login")}
      />
    </ConsumerLayout>
  );
```

---

## 🎨 Opção 4: Modal/Dialog ao invés de Página Completa

Se preferir não adicionar uma nova página, pode mostrar os níveis em um dialog.

#### Crie um componente LevelDialog.tsx:

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LevelBenefits from "@/components/LevelBenefits";
import { useRewards } from "@/contexts/RewardsContext";

interface LevelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LevelDialog = ({ open, onOpenChange }: LevelDialogProps) => {
  const { getCurrentLevel, getNextLevel, points } = useRewards();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Níveis e Benefícios</DialogTitle>
        </DialogHeader>
        <LevelBenefits
          currentLevel={getCurrentLevel()}
          nextLevel={getNextLevel()}
          currentPoints={points}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LevelDialog;
```

#### Use no ConsumerTickets.tsx:

```tsx
import { useState } from "react";
import LevelDialog from "@/components/LevelDialog";

const ConsumerTickets = () => {
  const [showLevelsDialog, setShowLevelsDialog] = useState(false);

  return (
    <>
      {/* ... seu código ... */}
      
      {/* Adicione um botão para abrir o dialog */}
      <Button onClick={() => setShowLevelsDialog(true)}>
        Ver Níveis
      </Button>

      {/* Adicione o dialog */}
      <LevelDialog
        open={showLevelsDialog}
        onOpenChange={setShowLevelsDialog}
      />
    </>
  );
};
```

---

## 🚀 Implementação Completa (Opção 1 - Recomendada)

### Arquivo: src/components/layouts/ConsumerLayout.tsx

```tsx
import { Home, Ticket, Trophy, Map, User } from "lucide-react";
import { ReactNode } from "react";

interface ConsumerLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const ConsumerLayout = ({ children, currentPage, onNavigate }: ConsumerLayoutProps) => {
  const navItems = [
    { id: "home", label: "Início", icon: Home },
    { id: "tickets", label: "Ingressos", icon: Ticket },
    { id: "rewards", label: "Recompensas", icon: Trophy },
    { id: "map", label: "Mapa", icon: Map },
    { id: "profile", label: "Perfil", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      {children}
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 flex-1 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "fill-primary" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default ConsumerLayout;
```

### Arquivo: src/pages/Index.tsx (Parte Relevante)

```tsx
import ConsumerRewards from "./consumer/ConsumerRewards";

type AppScreen =
  | "consumer-login"
  | "preferences"
  | "home"
  | "tickets"
  | "rewards"
  | "map"
  | "profile"
  | "user-data"
  // ... outros tipos

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("consumer-login");

  const renderScreen = () => {
    switch (currentScreen) {
      // ... outros cases
      
      case "tickets":
        return (
          <ConsumerLayout currentPage="tickets" onNavigate={(page) => setCurrentScreen(page as AppScreen)}>
            <ConsumerTickets />
          </ConsumerLayout>
        );
        
      case "rewards":
        return (
          <ConsumerLayout currentPage="rewards" onNavigate={(page) => setCurrentScreen(page as AppScreen)}>
            <ConsumerRewards />
          </ConsumerLayout>
        );
        
      // ... outros cases
    }
  };

  return <>{renderScreen()}</>;
};
```

---

## ✅ Checklist de Integração

### Para Opção 1 (Aba na Navegação):
- [ ] Importar `Trophy` e `ConsumerRewards` nos arquivos necessários
- [ ] Adicionar item no array `navItems` do ConsumerLayout
- [ ] Adicionar "rewards" no type `AppScreen`
- [ ] Adicionar case "rewards" no switch do Index.tsx
- [ ] Testar navegação entre todas as abas

### Para Opção 2 (Botão na Página de Ingressos):
- [ ] Adicionar prop `onNavigateToRewards` em ConsumerTickets
- [ ] Adicionar botão na página de ingressos
- [ ] Passar a prop no Index.tsx
- [ ] Adicionar case "rewards" no Index.tsx
- [ ] Testar navegação

### Para Opção 3 (Menu de Perfil):
- [ ] Adicionar prop no ConsumerProfile
- [ ] Adicionar item no menu do perfil
- [ ] Passar a prop no Index.tsx
- [ ] Adicionar case "rewards" no Index.tsx
- [ ] Testar navegação

### Para Opção 4 (Dialog):
- [ ] Criar componente LevelDialog
- [ ] Adicionar useState para controlar visibilidade
- [ ] Adicionar botão para abrir dialog
- [ ] Testar abertura e fechamento do dialog

---

## 🎨 Personalização Visual

### Destacar a Aba de Recompensas

Para dar mais destaque à aba de recompensas, você pode adicionar um badge de notificação:

```tsx
// No ConsumerLayout.tsx
const hasNewRewards = true; // Calcule baseado em lógica real

<button
  key={item.id}
  onClick={() => onNavigate(item.id)}
  className="relative flex flex-col items-center gap-1 flex-1"
>
  <Icon className="w-6 h-6" />
  <span className="text-xs">{item.label}</span>
  
  {/* Badge de notificação */}
  {item.id === "rewards" && hasNewRewards && (
    <span className="absolute top-0 right-1/4 w-2 h-2 bg-red-500 rounded-full" />
  )}
</button>
```

### Adicionar Animação de Pulso

```tsx
{item.id === "rewards" && hasNewRewards && (
  <span className="absolute top-0 right-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
)}
```

---

## 📱 Considerações de UX

### Quando Usar Cada Opção:

1. **Aba na Navegação** (Opção 1)
   - ✅ Melhor para acesso frequente
   - ✅ Sistema de recompensas é feature principal
   - ❌ Ocupa espaço na navegação

2. **Botão na Página de Ingressos** (Opção 2)
   - ✅ Mantém navegação limpa
   - ✅ Contexto natural (ingressos → recompensas)
   - ❌ Menos visível

3. **Menu de Perfil** (Opção 3)
   - ✅ Organizado com outras configurações
   - ❌ Menos descoberto pelos usuários
   - ❌ Requer mais cliques

4. **Dialog/Modal** (Opção 4)
   - ✅ Não requer navegação adicional
   - ✅ Overlay mantém contexto
   - ❌ Menos espaço para conteúdo
   - ❌ Pode ser difícil em telas pequenas

---

## 🔄 Estado Atual do Projeto

Atualmente, o sistema de pontos e recompensas está **totalmente integrado na página de Ingressos**:

- ✅ Card de pontos e nível no topo
- ✅ Barra de progresso animada
- ✅ Seção de recompensas disponíveis
- ✅ Lista de ingressos com pontos ganhos
- ✅ Dicas de como ganhar pontos

**A página ConsumerRewards.tsx está criada e pronta para uso**, mas não está na navegação. Escolha uma das opções acima para integrá-la!

---

## 💡 Recomendação

Para o MVP, recomendamos **manter apenas na página de Ingressos** (estado atual), pois:
1. Mantém a navegação simples (4 itens)
2. Contexto natural (ingressos = pontos = recompensas)
3. Menos complexidade de navegação
4. Usuários veem recompensas ao verificar ingressos

Se quiser adicionar mais tarde, a **Opção 2** (botão na página de ingressos) é a mais simples de implementar.

---

## 📞 Suporte

Se precisar de ajuda na integração, consulte:
- `REWARDS_SYSTEM.md` - Documentação técnica completa
- `QUICKSTART_REWARDS.md` - Guia de início rápido
- Este arquivo - Guia de integração