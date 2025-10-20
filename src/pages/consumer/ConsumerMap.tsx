import logoConsumidorArenaBRB from "@/assets/logo_consumidor_ArenaBRB.svg";

const ConsumerMap = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border p-4 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={logoConsumidorArenaBRB} alt="Arena BRB" className="h-12" />
        </div>
      </header>

      <div className="flex-1 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.5755647982744!2d-47.90010912396436!3d-15.783610084826758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3b2d31e52f5b%3A0x1e4b5d2e8f3e7b8e!2sEst%C3%A1dio%20Nacional%20Man%C3%A9%20Garrincha!5e1!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr&t=k&z=17"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Arena BRB Mané Garrincha"
          className="absolute inset-0"
        />
      </div>

      <div className="bg-card border-t border-border p-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-bold text-foreground mb-2">Arena BRB Mané Garrincha</h3>
          <p className="text-sm text-muted-foreground">SRPN - Brasília, DF, 70297-400</p>
        </div>
      </div>
    </div>
  );
};

export default ConsumerMap;
