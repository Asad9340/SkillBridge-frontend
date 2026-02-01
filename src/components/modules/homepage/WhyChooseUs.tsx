'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, Globe } from 'lucide-react';

const features = [
  {
    title: 'Expert Tutors',
    description: 'Learn from experienced tutors in a variety of subjects.',
    icon: Users,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Book sessions at a time that fits your schedule perfectly.',
    icon: Clock,
  },
  {
    title: 'Learn Anywhere',
    description: 'Access lessons and resources from any device, anytime.',
    icon: Globe,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="container mx-auto px-6 text-center py-20">
      <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-gray-100">
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-3 gap-10">
        {features.map(feature => (
          <Card
            key={feature.title}
            className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm dark:shadow-none hover:shadow-lg dark:hover:shadow-gray-800 transition"
          >
            <CardHeader className="flex flex-col items-center mb-4">
              <feature.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mb-2" />
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
