import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import logoProdutorArenaBRB from "@/assets/logo_produtor_ArenaBRB.svg";

interface ProducerCreateEventProps {
  onComplete: () => void;
  onBack: () => void;
}

const ProducerCreateEvent = ({ onComplete, onBack }: ProducerCreateEventProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    { number: 1, title: "Local", description: "Selecione o local do evento" },
    { number: 2, title: "Detalhes", description: "Informações do evento" },
    { number: 3, title: "Fornecedores", description: "Serviços necessários" },
    { number: 4, title: "Revisão", description: "Confira os dados" },
    { number: 5, title: "Confirmação", description: "Finalização" },
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen producer-theme bg-producer-background text-producer-foreground animate-fade-in">
      <header className="bg-producer-surface/80 backdrop-blur-lg border-b border-border p-4 sticky top-0 z-10 shadow-producer-card">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={handlePrevious} className="text-producer-foreground hover:text-producer-gold transition-smooth group">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-smooth" />
          </button>
          <img src={logoProdutorArenaBRB} alt="Arena BRB Produtor" className="h-12 hover-producer-glow transition-smooth" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-smooth ${
                    step > s.number
                      ? "gradient-producer-accent border-primary shadow-producer-glow"
                      : step === s.number
                      ? "border-primary text-producer-gold shadow-producer-glow"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {step > s.number ? (
                    <Check className="w-6 h-6 text-secondary-foreground" />
                  ) : (
                    <span className="font-bold text-lg">{s.number}</span>
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-smooth ${
                      step > s.number ? "gradient-producer-accent shadow-producer-glow" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 gradient-producer-accent bg-clip-text text-transparent">{steps[step - 1].title}</h2>
            <p className="text-muted-foreground text-lg">{steps[step - 1].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-producer-surface rounded-2xl border border-border p-8 shadow-producer-card hover:border-producer-gold/30 transition-smooth">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">Selecione o Local</h3>
              <div className="space-y-4">
                <button className="w-full p-6 border-2 border-primary gradient-producer-accent/10 rounded-2xl text-left shadow-producer-glow hover-producer-glow transition-smooth">
                  <div className="font-bold text-xl mb-2">Arena BRB Mané Garrincha</div>
                  <div className="text-sm text-muted-foreground">
                    Capacidade: 72.000 pessoas • SRPN, Brasília - DF
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Detalhes do Evento</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-name">Nome do Evento</Label>
                  <Input
                    id="event-name"
                    placeholder="Ex: Festival de Música 2025"
                    className="bg-producer-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-date">Data do Evento</Label>
                  <Input
                    id="event-date"
                    type="date"
                    className="bg-producer-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-capacity">Capacidade Esperada</Label>
                  <Input
                    id="event-capacity"
                    type="number"
                    placeholder="Ex: 10000"
                    className="bg-producer-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-description">Descrição</Label>
                  <Textarea
                    id="event-description"
                    placeholder="Descreva seu evento..."
                    className="bg-producer-background border-border min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Serviços e Fornecedores</h3>
              <div className="space-y-3">
                {[
                  { name: "Sistema de Som Profissional", selected: true },
                  { name: "Iluminação e Palco", selected: true },
                  { name: "Segurança e Controle de Acesso", selected: true },
                  { name: "Serviço de Limpeza", selected: false },
                  { name: "Catering e Alimentação", selected: false },
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      service.selected
                        ? "border-producer-gold bg-producer-gold/10"
                        : "border-border hover:border-producer-gold/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          service.selected
                            ? "bg-producer-gold border-producer-gold"
                            : "border-border"
                        }`}
                      >
                        {service.selected && (
                          <Check className="w-3 h-3 text-producer-gold-foreground" />
                        )}
                      </div>
                      <span className="font-medium">{service.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Revisão do Evento</h3>
              <div className="space-y-4">
                <div className="p-4 bg-producer-background rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Local</p>
                  <p className="font-semibold">Arena BRB Mané Garrincha</p>
                </div>
                <div className="p-4 bg-producer-background rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Nome do Evento</p>
                  <p className="font-semibold">Festival de Música 2025</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-producer-background rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Data</p>
                    <p className="font-semibold">15/06/2025</p>
                  </div>
                  <div className="p-4 bg-producer-background rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Capacidade</p>
                    <p className="font-semibold">10.000 pessoas</p>
                  </div>
                </div>
                <div className="p-4 bg-producer-background rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Serviços Selecionados</p>
                  <ul className="space-y-1">
                    <li className="text-sm">• Sistema de Som Profissional</li>
                    <li className="text-sm">• Iluminação e Palco</li>
                    <li className="text-sm">• Segurança e Controle de Acesso</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="text-center py-8 space-y-6">
              <div className="relative inline-block">
                <div className="w-24 h-24 gradient-producer-accent rounded-full flex items-center justify-center mx-auto shadow-producer-glow">
                  <Check className="w-12 h-12 text-secondary-foreground" />
                </div>
                <div className="absolute -inset-4 gradient-producer-accent blur-2xl opacity-30 animate-pulse" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-3 gradient-producer-accent bg-clip-text text-transparent">Solicitação Enviada!</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Recebemos sua solicitação de evento. Nossa equipe entrará em contato com você
                  dentro de 48 horas para finalizar os detalhes.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && step < 5 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex-1 hover:border-producer-gold hover:text-producer-gold transition-smooth"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            className={`flex-1 gradient-producer-accent hover:shadow-producer-glow transition-smooth font-bold ${
              step === 1 ? "w-full" : ""
            }`}
          >
            {step === totalSteps ? (
              "Concluir"
            ) : (
              <>
                Continuar
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProducerCreateEvent;
