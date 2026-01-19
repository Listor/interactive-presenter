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
    shim: true,
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
  {
    id: 'slide-beach-001',
    type: 'image',
    url: 'background.png',
    poll: null,
    shim: true,
  },
  {
    id: 'slide-what-to-do-001',
    type: 'image',
    url: 'background.png',
    title: <>Was kann ich überhaupt noch machen?</>,
    poll: null,
    shim: true,
  },
  {
    id: 'slide-what-to-do-002',
    type: 'image',
    url: 'background.png',
    headline: 'Wer ist die Quelle?',
    poll: null,
    shim: true,
    content: [
      <div style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 300 }}>
        <p>
          Allgemeine Faustregel:
          <br />
          Social-Media ist <strong>KEINE</strong> Newsquelle!
        </p>
      </div>,
    ],
  },
  {
    id: 'slide-what-to-do-003',
    type: 'image',
    url: 'background.png',
    headline: 'Hinterfrage die Inhalte',
    poll: null,
    shim: true,
    content: [
      <div style={{ textAlign: 'left', fontSize: '2rem', fontWeight: 300 }}>
        <p>
          - Wer ist die Quelle ?<br />
          - Wann ist es passiert?
          <br />- Was genau ist passiert?
        </p>
      </div>,
      <div style={{ textAlign: 'left', fontSize: '2rem', fontWeight: 300 }}>
        <p>
          - Wer hat was getan?
          <br />- Warum ist es passiert?
          <br />- Wo ist es passiert?
        </p>
      </div>,
    ],
  },
  {
    id: 'slide-what-to-do-004',
    type: 'image',
    url: 'background.png',
    headline: 'Rückwärts Bildersuche',
    poll: null,
    shim: true,
    content: ['slides/reverse-image.png'],
  },
  {
    id: 'slide-what-to-do-005',
    type: 'image',
    url: 'background.png',
    headline: 'Wasserzeichen',
    poll: null,
    shim: true,
    content: [
      'slides/watermark-1.png',
      <div style={{ textAlign: 'left', fontSize: '2rem', fontWeight: 300 }}>
        <p>
          Googles SynthID verwendet Wasserzeichen um die Quelle von Bildern zu
          identifizieren.
          <br />
          <br />
          Es funktioniert für alle Bilder, Videos und Texte, die von Google
          generiert werden.
        </p>
      </div>,
    ],
  },
  {
    id: 'slide-what-to-do-006',
    type: 'image',
    url: 'background.png',
    headline: 'Wasserzeichen',
    poll: null,
    shim: true,
    content: [
      'slides/watermark-2.png',
      <div style={{ textAlign: 'left', fontSize: '2rem', fontWeight: 300 }}>
        <p>
          Content Credentials machen die Herkunft digitaler Inhalte
          nachvollziehbar.
          <br />
          <br />
          Sie basieren auf einem offenen Standard, der von Unternehmen und
          Organisationen wie Adobe, Microsoft, OpenAI, Meta und Amazon getragen
          werden.
        </p>
      </div>,
    ],
  },
  {
    id: 'slide-what-others-do-001',
    type: 'image',
    url: 'background.png',
    title: <>Wird an professionellen Lösungen gearbeitet?</>,
    poll: null,
    shim: true,
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
          Der 17 Jährige Huxley Westemeier (USA) entwickelt ein System namens
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
    id: 'slide-is-everything-bad-001',
    type: 'image',
    url: 'background.png',
    title: (
      <>
        Sind KI-Systeme also
        <br />
        nur schlecht?
      </>
    ),
    poll: null,
    shim: true,
  },
  {
    id: 'slide-is-everything-bad-002',
    type: 'image',
    url: 'background.png',
    headline: 'Geburtstagskarten',
    poll: null,
    shim: true,
    content: ['cards/bcard-1.png', 'cards/bcard-2.png'],
  },
  {
    id: 'slide-is-everything-bad-003',
    type: 'image',
    url: 'background.png',
    headline: 'Weihnachtskarten',
    poll: null,
    shim: true,
    content: ['cards/xmas-1.png', 'cards/xmas-2.png'],
  },
  {
    id: 'slide-end-001',
    type: 'image',
    url: 'background.png',
    title: 'Danke',
    poll: null,
    shim: true,
  },
];
