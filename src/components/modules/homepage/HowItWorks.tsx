'use client';

import { CheckCircle, Calendar, Video } from 'lucide-react';

const steps = [
  {
    title: 'Browse Tutors',
    description:
      'Search and find the perfect tutor for your subject and level.',
    icon: Calendar,
  },
  {
    title: 'Book a Session',
    description:
      'Pick a time that suits you and schedule your session instantly.',
    icon: Video,
  },
  {
    title: 'Learn & Succeed',
    description: 'Attend your session and achieve your learning goals.',
    icon: CheckCircle,
  },
];

const HowItWorks = () => {
  return (
    <section className="container mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-gray-100">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-gray-800 transition flex flex-col items-center"
          >
            <step.icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {index + 1}. {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
