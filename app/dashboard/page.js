"use client";
import DashboardCard from "../components/dashboard-card/page";
import PageTitle from "../components/page-title/page";
import "uikit/dist/css/uikit.min.css";
import "./styles.css";

const Dashboard = () => {
  return (
    <div className="uk-container uk-margin-large-bottom">
      <PageTitle title="DASHBOARD" />
      <div className="uk-flex container-cards">
        <DashboardCard
          title="Interest Rates"
          icon="arrow-up-right"
          links={[
            { href: "/interest-rates", label: "Simulator", icon: "laptop" },
            { href: "/interest-rates-history", label: "History", icon: "list" },
          ]}
        />
        <DashboardCard
          title="Profit Split"
          icon="more"
          links={[
            { href: "/profit-split", label: "Simulator", icon: "laptop" },
            { href: "/profit-split-history", label: "History", icon: "list" },
          ]}
        />
        <DashboardCard
          title="Account Settings"
          icon="settings"
          isSecondary={true}
          links={[
            { href: "/profile", label: "Connection Info", icon: "user" },
            { href: "/edit-password", label: "Edit Password", icon: "lock" },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
