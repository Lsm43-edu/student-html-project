import React, { useState } from 'react';
import { ChevronRight, ChevronDown, AlertTriangle, CheckCircle, Brain, Users, BookOpen, Shield } from 'lucide-react';

const AIEducationScenario = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [showAnalysis, setShowAnalysis] = useState(false);

  const scenario = {
    title: "EduTech University's AI Integration Dilemma",
    background: "You're part of EduTech University's student advisory committee. The administration wants to implement 'StudyBot AI' - an advanced AI system that will help with essay feedback, tutoring, research assistance, and academic planning. As student representatives, you need to evaluate this proposal and make recommendations.",
    character: "Student Advisory Committee Member"
  };

  const steps = [
    {
      id: 0,
      title: "The Proposal",
      content: "StudyBot AI would offer: automated essay grading with detailed feedback, 24/7 tutoring support, personalized study plans, research paper assistance, and plagiarism detection. The system would access student academic records to provide tailored recommendations.",
      question: "What's your initial reaction to this proposal?",
      choices: [
        { id: 'enthusiastic', text: 'Enthusiastic - This could revolutionize learning!', type: 'positive' },
        { id: 'cautious', text: 'Cautiously optimistic - Interesting but need more details', type: 'neutral' },
        { id: 'concerned', text: 'Concerned - Too many potential problems', type: 'negative' },
        { id: 'mixed', text: 'Mixed feelings - See both major benefits and risks', type: 'balanced' }
      ]
    },
    {
      id: 1,
      title: "Student Privacy Concerns",
      content: "A data privacy expert raises concerns: StudyBot would track study habits, analyze writing patterns, monitor research topics, and store all academic interactions. This data could be valuable for improving education but also raises privacy questions.",
      question: "How do you weigh privacy against personalized learning benefits?",
      choices: [
        { id: 'privacy_first', text: 'Privacy is paramount - minimal data collection only', type: 'negative' },
        { id: 'balanced_approach', text: 'Balanced approach with strong safeguards and opt-out options', type: 'balanced' },
        { id: 'benefits_outweigh', text: 'Educational benefits outweigh privacy concerns', type: 'positive' },
        { id: 'transparent_control', text: 'Full transparency and student control over their data', type: 'neutral' }
      ]
    },
    {
      id: 2,
      title: "Academic Integrity Challenges",
      content: "Faculty worry that students might become over-reliant on AI assistance, potentially undermining critical thinking skills. There are also concerns about distinguishing between AI-assisted work and student's original thinking.",
      question: "How should the university address academic integrity with AI tools?",
      choices: [
        { id: 'strict_limits', text: 'Strict limits - AI only for basic research and grammar checking', type: 'negative' },
        { id: 'clear_guidelines', text: 'Clear guidelines requiring disclosure of AI assistance', type: 'balanced' },
        { id: 'embrace_collaboration', text: 'Embrace AI as a collaborative learning tool', type: 'positive' },
        { id: 'subject_specific', text: 'Different rules for different subjects and assignments', type: 'neutral' }
      ]
    },
    {
      id: 3,
      title: "Equity and Access Issues",
      content: "While StudyBot could help level the playing field by providing premium tutoring to all students, concerns arise about students who struggle with technology or prefer human interaction. Some worry AI might inadvertently reinforce educational biases.",
      question: "How can the university ensure AI enhances rather than hinders educational equity?",
      choices: [
        { id: 'human_alternative', text: 'Always provide human alternatives to AI services', type: 'balanced' },
        { id: 'mandatory_training', text: 'Mandatory AI literacy training for all students', type: 'positive' },
        { id: 'gradual_implementation', text: 'Gradual, optional implementation with extensive support', type: 'neutral' },
        { id: 'focus_underserved', text: 'Priority access for underserved student populations', type: 'negative' }
      ]
    }
  ];

  const getPersonalizedBenefitsAndRisks = () => {
    const choices = selectedChoices;
    let benefits = [];
    let risks = [];

    // Base benefits and risks that appear for certain choice combinations
    const allBenefits = {
      personalized: { icon: Brain, title: "Personalized Learning", description: "AI adapts to individual learning styles and pace" },
      availability: { icon: BookOpen, title: "24/7 Availability", description: "Learning support available anytime, anywhere" },
      feedback: { icon: CheckCircle, title: "Immediate Feedback", description: "Instant responses help students learn from mistakes quickly" },
      scalable: { icon: Users, title: "Scalable Support", description: "Provides tutoring-level assistance to all students" },
      equity: { icon: Users, title: "Enhanced Equity", description: "Levels playing field by providing premium tutoring to all" },
      collaboration: { icon: Brain, title: "AI-Human Collaboration", description: "Students learn to work effectively with AI tools" },
      transparency: { icon: Shield, title: "Data Transparency", description: "Clear visibility into how student data improves learning" }
    };

    const allRisks = {
      privacy: { icon: Shield, title: "Privacy Concerns", description: "Extensive data collection raises privacy and security issues" },
      dependence: { icon: AlertTriangle, title: "Over-dependence", description: "Students may lose critical thinking and problem-solving skills" },
      bias: { icon: Brain, title: "Bias Amplification", description: "AI systems may perpetuate existing educational inequalities" },
      human_loss: { icon: Users, title: "Human Connection Loss", description: "Reduced interaction with teachers and peers" },
      inequality: { icon: AlertTriangle, title: "Digital Divide", description: "Students comfortable with AI gain unfair advantages" },
      academic_integrity: { icon: Shield, title: "Academic Dishonesty", description: "Difficulty distinguishing student work from AI assistance" },
      skill_erosion: { icon: Brain, title: "Skill Erosion", description: "Basic academic skills may deteriorate from AI reliance" }
    };

    // Determine benefits and risks based on choices
    if (choices[0] === 'enthusiastic' || choices[0] === 'mixed') {
      benefits.push(allBenefits.personalized, allBenefits.availability, allBenefits.feedback);
    }
    if (choices[0] === 'cautious' || choices[0] === 'mixed') {
      benefits.push(allBenefits.scalable);
      risks.push(allRisks.dependence);
    }

    // Privacy choices affect what appears
    if (choices[1] === 'privacy_first') {
      risks.push(allRisks.privacy, allRisks.inequality);
    } else if (choices[1] === 'benefits_outweigh') {
      benefits.push(allBenefits.personalized, allBenefits.equity);
      risks.push(allRisks.privacy);
    } else if (choices[1] === 'transparent_control') {
      benefits.push(allBenefits.transparency);
      risks.push(allRisks.privacy);
    } else if (choices[1] === 'balanced_approach') {
      benefits.push(allBenefits.personalized);
      risks.push(allRisks.privacy);
    }

    // Academic integrity choices
    if (choices[2] === 'strict_limits') {
      risks.push(allRisks.academic_integrity, allRisks.inequality);
    } else if (choices[2] === 'embrace_collaboration') {
      benefits.push(allBenefits.collaboration);
      risks.push(allRisks.academic_integrity, allRisks.skill_erosion);
    } else if (choices[2] === 'clear_guidelines') {
      benefits.push(allBenefits.collaboration);
      risks.push(allRisks.academic_integrity);
    }

    // Equity choices
    if (choices[3] === 'human_alternative') {
      benefits.push(allBenefits.equity);
      risks.push(allRisks.inequality);
    } else if (choices[3] === 'mandatory_training') {
      benefits.push(allBenefits.collaboration, allBenefits.equity);
    } else if (choices[3] === 'focus_underserved') {
      benefits.push(allBenefits.equity);
      risks.push(allRisks.inequality);
    }

    // Add some general risks if few were selected
    if (risks.length < 2) {
      if (!risks.find(r => r.title.includes('Privacy'))) risks.push(allRisks.privacy);
      if (!risks.find(r => r.title.includes('dependence'))) risks.push(allRisks.dependence);
    }

    // Add some general benefits if few were selected  
    if (benefits.length < 2) {
      if (!benefits.find(b => b.title.includes('Availability'))) benefits.push(allBenefits.availability);
      if (!benefits.find(b => b.title.includes('Feedback'))) benefits.push(allBenefits.feedback);
    }

    // Remove duplicates
    benefits = benefits.filter((benefit, index, self) => 
      index === self.findIndex(b => b.title === benefit.title)
    );
    risks = risks.filter((risk, index, self) => 
      index === self.findIndex(r => r.title === risk.title)
    );

    return { benefits, risks };
  };

  const handleChoice = (stepId, choiceId) => {
    setSelectedChoices({ ...selectedChoices, [stepId]: choiceId });
  };

  const toggleSection = (section) => {
    setExpandedSections({ ...expandedSections, [section]: !expandedSections[section] });
  };

  const getRecommendation = () => {
    const choices = Object.values(selectedChoices);
    const positiveCount = choices.filter(c => steps.find(s => s.choices.find(ch => ch.id === c))?.choices.find(ch => ch.id === c)?.type === 'positive').length;
    const negativeCount = choices.filter(c => steps.find(s => s.choices.find(ch => ch.id === c))?.choices.find(ch => ch.id === c)?.type === 'negative').length;
    const balancedCount = choices.filter(c => steps.find(s => s.choices.find(ch => ch.id === c))?.choices.find(ch => ch.id === c)?.type === 'balanced').length;

    if (balancedCount >= 2 || (positiveCount > 0 && negativeCount > 0)) {
      return {
        title: "Cautious Implementation with Strong Safeguards",
        description: "Your responses suggest a balanced approach that recognizes both the potential of AI in education and the need for careful implementation with robust protections.",
        recommendations: [
          "Pilot program with volunteer students",
          "Strong data privacy protections and student control",
          "Clear academic integrity guidelines",
          "Regular assessment of impact on learning outcomes",
          "Maintain human alternatives for all AI services"
        ]
      };
    } else if (positiveCount > negativeCount) {
      return {
        title: "Embrace AI with Comprehensive Support",
        description: "Your responses indicate confidence in AI's educational benefits while acknowledging the need for proper support systems.",
        recommendations: [
          "Full implementation with extensive student training",
          "Transparent data practices with opt-out options",
          "Integration of AI literacy into curriculum",
          "Continuous monitoring for bias and effectiveness",
          "Faculty development for AI-enhanced teaching"
        ]
      };
    } else {
      return {
        title: "Conservative Approach with Limited AI Integration",
        description: "Your responses suggest prioritizing traditional educational methods while cautiously exploring AI's potential.",
        recommendations: [
          "Limited AI implementation for basic tasks only",
          "Strict data minimization policies",
          "Enhanced human tutoring and support services",
          "Regular evaluation of AI impact on student skills",
          "Strong emphasis on digital literacy and critical thinking"
        ]
      };
    }
  };

  const currentStepData = steps[currentStep];
  const isComplete = Object.keys(selectedChoices).length === steps.length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{scenario.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{scenario.background}</p>
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full mt-4">
            Role: {scenario.character}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{currentStep + 1} of {steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Step */}
        {!showAnalysis && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{currentStepData.title}</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 leading-relaxed">{currentStepData.content}</p>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mb-4">{currentStepData.question}</h3>
            
            <div className="space-y-3">
              {currentStepData.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(currentStep, choice.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedChoices[currentStep] === choice.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  {choice.text}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (currentStep < steps.length - 1) {
                    setCurrentStep(currentStep + 1);
                  } else if (isComplete) {
                    setShowAnalysis(true);
                  }
                }}
                disabled={!selectedChoices[currentStep]}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                {currentStep === steps.length - 1 ? 'Get Analysis' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {/* Analysis Section */}
        {showAnalysis && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Your Analysis & Recommendations</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{getRecommendation().title}</h3>
              <p className="text-gray-700 mb-4">{getRecommendation().description}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Key Recommendations:</h4>
                <ul className="space-y-1">
                  {getRecommendation().recommendations.map((rec, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits & Risks Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <button
                  onClick={() => toggleSection('benefits')}
                  className="w-full flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-green-800">Benefits Based on Your Choices</h3>
                  {expandedSections.benefits ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>
                {expandedSections.benefits && (
                  <div className="mt-4 space-y-4">
                    {getPersonalizedBenefitsAndRisks().benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start p-4 bg-white border border-gray-200 rounded-lg">
                        <benefit.icon className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-800">{benefit.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleSection('risks')}
                  className="w-full flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-red-800">Risks Based on Your Choices</h3>
                  {expandedSections.risks ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>
                {expandedSections.risks && (
                  <div className="mt-4 space-y-4">
                    {getPersonalizedBenefitsAndRisks().risks.map((risk, index) => (
                      <div key={index} className="flex items-start p-4 bg-white border border-gray-200 rounded-lg">
                        <risk.icon className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-800">{risk.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{risk.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setSelectedChoices({});
                  setShowAnalysis(false);
                  setExpandedSections({});
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start New Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIEducationScenario;