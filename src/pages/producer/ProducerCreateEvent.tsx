import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Users,
  Maximize,
  Star,
  Mail,
  Phone,
  Shield,
  Lightbulb,
  UtensilsCrossed,
  Music,
} from "lucide-react";
import { useState } from "react";
import logoProdutorArenaBRB from "@/assets/logo_produtor_ArenaBRB.svg";

interface ProducerCreateEventProps {
  onComplete: () => void;
  onBack: () => void;
}

interface VenueSpace {
  name: string;
  capacity: string;
  area: string;
}

interface Venue {
  id: string;
  name: string;
  description: string;
  spaces: VenueSpace[];
}

interface Supplier {
  id: string;
  name: string;
  rating: number;
  email: string;
  phone: string;
}

interface SupplierCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  suppliers: Supplier[];
}

const ProducerCreateEvent = ({
  onComplete,
  onBack,
}: ProducerCreateEventProps) => {
  const [step, setStep] = useState(1);
  const [expandedVenue, setExpandedVenue] = useState<string | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<{
    venueId: string;
    spaceName: string;
  } | null>(null);
  const [expandedSupplierCategory, setExpandedSupplierCategory] = useState<
    string | null
  >(null);
  const [selectedSuppliers, setSelectedSuppliers] = useState<{
    [categoryId: string]: string | null;
  }>({});
  const totalSteps = 5;

  const venues: Venue[] = [
    {
      id: "mane-garrincha",
      name: "Arena BRB Mané Garrincha",
      description: "SRPN, Brasília - DF",
      spaces: [
        { name: "Auditório", capacity: "Até 300 pessoas", area: "500 m²" },
        { name: "Tribuna de Honra", capacity: "Até 500 pessoas", area: "" },
        {
          name: "Varandas – Norte",
          capacity: "Até 1.000 pessoas",
          area: "1.247 m²",
        },
        {
          name: "Varandas – Sul",
          capacity: "Até 1.000 pessoas",
          area: "1.247 m²",
        },
        { name: "Zona Mista", capacity: "Até 1.000 pessoas", area: "" },
        {
          name: "Areninha – Área Sul",
          capacity: "Até 3.000 pessoas",
          area: "6.034 m²",
        },
        {
          name: "Areninha – Área Norte",
          capacity: "Até 3.500 pessoas",
          area: "6.084 m²",
        },
        { name: "Basement", capacity: "Até 5.000 pessoas", area: "11.192 m²" },
        {
          name: "Arena Lounge",
          capacity: "Até 12.000 pessoas",
          area: "16.726 m²",
        },
        { name: "Campo", capacity: "Até 18.000 pessoas", area: "~8.000 m²" },
        {
          name: "Arena Térrea",
          capacity: "Até 72.851 pessoas",
          area: "m² n/d",
        },
        { name: "Arena Completa", capacity: "Até 90.853 pessoas", area: "" },
      ],
    },
    {
      id: "nilson-nelson",
      name: "Arena BRB Nilson Nelson (Ginásio)",
      description: "Configuração de shows/esportes/palestras",
      spaces: [
        {
          name: "Configuração de shows/esportes/palestras",
          capacity: "Até 11.000 pessoas",
          area: "Quadra/Pista: 2.400 m²",
        },
      ],
    },
    {
      id: "area-externa",
      name: "Área Externa",
      description: "Estacionamentos e áreas abertas",
      spaces: [
        { name: "Estacionamentos", capacity: "Até 100.000 pessoas", area: "" },
      ],
    },
  ];

  const supplierCategories: SupplierCategory[] = [
    {
      id: "seguranca",
      name: "Segurança",
      icon: Shield,
      suppliers: [
        {
          id: "dragon-seguranca",
          name: "Dragon Segurança",
          rating: 4.5,
          email: "contato@dragonseguranca.com.br",
          phone: "(61) 3456-7890",
        },
        {
          id: "elite-security",
          name: "Elite Security",
          rating: 4.8,
          email: "atendimento@elitesecurity.com.br",
          phone: "(61) 3321-4567",
        },
        {
          id: "protege-eventos",
          name: "Protege Eventos",
          rating: 4.3,
          email: "comercial@protegeeventos.com.br",
          phone: "(61) 3298-1234",
        },
        {
          id: "guardian-seguranca",
          name: "Guardian Segurança",
          rating: 4.7,
          email: "info@guardianseg.com.br",
          phone: "(61) 3567-8901",
        },
      ],
    },
    {
      id: "iluminacao",
      name: "Iluminação",
      icon: Lightbulb,
      suppliers: [
        {
          id: "luz-total",
          name: "Luz Total Produções",
          rating: 4.6,
          email: "eventos@luztotal.com.br",
          phone: "(61) 3445-6789",
        },
        {
          id: "showlight",
          name: "ShowLight Brasil",
          rating: 4.9,
          email: "contato@showlight.com.br",
          phone: "(61) 3289-3456",
        },
        {
          id: "ilumina-tech",
          name: "Ilumina Tech",
          rating: 4.4,
          email: "vendas@iluminatech.com.br",
          phone: "(61) 3334-5678",
        },
        {
          id: "pro-lighting",
          name: "Pro Lighting Events",
          rating: 4.7,
          email: "comercial@prolighting.com.br",
          phone: "(61) 3556-7890",
        },
      ],
    },
    {
      id: "alimentos",
      name: "Alimentos",
      icon: UtensilsCrossed,
      suppliers: [
        {
          id: "sabor-eventos",
          name: "Sabor & Eventos Catering",
          rating: 4.8,
          email: "contato@saboreventos.com.br",
          phone: "(61) 3223-4567",
        },
        {
          id: "gourmet-express",
          name: "Gourmet Express",
          rating: 4.5,
          email: "pedidos@gourmetexpress.com.br",
          phone: "(61) 3378-9012",
        },
        {
          id: "delicia-catering",
          name: "Delícia Catering",
          rating: 4.6,
          email: "atendimento@deliciacatering.com.br",
          phone: "(61) 3445-1234",
        },
        {
          id: "festim-alimentos",
          name: "Festim Alimentos",
          rating: 4.4,
          email: "comercial@festim.com.br",
          phone: "(61) 3267-8901",
        },
      ],
    },
    {
      id: "som",
      name: "Sistema de Som",
      icon: Music,
      suppliers: [
        {
          id: "sonic-pro",
          name: "Sonic Pro Audio",
          rating: 4.9,
          email: "atendimento@sonicpro.com.br",
          phone: "(61) 3334-5678",
        },
        {
          id: "audio-master",
          name: "Audio Master Solutions",
          rating: 4.7,
          email: "contato@audiomaster.com.br",
          phone: "(61) 3445-7890",
        },
        {
          id: "sound-events",
          name: "Sound Events Brasil",
          rating: 4.5,
          email: "comercial@soundevents.com.br",
          phone: "(61) 3289-1234",
        },
        {
          id: "max-audio",
          name: "Max Audio Produções",
          rating: 4.6,
          email: "vendas@maxaudio.com.br",
          phone: "(61) 3556-3456",
        },
      ],
    },
  ];

  const steps = [
    { number: 1, title: "Detalhes", description: "Informações do evento" },
    { number: 2, title: "Local", description: "Selecione o local do evento" },
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

  const toggleVenue = (venueId: string) => {
    setExpandedVenue(expandedVenue === venueId ? null : venueId);
  };

  const selectSpace = (venueId: string, spaceName: string) => {
    setSelectedSpace({ venueId, spaceName });
  };

  const toggleSupplierCategory = (categoryId: string) => {
    setExpandedSupplierCategory(
      expandedSupplierCategory === categoryId ? null : categoryId,
    );
  };

  const selectSupplier = (categoryId: string, supplierId: string | null) => {
    setSelectedSuppliers((prev) => ({
      ...prev,
      [categoryId]: supplierId,
    }));
  };

  return (
    <div className="min-h-screen producer-theme bg-producer-background text-producer-foreground animate-fade-in">
      <header className="bg-producer-surface/80 backdrop-blur-lg border-b border-border p-4 sticky top-0 z-10 shadow-producer-card">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={handlePrevious}
            className="text-producer-foreground hover:text-producer-gold transition-smooth group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-smooth" />
          </button>
          <img
            src={logoProdutorArenaBRB}
            alt="Arena BRB Produtor"
            className="h-12 hover-producer-glow transition-smooth"
          />
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
                      step > s.number
                        ? "gradient-producer-accent shadow-producer-glow"
                        : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 gradient-producer-accent bg-clip-text text-transparent">
              {steps[step - 1].title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {steps[step - 1].description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-producer-surface rounded-2xl border border-border p-8 shadow-producer-card hover:border-producer-gold/30 transition-smooth">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">Detalhes do Evento</h3>
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

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">Selecione o Local</h3>
              <div className="space-y-4">
                {venues.map((venue) => (
                  <div
                    key={venue.id}
                    className="border-2 border-border rounded-2xl overflow-hidden transition-all hover:border-producer-gold/30"
                  >
                    <button
                      onClick={() => toggleVenue(venue.id)}
                      className="w-full p-6 text-left bg-producer-background hover:bg-producer-surface/50 transition-smooth"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <MapPin className="w-5 h-5 text-producer-gold" />
                            <div className="font-bold text-xl">
                              {venue.name}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {venue.description}
                          </div>
                        </div>
                        <div className="ml-4">
                          {expandedVenue === venue.id ? (
                            <ChevronUp className="w-6 h-6 text-producer-gold" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </button>

                    {expandedVenue === venue.id && (
                      <div className="border-t border-border bg-producer-surface/30 p-4 space-y-2 animate-fade-in">
                        {venue.spaces.map((space, idx) => (
                          <button
                            key={idx}
                            onClick={() => selectSpace(venue.id, space.name)}
                            className={`w-full p-4 rounded-xl text-left transition-all ${
                              selectedSpace?.venueId === venue.id &&
                              selectedSpace?.spaceName === space.name
                                ? "bg-producer-gold/20 border-2 border-producer-gold shadow-producer-glow"
                                : "bg-producer-background border-2 border-border hover:border-producer-gold/50 hover:bg-producer-surface/50"
                            }`}
                          >
                            <div className="font-semibold text-lg mb-2 flex items-center gap-2">
                              {selectedSpace?.venueId === venue.id &&
                                selectedSpace?.spaceName === space.name && (
                                  <Check className="w-5 h-5 text-producer-gold" />
                                )}
                              {space.name}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{space.capacity}</span>
                              </div>
                              {space.area && (
                                <div className="flex items-center gap-1">
                                  <Maximize className="w-4 h-4" />
                                  <span>{space.area}</span>
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {selectedSpace && (
                <div className="mt-6 p-4 bg-producer-gold/10 border-2 border-producer-gold rounded-xl">
                  <p className="text-sm font-semibold text-producer-gold">
                    ✓ Local selecionado:{" "}
                    {venues.find((v) => v.id === selectedSpace.venueId)?.name} -{" "}
                    {selectedSpace.spaceName}
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">
                Serviços e Fornecedores
              </h3>
              <p className="text-muted-foreground mb-6">
                Selecione fornecedores recomendados ou escolha usar seus
                próprios
              </p>
              <div className="space-y-4">
                {supplierCategories.map((category) => (
                  <div
                    key={category.id}
                    className="border-2 border-border rounded-2xl overflow-hidden transition-all hover:border-producer-gold/30"
                  >
                    <button
                      onClick={() => toggleSupplierCategory(category.id)}
                      className="w-full p-5 text-left bg-producer-background hover:bg-producer-surface/50 transition-smooth"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <category.icon className="w-6 h-6 text-producer-gold" />
                          <span className="font-bold text-lg">
                            {category.name}
                          </span>
                          {selectedSuppliers[category.id] && (
                            <span className="ml-2 px-2 py-1 bg-producer-gold/20 text-producer-gold text-xs rounded-full">
                              {selectedSuppliers[category.id] === "own"
                                ? "Próprio"
                                : "Selecionado"}
                            </span>
                          )}
                        </div>
                        <div>
                          {expandedSupplierCategory === category.id ? (
                            <ChevronUp className="w-6 h-6 text-producer-gold" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </button>

                    {expandedSupplierCategory === category.id && (
                      <div className="border-t border-border bg-producer-surface/30 p-4 space-y-2 animate-fade-in">
                        {/* Opção "Usar Próprio" */}
                        <button
                          onClick={() => selectSupplier(category.id, "own")}
                          className={`w-full p-4 rounded-xl text-left transition-all ${
                            selectedSuppliers[category.id] === "own"
                              ? "bg-producer-gold/20 border-2 border-producer-gold shadow-producer-glow"
                              : "bg-producer-background border-2 border-border hover:border-producer-gold/50 hover:bg-producer-surface/50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {selectedSuppliers[category.id] === "own" && (
                              <Check className="w-5 h-5 text-producer-gold" />
                            )}
                            <span className="font-semibold text-lg">
                              Usar meu próprio fornecedor
                            </span>
                          </div>
                        </button>

                        {/* Fornecedores Recomendados */}
                        {category.suppliers.map((supplier) => (
                          <button
                            key={supplier.id}
                            onClick={() =>
                              selectSupplier(category.id, supplier.id)
                            }
                            className={`w-full p-4 rounded-xl text-left transition-all ${
                              selectedSuppliers[category.id] === supplier.id
                                ? "bg-producer-gold/20 border-2 border-producer-gold shadow-producer-glow"
                                : "bg-producer-background border-2 border-border hover:border-producer-gold/50 hover:bg-producer-surface/50"
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {selectedSuppliers[category.id] ===
                                    supplier.id && (
                                    <Check className="w-5 h-5 text-producer-gold" />
                                  )}
                                  <span className="font-semibold text-lg">
                                    {supplier.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-producer-gold">
                                  <Star className="w-4 h-4 fill-current" />
                                  <span className="font-semibold">
                                    {supplier.rating}/5
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  <span>{supplier.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  <span>{supplier.phone}</span>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">Revisão do Evento</h3>
              <div className="space-y-4">
                <div className="p-4 bg-producer-background rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    Nome do Evento
                  </p>
                  <p className="font-semibold">Festival de Música 2025</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-producer-background rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Data</p>
                    <p className="font-semibold">15/06/2025</p>
                  </div>
                  <div className="p-4 bg-producer-background rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      Capacidade
                    </p>
                    <p className="font-semibold">10.000 pessoas</p>
                  </div>
                </div>
                <div className="p-4 bg-producer-background rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Local</p>
                  <p className="font-semibold">
                    {selectedSpace
                      ? `${venues.find((v) => v.id === selectedSpace.venueId)?.name} - ${selectedSpace.spaceName}`
                      : "Arena BRB Mané Garrincha"}
                  </p>
                </div>
                <div className="p-4 bg-producer-background rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Fornecedores Selecionados
                  </p>
                  <ul className="space-y-2">
                    {Object.entries(selectedSuppliers).map(
                      ([categoryId, supplierId]) => {
                        const category = supplierCategories.find(
                          (c) => c.id === categoryId,
                        );
                        if (!category || !supplierId) return null;

                        if (supplierId === "own") {
                          return (
                            <li key={categoryId} className="text-sm">
                              • {category.name}:{" "}
                              <span className="font-semibold">
                                Próprio fornecedor
                              </span>
                            </li>
                          );
                        }

                        const supplier = category.suppliers.find(
                          (s) => s.id === supplierId,
                        );
                        return (
                          <li key={categoryId} className="text-sm">
                            • {category.name}:{" "}
                            <span className="font-semibold">
                              {supplier?.name}
                            </span>
                          </li>
                        );
                      },
                    )}
                    {Object.keys(selectedSuppliers).length === 0 && (
                      <li className="text-sm text-muted-foreground">
                        Nenhum fornecedor selecionado
                      </li>
                    )}
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
                <h3 className="text-3xl font-bold mb-3 gradient-producer-accent bg-clip-text text-transparent">
                  Solicitação Enviada!
                </h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Recebemos sua solicitação de evento. Nossa equipe entrará em
                  contato com você dentro de 48 horas para finalizar os
                  detalhes.
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
