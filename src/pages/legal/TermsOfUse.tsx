import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="font-calvera text-4xl text-primary mb-8">Terms of Use</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">
              Last updated: March 2024
            </p>

            <section className="mb-8">
              <h2 className="font-calvera text-2xl text-primary mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using the Coupe des Créatifs platform, you agree to be bound
                by these Terms of Use and all applicable laws and regulations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-calvera text-2xl text-primary mb-4">Competition Rules</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Participants must be at least 18 years old</li>
                <li>All submissions must be original work</li>
                <li>Voting must follow the established guidelines</li>
                <li>Prizes will be awarded according to the competition rules</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-calvera text-2xl text-primary mb-4">User Conduct</h2>
              <p className="text-gray-600 mb-4">
                Users agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide accurate information</li>
                <li>Respect intellectual property rights</li>
                <li>Not engage in fraudulent voting</li>
                <li>Maintain professional conduct</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-calvera text-2xl text-primary mb-4">Intellectual Property</h2>
              <p className="text-gray-600">
                All content and materials available on Coupe des Créatifs, including but not
                limited to text, graphics, website name, code, images and logos are the
                intellectual property of Coupe des Créatifs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-calvera text-2xl text-primary mb-4">Contact</h2>
              <p className="text-gray-600">
                For any questions regarding these Terms of Use, please contact us at{' '}
                <a href="mailto:legal@coupedescréatifs.com" className="text-primary-light hover:underline">
                  legal@coupedescréatifs.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;