# Guia do Sistema Food & Beverage (F&B)

## 📋 Visão Geral

O sistema Food & Beverage (F&B) foi integrado ao aplicativo Arena BRB para permitir que os consumidores façam pedidos de comida e bebida durante eventos, reduzindo filas e otimizando a experiência no estádio.

## ✨ Funcionalidades Principais

### 1. **Cardápio Digital Completo**
- Visualização de todos os produtos disponíveis nos restaurantes do estádio
- Fotos de alta qualidade de cada item
- Descrições detalhadas dos produtos
- Informações de preço, tempo de preparo e localização
- Sistema de categorias (Lanches, Bebidas, Porções, Sobremesas, Combos)

### 2. **Busca e Filtros Inteligentes**
- Busca por nome do produto ou restaurante
- Filtros por categoria
- Indicação de disponibilidade em tempo real
- Interface responsiva e intuitiva

### 3. **Carrinho de Compras**
- Adição/remoção de itens com controle de quantidade
- Visualização do total em tempo real
- Agrupamento automático de pedidos por restaurante
- Interface de overlay deslizante para fácil acesso

### 4. **Sistema de Pedidos**
- Confirmação instantânea de pedidos
- Geração de número de pedido único
- Agrupamento automático por restaurante
- Histórico de pedidos ativos

### 5. **Acompanhamento de Status**
- Status de "Preparando" quando o pedido é feito
- Status de "Pronto" quando pode ser retirado
- Status de "Concluído" após retirada
- Notificações visuais de quando o pedido está pronto
- Tempo estimado de preparo

### 6. **Informações de Retirada**
- Nome do restaurante claramente indicado
- Localização exata no estádio (setor e portão)
- Número do pedido para identificação
- Horário do pedido

## 🎯 Benefícios

### Para os Consumidores:
- ✅ **Redução de tempo em filas** - Faça o pedido de qualquer lugar do estádio
- ✅ **Não perca momentos importantes** - Peça antes e retire quando quiser
- ✅ **Visão completa do cardápio** - Compare preços e opções facilmente
- ✅ **Controle de gastos** - Veja o total antes de confirmar
- ✅ **Múltiplos pedidos** - Faça pedidos em diferentes restaurantes simultaneamente

### Para a Arena:
- ✅ **Redução de filas físicas** - Melhor fluxo de pessoas
- ✅ **Aumento de vendas** - Facilita o acesso aos produtos
- ✅ **Dados de consumo** - Análise de preferências e comportamento
- ✅ **Otimização operacional** - Preparo antecipado dos pedidos
- ✅ **Melhor experiência** - Clientes mais satisfeitos

## 📱 Como Usar

### Para Consumidores:

1. **Acessar o Cardápio**
   - Clique na aba "F&B" no menu inferior do aplicativo
   - Navegue pelos produtos disponíveis

2. **Buscar Produtos**
   - Use a barra de busca para encontrar itens específicos
   - Ou filtre por categoria (Lanches, Bebidas, etc.)

3. **Adicionar ao Carrinho**
   - Clique em "Adicionar" no produto desejado
   - O item aparecerá no carrinho com contador atualizado

4. **Revisar o Carrinho**
   - Clique no botão "Carrinho" no topo da tela
   - Ajuste quantidades ou remova itens
   - Visualize o total do pedido

5. **Finalizar Pedido**
   - Clique em "Finalizar Pedido"
   - Receba a confirmação com número do pedido
   - Anote a localização do restaurante

6. **Acompanhar Status**
   - Vá para aba "Meus Pedidos"
   - Veja o status atual de cada pedido
   - Aguarde notificação de "Pronto"

7. **Retirar o Pedido**
   - Vá até o restaurante indicado
   - Apresente o número do pedido no balcão
   - Retire seus itens

## 🏗️ Arquitetura Técnica

### Componentes Criados:

```
src/pages/consumer/ConsumerFood.tsx
```
- Componente principal da funcionalidade F&B
- Gerencia estado do carrinho, pedidos e filtros
- Interfaces para tipos de dados (FoodItem, CartItem, Order)

### Integração com Layout:

```
src/components/layouts/ConsumerLayout.tsx
```
- Adicionado ícone "UtensilsCrossed" (talheres cruzados)
- Nova aba "F&B" no menu de navegação
- Roteamento integrado

### Roteamento:

```
src/pages/Index.tsx
```
- Nova rota "food" adicionada ao AppScreen type
- Renderização condicional da página ConsumerFood
- Navegação integrada com outras páginas do consumidor

## 💾 Estrutura de Dados

### FoodItem
```typescript
{
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  restaurant: string;
  location: string;
  preparationTime: string;
  available: boolean;
}
```

