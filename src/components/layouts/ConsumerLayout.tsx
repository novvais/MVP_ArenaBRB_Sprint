import { Home, Wallet, Map, User, UtensilsCrossed } from "lucide-react";
import { ReactNode } from "react";

interface ConsumerLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const ConsumerLayout = ({
  children,
  currentPage,
  onNavigate,
}: ConsumerLayoutProps) => {
  const navItems = [
    { id: "home", label: "Início", icon: Home },
    { id: "tickets", label: "Carteira", icon: Wallet },
    { id: "food", label: "F&B", icon: UtensilsCrossed },
    { id: "map", label: "Mapa", icon: Map },
    { id: "profile", label: "Perfil", icon: User },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon size={24} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default ConsumerLayout;
