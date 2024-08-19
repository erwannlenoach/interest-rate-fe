"use client";
import Link from "next/link";
import "uikit/dist/css/uikit.min.css";
import './styles.css'

const DashboardCard = ({ title, icon, links, isSecondary }) => {
  return (
    <div className="uk-card-hover uk-border-rounded dashboard-card uk-text-center uk-margin-large-top container-dashboard-card">
      <div className={`uk-card-header ${isSecondary ? 'uk-background-secondary' : 'uk-background-primary'} uk-light uk-border-rounded-top dashboard-card-header`}>
        <h3 className="uk-card-title">
          <span uk-icon={`icon: ${icon}; ratio: 1.5`}></span> {title}
        </h3>
      </div>
      <div className="uk-card-body uk-text-center dashboard-card-body">
        {links.map((link, index) => (
          <div key={index} className="uk-margin-small">
            <Link href={link.href}>
              <button className="uk-button uk-button-default uk-width-1-1 uk-border-rounded">
                <span uk-icon={`icon: ${link.icon}; ratio: 1.2`}></span> {link.label}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
