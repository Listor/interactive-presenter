import GlitchWord from '../components/GlitchWord';

export const SLIDES = [
  {
    id: 'slide-nature-001',
    type: 'image',
    url: 'background.png',
    poll: null,
    title: (
      <>
        Was ist <GlitchWord original="echt" glitch="fake" /> in{' '}
        <nobr>Social-Media?</nobr>
      </>
    ),
  },
  {
    id: 'slide-welcome-001',
    type: 'image',
    url: 'background.png',
    poll: null,
    headline: 'Willkommen',
    shim: true,
  },
  {
    id: 'slide-code-001',
    type: 'image',
    url: 'background.png',
    poll: {
      question: 'What is the best programming language?',
      options: ['JavaScript', 'Python', 'Rust', 'Go'],
      correctIndex: 2,
    },
  },
  {
    id: 'slide-beach-001',
    type: 'image',
    url: 'background.png',
    poll: null,
  },
  {
    id: 'slide-ai-001',
    type: 'image',
    url: 'background.png',
    poll: {
      question: 'Is this image AI generated?',
      options: ['Yes', 'No'],
      correctIndex: 0,
    },
  },
];
