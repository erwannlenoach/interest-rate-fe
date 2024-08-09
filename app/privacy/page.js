import React from "react";

export default function Privacy() {
  return (
    <div className="uk-container uk-margin-large-top uk-margin-large-bottom">
      <h2>Privacy Policy</h2>
      <p>
        This project does not use personal data for commercial purposes. All user data, including passwords, are
        fully encrypted and stored securely. Our practices are in full
        compliance with GDPR requirements, ensuring that your information is
        protected at all times.
      </p>
      <p>
        The data collected is used strictly for enhancing the functionality of
        the AI models and improving the user experience. We do not share your
        data with any third parties, and it is never used for advertising or
        commercial exploitation.
      </p>
      <p>
        We do not use cookies for tracking or storing user data. Instead, we utilize session storage to manage user sessions. This means that your data is only stored temporarily during your session and is automatically deleted when your session ends.
      </p>
      <p>
        Our database is hosted in Europe, specifically on a PostgreSQL server that complies with European data protection regulations. This ensures that your data is stored securely within the European Union, adhering to the strictest privacy standards.
      </p>
      <p>
        Each user session undergoes a full security check to ensure that your information is protected from unauthorized access. Additionally, our AI models do not currently use any personal information, ensuring that your privacy is safeguarded during all interactions with the system.
      </p>
      <p>
        We only collect your email address for the purpose of user authentication and communication related to this project. Your email address will never be sold or used for any commercial purposes. Rest assured, your email is protected and will not be shared with third parties.
      </p>
    </div>
  );
}
