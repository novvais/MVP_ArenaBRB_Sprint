import { Newspaper, Calendar, MapPin, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoProdutorArenaBRB from "@/assets/logo_produtor_ArenaBRB.svg";

const ProducerNews = () => {
  const news = [
    {
      id: 1,
      title: "Novo Sistema de Gestão de Eventos Disponível",
      summary: "Conheça as novas funcionalidades que facilitam o gerenciamento dos seus eventos no Arena BRB.",
      date: "15 de Janeiro, 2025",
      category: "Sistema",
      readTime: "3 min",
      image: "/placeholder.svg",
      featured: true,
    },
    {
      id: 2,
      title: "Guia Completo: Como Criar Eventos de Sucesso",
      summary: "Dicas e estratégias para maximizar o alcance e engajamento dos seus eventos.",
      date: "12 de Janeiro, 2025",
      category: "Dicas",
      readTime: "5 min",
      image: "/placeholder.svg",
      featured: false,
    },
    {
      id: 3,
      title: "Atualizações de Segurança na Plataforma",
      summary: "Saiba mais sobre as melhorias implementadas para proteger seus dados e eventos.",
      date: "10 de Janeiro, 2025",
      category: "Segurança",
      readTime: "2 min",
      image: "/placeholder.svg",
      featured: false,
    },
    {
      id: 4,
      title: "Relatório Mensal: Estatísticas de Eventos",
      summary: "Confira os números de dezembro e as tendências para o próximo mês.",
      date: "8 de Janeiro, 2025",
      category: "Relatórios",
      readTime: "4 min",
      image: "/placeholder.svg",
      featured: false,
    },
  ];

  const featuredNews = news.find(item => item.featured);
  const regularNews = news.filter(item => !item.featured);

  return (
    <div className="min-h-screen producer-theme bg-producer-background text-producer-foreground animate-fade-in">
      <header className="bg-producer-surface/80 backdrop-blur-lg border-b border-border p-4 sticky top-0 z-10 shadow-producer-card">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={logoProdutorArenaBRB} alt="Arena BRB" className="h-12 hover-producer-glow transition-smooth" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Destaque */}
        {featuredNews && (
          <div className="relative overflow-hidden rounded-3xl border border-border bg-producer-surface hover-producer-glow transition-smooth group">
            <div className="absolute inset-0 gradient-producer-accent opacity-5" />
            <div className="relative p-8">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-producer-gold/20 text-producer-gold rounded-full text-sm font-semibold">
                      {featuredNews.category}
                    </span>
                    <span className="px-3 py-1 bg-producer-gold/20 text-producer-gold rounded-full text-sm font-semibold">
                      Destaque
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-producer-gold transition-smooth">
                    {featuredNews.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {featuredNews.summary}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-producer-gold" />
                      <span>{featuredNews.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-producer-gold" />
                      <span>{featuredNews.readTime} de leitura</span>
                    </div>
                  </div>
                  <Button className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold">
                    Ler Mais
                  </Button>
                </div>
                <div className="w-64 h-48 bg-producer-background rounded-2xl border border-border flex items-center justify-center overflow-hidden">
                  <img 
                    src={featuredNews.image} 
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid de Notícias */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold gradient-producer-accent bg-clip-text text-transparent">
              Últimas Notícias
            </h3>
            <Button variant="outline" className="hover:border-producer-gold hover:text-producer-gold transition-smooth">
              Ver Todas
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((newsItem) => (
              <article
                key={newsItem.id}
                className="bg-producer-surface rounded-2xl border border-border p-6 hover:border-producer-gold hover-producer-glow transition-smooth group cursor-pointer"
              >
                <div className="w-full h-48 bg-producer-background rounded-xl border border-border mb-4 overflow-hidden">
                  <img 
                    src={newsItem.image} 
                    alt={newsItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-producer-gold/20 text-producer-gold rounded-full text-sm font-semibold">
                    {newsItem.category}
                  </span>
                  <span className="text-sm text-muted-foreground">{newsItem.readTime}</span>
                </div>
                
                <h4 className="text-xl font-bold mb-3 group-hover:text-producer-gold transition-smooth line-clamp-2">
                  {newsItem.title}
                </h4>
                
                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {newsItem.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-producer-gold" />
                    <span>{newsItem.date}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="hover:text-producer-gold transition-smooth">
                    Ler
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-producer-surface rounded-3xl border border-border p-8 text-center">
          <div className="relative inline-block mb-6">
            <Newspaper className="w-16 h-16 text-producer-gold mx-auto" />
            <div className="absolute -inset-4 gradient-producer-accent blur-xl opacity-20 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Mantenha-se Atualizado</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Receba as últimas notícias e atualizações diretamente no seu e-mail.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 px-4 py-3 bg-producer-background border border-border rounded-xl focus:outline-none focus:border-primary transition-smooth"
            />
            <Button className="gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold px-6">
              Inscrever
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProducerNews;

