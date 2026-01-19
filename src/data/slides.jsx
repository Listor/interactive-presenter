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
      <div style={{ textAlign: 'left', fontSize: '2rem', fontWeight: 300 }}>
        <p>
          „Ich baue Software um das Leben einfacher und inklusiver zu machen.
          <br />
          <br />
          Technologie kann unser Leben verbessern und menschliche Beziehungen
          vertiefen – aber nur, wenn wir sie für Menschen entwickeln und nicht,
          um sie auszubeuten.“
        </p>
      </div>,
    ],
  },
  {
    id: 'slide-welcome-002',
    type: 'image',
    url: 'background.png',
    poll: null,
    headline: 'Code scannen um mitzumachen',
    shim: true,
    content: ['qrcode.svg', 'icons/arrow.svg', 'icons/phone.svg'],
  },
  {
    id: 'slide-code-001',
    type: 'image',
    url: 'background.png',
    poll: {
      question: 'What is the best programming language?',
      options: [
        {
          label: 'Links',
          content: (
            <img
              src="slides/isitfake-1.png"
              alt="isitfake-1"
              className="slide__img"
            />
          ),
        },
        {
          label: 'Rechts',
          content: (
            <img
              src="slides/isitfake-2.png"
              alt="isitfake-2"
              className="slide__img"
            />
          ),
        },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'slide-beach-001',
    type: 'image',
    url: 'background.png',
    poll: null,
  },
  {
    id: 'slide-isitfake-001',
    type: 'image',
    url: 'background.png',
    headline: 'Automatischer Faktencheck',
    poll: null,
    shim: true,
    content: ['slides/isitfake-1.png'],
  },
  {
    id: 'slide-isitfake-002',
    type: 'image',
    url: 'background.png',
    headline: 'Automatischer Faktencheck',
    poll: null,
    shim: true,
    content: ['slides/isitfake-2.png'],
  },
  {
    id: 'slide-teenager-001',
    type: 'image',
    url: 'background.png',
    headline: 'Allgemeine KI Bilderkennung',
    poll: null,
    shim: true,
    content: [
      'slides/integrity-1.png',
      <div style={{ textAlign: 'left', fontSize: '2rem', fontWeight: 300 }}>
        <p>
          Der 17 Jährige Huxley Westemeier entwickelt ein System namens
          Integrity zur generellen Erkennung von KI generierten Bildern.
          <br />
          <br />
          Er setzt nicht auf trainierte Modelle, sondern auf Algorithmen die
          nach bestimmten Mustern suchen.
        </p>
      </div>,
    ],
  },
  {
    id: 'slide-ai-001',
    type: 'image',
    url: 'background.png',
    poll: {
      question: 'Is this image AI generated?',
      options: [
        {
          label: 'Yes',
          content: (
            <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>Yes</div>
          ),
        },
        {
          label: 'No',
          content: (
            <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>No</div>
          ),
        },
      ],
      correctIndex: 0,
    },
  },
];
