import { useState } from "react";
import ConsumerLayout from "@/components/layouts/ConsumerLayout";
import ProducerLayout from "@/components/layouts/ProducerLayout";
import ConsumerLogin from "./consumer/ConsumerLogin";
import PreferencesQuestionnaire from "./consumer/PreferencesQuestionnaire";
import ConsumerHome from "./consumer/ConsumerHome";
import ConsumerEventDetails from "./consumer/ConsumerEventDetails";
import ConsumerTickets from "./consumer/ConsumerTickets";
import ConsumerFood from "./consumer/ConsumerFood";
import ConsumerMap from "./consumer/ConsumerMap";
import ConsumerProfile from "./consumer/ConsumerProfile";
import ConsumerUserData from "./consumer/ConsumerUserData";
import ProducerLogin from "./producer/ProducerLogin";
import ProducerDashboard from "./producer/ProducerDashboard";
import ProducerCreateEvent from "./producer/ProducerCreateEvent";
import ProducerCalendar from "./producer/ProducerCalendar";
import ProducerNews from "./producer/ProducerNews";
import ProducerProfile from "./producer/ProducerProfile";

type AppScreen =
  | "consumer-login"
  | "preferences"
  | "home"
  | "event-details"
  | "tickets"
  | "food"
  | "map"
  | "profile"
  | "user-data"
  | "producer-login"
  | "dashboard"
  | "create-event"
  | "calendar"
  | "news"
  | "producer-profile";

const Index = () => {
  const [currentScreen, setCurrentScreen] =
    useState<AppScreen>("consumer-login");
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      // Consumer Auth Flow
      case "consumer-login":
        return (
          <ConsumerLogin
            onLogin={() => setCurrentScreen("preferences")}
            onSwitchToProducer={() => setCurrentScreen("producer-login")}
          />
        );
      case "preferences":
        return (
          <PreferencesQuestionnaire
            onComplete={() => setCurrentScreen("home")}
          />
        );

      // Consumer Main App
      case "home":
        return (
          <ConsumerLayout
            currentPage="home"
            onNavigate={(page) => setCurrentScreen(page as AppScreen)}
          >
            <ConsumerHome
              onViewEventDetails={(eventId) => {
                setSelectedEventId(eventId);
                setCurrentScreen("event-details");
              }}
            />
          </ConsumerLayout>
        );
      case "event-details":
        return (
          <ConsumerEventDetails
            eventId={selectedEventId}
            onBack={() => setCurrentScreen("home")}
          />
        );
      case "tickets":
        return (
          <ConsumerLayout
            currentPage="tickets"
            onNavigate={(page) => setCurrentScreen(page as AppScreen)}
          >
            <ConsumerTickets />
          </ConsumerLayout>
        );
      case "food":
        return (
          <ConsumerLayout
            currentPage="food"
            onNavigate={(page) => setCurrentScreen(page as AppScreen)}
          >
            <ConsumerFood />
          </ConsumerLayout>
        );
      case "map":
        return (
          <ConsumerLayout
            currentPage="map"
            onNavigate={(page) => setCurrentScreen(page as AppScreen)}
          >
            <ConsumerMap />
          </ConsumerLayout>
        );
      case "profile":
        return (
          <ConsumerLayout
            currentPage="profile"
            onNavigate={(page) => setCurrentScreen(page as AppScreen)}
          >
            <ConsumerProfile
              onNavigateToUserData={() => setCurrentScreen("user-data")}
              onSwitchToProducer={() => setCurrentScreen("producer-login")}
              onLogout={() => setCurrentScreen("consumer-login")}
            />
          </ConsumerLayout>
        );
      case "user-data":
        return <ConsumerUserData onBack={() => setCurrentScreen("profile")} />;

      // Producer Auth Flow
      case "producer-login":
        return (
          <ProducerLogin
            onLogin={() => setCurrentScreen("dashboard")}
            onBackToConsumer={() => setCurrentScreen("consumer-login")}
          />
        );

      // Producer Main App
      case "dashboard":
        return (
          <ProducerLayout
            currentPage="dashboard"
            onNavigate={(page) => setCurrentScreen(page as AppScreen)}
          >
            <ProducerDashboard
              onNavigate={(page) => setCurrentScreen(page as AppScreen)}
            />
          </ProducerLayout>
        );
      case "create-event":
        return (
          <ProducerCreateEvent
            onComplete={() => setCurrentScreen("dashboard")}
            onBack={() => setCurrentScreen("dashboard")}
          />
        );
      case "calendar":
        return (
          <ProducerLayout
            currentPage="calendar"
            onNavigate={(page) => setCurrentScreen(page as AppScreen)}
          >
            <ProducerCalendar
              onNavigate={(page) => setCurrentScreen(page as AppScreen)}
            />
          </ProducerLayout>
        );
      case "news":
        return (
          <ProducerLayout
            currentPage="news"
            onNavigate={(page) => setCurrentScreen(page as AppScreen)}
          >
            <ProducerNews />
          </ProducerLayout>
        );
      case "producer-profile":
        return (
          <ProducerLayout
            currentPage="producer-profile"
            onNavigate={(page) => setCurrentScreen(page as AppScreen)}
          >
            <ProducerProfile
              onSwitchToConsumer={() => setCurrentScreen("profile")}
              onLogout={() => setCurrentScreen("producer-login")}
            />
          </ProducerLayout>
        );

      default:
        return (
          <ConsumerLogin
            onLogin={() => setCurrentScreen("preferences")}
            onSwitchToProducer={() => setCurrentScreen("producer-login")}
          />
        );
    }
  };

  return <>{renderScreen()}</>;
};

export default Index;
