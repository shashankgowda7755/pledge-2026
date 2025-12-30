import React, { useState, useMemo } from 'react';
import { Step, Pledge, UserData } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ImpactSection from './components/ImpactSection';
import UserForm from './components/UserForm';
import CertificatePreview from './components/CertificatePreview';
import Success from './components/Success';
import Poster from './components/Poster';
import SiteFooter from './components/Footer';
import MissionSection from './components/MissionSection';

const App: React.FC = () => {
  const [inFlow, setInFlow] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(Step.Form);
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '',
    photo: ''
  });

  const heroSlides = useMemo(() => [
    {
      image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2000",
      title1: "Dream It.",
      title2: "Claim It.",
      subtitle: "The most powerful year of your life starts with a single, clear intention."
    },
    {
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000",
      title1: "Manifest.",
      title2: "Achieve.",
      subtitle: "Turn your deepest desires into reality by speaking them into existence."
    },
    {
      image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=2000",
      title1: "Inner Peace.",
      title2: "Mental Clarity.",
      subtitle: "Affirm your worth and find the balance your mind and soul deserve."
    },
    {
      image: "https://images.unsplash.com/photo-1499750310159-5bcf844a95e6?auto=format&fit=crop&q=80&w=2000",
      title1: "Write Your",
      title2: "Future.",
      subtitle: "Your words shape your world. Define your 2025 story today."
    },
    {
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=2000",
      title1: "Believe in",
      title2: "Yourself.",
      subtitle: "Join thousands of others committing to a year of growth and positivity."
    }
  ], []);

  const startFlow = () => {
    setInFlow(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(Step.Form);
  };

  const exitFlow = () => {
    setInFlow(false);
    setCurrentStep(Step.Form);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    if (currentStep === Step.Form) {
      exitFlow();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const customPledgeObject: Pledge = useMemo(() => ({
    id: 999,
    text: userData.customPledge || '',
    explanation: 'My 2025 Commitment'
  }), [userData.customPledge]);

  const renderPledgeStep = () => {
    switch (currentStep) {
      case Step.Form:
        return (
          <UserForm
            userData={userData}
            setUserData={setUserData}
            onBack={exitFlow}
            onContinue={() => {
              setCurrentStep(Step.Success);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case Step.Success: // Merged Preview and Success logic
        return <Success onReset={exitFlow} userData={userData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfb] selection:bg-emerald-100 selection:text-emerald-900">
      <Header onCtaClick={() => startFlow()} isPledging={inFlow} onExit={exitFlow} />

      {/* Hidden container for rendering the poster to canvas - ALWAYS RENDERED */}
      <div style={{ position: 'fixed', top: '-5000px', left: '-5000px' }}>
        {(userData.customPledge || userData.fullName) && (
          <div id="pledge-poster-capture">
            <Poster pledge={customPledgeObject} userData={userData} />
          </div>
        )}
      </div>

      {!inFlow ? (
        <div className="animate-fade-in">
          <Hero onStart={() => startFlow()} slides={heroSlides} />

          <div className="py-12 bg-white border-b border-stone-50">
            {/* Removed FeaturedPledges */}

          </div>

          <ImpactSection />

          <MissionSection />

          <div className="space-y-4 pb-20 bg-stone-50/30">
            {/* Removed CategoryHeroes */}
          </div>
          <SiteFooter />
        </div>
      ) : (
        <div className="pt-24 min-h-screen bg-[#fcfcfb] flex items-start justify-center">
          <div className="w-full animate-fade-in relative">
            <div className="min-h-[80vh] flex flex-col">
              {renderPledgeStep()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;