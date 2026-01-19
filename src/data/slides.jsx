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
    headline: 'Michael Ehrich',
    shim: true,
    content: [
      'me.png',
      <div style={{ textAlign: 'left', fontSize: '2.5rem', fontWeight: 300 }}>
        <p>
          „Lazyness ist meine Superkraft. Deshalb baue ich Software die mich
          überflüssig macht.“
        </p>
      </div>,
    ],
  },
  {
    id: 'slide-welcome-002',
    type: 'image',
    url: 'background.png',
    poll: null,
    headline: 'Scan mich zum Mitmachen',
    shim: true,
    content: [
      'qrcode.svg',
      'icons/arrow.svg',
      'icons/phone.svg',
      // You can also mix in custom JSX content:
      // <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>
      //   <p>Custom text</p>
      //   <video src="video.mp4" autoPlay loop muted style={{ maxHeight: '60vh' }} />
      // </div>,
    ],
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