### CartItem
```typescript
{
  ...FoodItem;
  quantity: number;
}
```

### Order
```typescript
{
  id: number;
  items: CartItem[];
  total: number;
  status: "preparing" | "ready" | "completed";
  orderNumber: string;
  restaurant: string;
  location: string;
  estimatedTime: string;
  orderTime: string;
}
```

## 🎨 Design e UX

### Cores e Temas:
- Uso consistente do gradiente accent-to-primary
- Badges coloridos por categoria
- Indicadores visuais de status (amarelo, verde, cinza)
- Efeitos hover-lift para interatividade

### Responsividade:
- Grid adaptativo (1/2/3 colunas conforme tamanho da tela)
- Menu de navegação fixo na parte inferior
- Overlay do carrinho otimizado para mobile
- Scroll suave e animações de transição

### Acessibilidade:
- Ícones com significado claro
- Textos descritivos
- Feedback visual em todas as ações
- Botões com tamanhos adequados para toque

## 🔄 Fluxo de Dados

1. **Carregamento Inicial**
   - Lista de produtos é exibida
   - Filtros disponíveis são renderizados
   - Carrinho inicia vazio

2. **Adição ao Carrinho**
   - Usuário clica em "Adicionar"
   - Item é adicionado/incrementado no carrinho
   - Toast de confirmação é exibido
   - Contador no botão carrinho é atualizado

3. **Finalização do Pedido**
   - Itens são agrupados por restaurante
   - Um pedido é criado para cada restaurante
   - Números de pedido únicos são gerados
   - Pedidos são adicionados à lista de acompanhamento
   - Carrinho é limpo
   - Usuário é redirecionado para "Meus Pedidos"

4. **Acompanhamento**
   - Status inicial: "Preparando"
   - Atualização para "Pronto" (pode ser automática ou manual)
   - Atualização para "Concluído" após retirada

## 🚀 Próximas Melhorias Sugeridas

### Integração com Backend:
- [ ] API REST para buscar produtos em tempo real
- [ ] WebSocket para atualização de status em tempo real
- [ ] Sincronização de disponibilidade de produtos
- [ ] Histórico completo de pedidos do usuário

### Pagamentos:
- [ ] Integração com gateway de pagamento
- [ ] Pagamento pelo app (cartão, PIX, carteira digital)
- [ ] Programa de pontos/cashback
- [ ] Cupons de desconto

### Notificações:
- [ ] Push notifications quando pedido estiver pronto
- [ ] SMS/WhatsApp com número do pedido
- [ ] Alertas de tempo estimado
- [ ] Avisos de promoções

### Features Avançadas:
- [ ] Recomendações personalizadas baseadas em histórico
- [ ] Avaliação de produtos e restaurantes
- [ ] Favoritos e pedidos salvos
- [ ] Modo "repetir último pedido"
- [ ] Agendamento de pedidos para horário específico
- [ ] QR Code para retirada rápida
- [ ] Mapa interativo dos restaurantes

### Analytics:
- [ ] Tracking de produtos mais vendidos
- [ ] Análise de horários de pico
- [ ] Tempo médio de preparo por restaurante
- [ ] Taxa de conversão (visualização → compra)
- [ ] Ticket médio por usuário

## 🔧 Manutenção

### Adicionar Novo Produto:
Edite o array `foodItems` em `ConsumerFood.tsx`:

```typescript
{
  id: 13,
  name: "Nome do Produto",
  description: "Descrição detalhada",
  price: 29.90,
  category: "Categoria",
  image: "URL da imagem",
  restaurant: "Nome do Restaurante",
  location: "Setor - Portão",
  preparationTime: "10-15 min",
  available: true,
}
```

### Adicionar Nova Categoria:
Edite o array `categories` em `ConsumerFood.tsx`:

```typescript
const categories = ["Todos", "Lanches", "Bebidas", "Nova Categoria"];
```

### Modificar Status de Pedido:
O status pode ser atualizado através de uma função futura:

```typescript
const updateOrderStatus = (orderId: number, newStatus: Order["status"]) => {
  setOrders(orders.map(order => 
    order.id === orderId ? { ...order, status: newStatus } : order
  ));
};
```

## 📞 Suporte

Para questões técnicas ou sugestões de melhorias no sistema F&B:
- Entre em contato com a equipe de desenvolvimento
- Abra uma issue no repositório do projeto
- Consulte a documentação adicional em `/docs`

## 📄 Licença

Este sistema é parte do projeto MVP Arena BRB e segue as mesmas diretrizes de licenciamento do projeto principal.

---

**Última atualização:** 2024
**Versão:** 1.0.0
**Status:** ✅ Implementado e funcional