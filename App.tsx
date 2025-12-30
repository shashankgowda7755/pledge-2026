import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
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
  const [images, setImages] = useState<Record<string, string>>({});
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '',
    photo: ''
  });

  useEffect(() => {
    const generateAllImages = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompts = [
          { id: 'main', text: 'Minimalist golden sunrise over mountains, soft warm light, hopeful atmosphere, 8k, inspirational.' },
          { id: 'environment', text: 'Abstract visual representation of determination, glowing golden lines climbing upward, dark background, 8k.' },
          { id: 'health', text: 'Peaceful zen garden with soft morning mist, balance stones, golden light transparency, 8k.' },
          { id: 'lifestyle', text: 'Open notebook with a fountain pen on a wooden desk, warm sunlight, coffee cup, inviting creative space, 8k.' },
          { id: 'unity', text: 'Glowing constellations connecting in the night sky, golden threads of destiny, hopeful and vast, 8k.' }
        ];
        const generatedImages: Record<string, string> = {};
        await Promise.all(prompts.map(async (p) => {
          try {
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash-image',
              contents: { parts: [{ text: p.text }] },
              config: { imageConfig: { aspectRatio: "16:9" } }
            });
            for (const part of response.candidates?.[0]?.content?.parts || []) {
              if (part.inlineData) {
                generatedImages[p.id] = `data:image/png;base64,${part.inlineData.data}`;
              }
            }
          } catch (e) { console.error(e); }
        }));
        setImages(generatedImages);
      } catch (err) { console.error(err); }
    };
    generateAllImages();
  }, []);

  const heroSlides = useMemo(() => [
    {
      image: images.main || null,
      title1: "Dream It.",
      title2: "Claim It.",
      subtitle: "The most powerful year of your life starts with a single, clear intention."
    },
    {
      image: images.environment || null,
      title1: "Manifest.",
      title2: "Achieve.",
      subtitle: "Turn your deepest desires into reality by speaking them into existence."
    },
    {
      image: images.health || null,
      title1: "Inner Peace.",
      title2: "Mental Clarity.",
      subtitle: "Affirm your worth and find the balance your mind and soul deserve."
    },
    {
      image: images.lifestyle || null,
      title1: "Write Your",
      title2: "Future.",
      subtitle: "Your words shape your world. Define your 2025 story today."
    },
    {
      image: images.unity || null,
      title1: "Believe in",
      title2: "Yourself.",
      subtitle: "Join thousands of others committing to a year of growth and positivity."
    }
  ], [images]);

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