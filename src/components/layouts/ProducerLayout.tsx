import { Calendar, Plus, User, Newspaper, CalendarDays } from "lucide-react";
import { ReactNode } from "react";

interface ProducerLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const ProducerLayout = ({ children, currentPage, onNavigate }: ProducerLayoutProps) => {
  const navItems = [
    { id: "dashboard", label: "Meus Eventos", icon: Calendar },
    { id: "calendar", label: "Calendário", icon: CalendarDays },
    { id: "news", label: "Notícias", icon: Newspaper },
    { id: "producer-profile", label: "Perfil", icon: User },
  ];

  return (
    <div className="flex flex-col h-screen producer-theme bg-producer-background text-producer-foreground">
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-producer-surface border-t border-border">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? "text-producer-gold" : "text-muted-foreground"
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

export default ProducerLayout;
