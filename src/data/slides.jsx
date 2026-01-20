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
    id: 'slide-start-001',
    type: 'image',
    url: 'background.png',
    title: <>Erkennt ihr was KI generiert ist?</>,
    poll: null,
    shim: true,
  },
  {
    id: 'slide-code-000',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'KI Generiert?',
    poll: {
      question: 'KI generiert?',
      options: [
        {
          label: 'Ja',
          content: <img src="slides/word-defacts.png" className="slide__img" />,
        },
        {
          label: 'Nein',
          content: <img src="slides/empty-1.png" className="slide__img" />,
        },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'slide-code-003',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'KI Generiert?',
    poll: {
      question: 'KI generiert?',
      options: [
        {
          label: 'Ja',
          content: (
            <img src="slides/word-defacts-2.png" className="slide__img" />
          ),
        },
        {
          label: 'Nein',
          content: <img src="slides/empty-1.png" className="slide__img" />,
        },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'slide-code-004',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'KI Generiert?',
    poll: {
      question: 'KI generiert?',
      options: [
        {
          label: 'Ja',
          content: <img src="slides/real-2.webp" className="slide__img" />,
        },
        {
          label: 'Nein',
          content: <img src="slides/empty-1.png" className="slide__img" />,
        },
      ],
      correctIndex: 1,
    },
  },
  {
    id: 'slide-code-0033',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'KI Generiert?',
    poll: {
      question: 'KI generiert?',
      options: [
        {
          label: 'Ja',
          content: <img src="slides/hand-fail.png" className="slide__img" />,
        },
        {
          label: 'Nein',
          content: <img src="slides/empty-1.png" className="slide__img" />,
        },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'slide-code-001',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'KI Generiert?',
    poll: {
      question: 'KI generiert?',
      options: [
        {
          label: 'Ja',
          content: <img src="slides/real-1.jpg" className="slide__img" />,
        },
        {
          label: 'Nein',
          content: <img src="slides/empty-1.png" className="slide__img" />,
        },
      ],
      correctIndex: 1,
    },
  },
  {
    id: 'slide-code-002',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'KI Generiert?',
    poll: {
      question: 'KI generiert?',
      options: [
        {
          label: 'Ja',
          content: <img src="slides/fake-1.png" className="slide__img" />,
        },
        {
          label: 'Nein',
          content: <img src="slides/empty-1.png" className="slide__img" />,
        },
      ],
      correctIndex: 1,
    },
  },
  {
    id: 'slide-code-005',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'KI Generiert?',
    poll: {
      question: 'KI generiert?',
      options: [
        {
          label: 'Ja',
          content: <img src="slides/fake-3.png" className="slide__img" />,
        },
        {
          label: 'Nein',
          content: <img src="slides/empty-1.png" className="slide__img" />,
        },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'slide-quiz-099',
    type: 'image',
    url: 'background.png',
    headline: 'KI generiert?',
    poll: null,
    shim: true,
    content: [
      'slides/fake-1.png',
      'slides/fake-3.png',
      <div style={{ textAlign: 'left', fontSize: '2rem', fontWeight: 300 }}>
        <p>
          Solche Bilder kann ich lokal mit meinem Laptop und Offener Software
          erzeugen.
        </p>
      </div>,
    ],
  },
  {
    id: 'slide-quiz-187',
    type: 'image',
    url: 'background.png',
    headline: 'Welches der beiden Bilder ist KI generiert?',
    poll: null,
    shim: true,
    poll: {
      question: 'Welches der beiden Bilder ist KI generiert?',
      options: [
        {
          label: 'Links',
          content: <img src="slides/lego.png" className="slide__img" />,
        },
        {
          label: 'Rechts',
          content: <img src="slides/lego-2.jpg" className="slide__img" />,
        },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'slide-videos-001',
    type: 'image',
    url: 'background.png',
    title: <>Was ist mit Videos?</>,
    poll: null,
    shim: true,
  },
  {
    id: 'slide-videos-002',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'KI Generiert?',
    poll: {
      question: 'KI generiert?',
      options: [
        {
          label: 'Ja',
          content: (
            <video
              src="videos/video-shark.mp4"
              className="slide__img"
              autoPlay
              muted
              loop
              playsInline
            />
          ),
        },
        {
          label: 'Nein',
          content: <img src="slides/empty-1.png" className="slide__img" />,
        },
      ],
      correctIndex: 1,
    },
  },
  {
    id: 'slide-videos-003',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'KI Generiert?',
    poll: {
      question: 'KI generiert?',
      options: [
        {
          label: 'Ja',
          content: (
            <video
              src="videos/video-zebras.mp4"
              className="slide__img"
              autoPlay
              muted
              loop
              playsInline
            />
          ),
        },
        {
          label: 'Nein',
          content: <img src="slides/empty-1.png" className="slide__img" />,
        },
      ],
      correctIndex: 1,
    },
  },
  {
    id: 'slide-videos-003',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'KI Generiert?',
    poll: {
      question: 'KI generiert?',
      options: [
        {
          label: 'Ja',
          content: (
            <video
              src="videos/fake-account.mp4"
              className="slide__img"
              autoPlay
              muted
              loop
              playsInline
            />
          ),
        },
        {
          label: 'Nein',
          content: <img src="slides/empty-1.png" className="slide__img" />,
        },
      ],
      correctIndex: 0,
    },
  },
  {
    id: 'slide-videos-004',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'Fake Profil',
    poll: null,
    content: [
      'slides/fake-tiktok-profile.png',
      <div style={{ textAlign: 'left', fontSize: '2rem', fontWeight: 300 }}>
        <p>
          Millionen Views mit einem Profil von einem Fake Menschen mit einem
          Fake toten Hund.
        </p>
      </div>,
    ],
  },
  {
    id: 'slide-videos-005',
    type: 'image',
    url: 'background.png',
    shim: true,
    headline: 'AI Influencer',
    poll: null,
    content: ['slides/ai-influencer.png'],
  },
  // TODO forensic part
  // TODO position for finger
  // TODO recall and figure out if more content is needed
  {
    id: 'slide-quiz-099',
    type: 'image',
    url: 'background.png',
    headline: 'Extra Finger',
    poll: null,
    shim: true,
    content: [
      'slides/extra-finger.png',
      <div style={{ textAlign: 'left', fontSize: '2rem', fontWeight: 300 }}>
        <p>
          Kriminelle nutzen zusätzliche Finger als Prothesen, damit ihre Taten
          auf Videos wie KI-Fehler wirken.
        </p>
      </div>,
    ],
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
          Organisationen wie Adobe, Microsoft, OpenAI, Meta und Amazon
          unterstützt wird.
        </p>
      </div>,
    ],
  },
  {
    id: 'slide-what-to-do-007',
    type: 'image',
    url: 'background.png',
    headline: 'Fehler im Text',
    poll: null,
    shim: true,
    content: [
      'slides/word-defacts-3.png',
      <div style={{ textAlign: 'left', fontSize: '2rem', fontWeight: 300 }}>
        <p>
          Auch moderene Systeme machen noch immer Fehler im Text, die man nicht
          auf den ersten, aber auf den zweiten Blick sieht.
        </p>
      </div>,
    ],
  },
  {
    id: 'slide-what-to-do-007',
    type: 'image',
    url: 'background.png',
    headline: 'Schlechte Tools',
    poll: null,
    shim: true,
    content: [
      <div style={{ textAlign: 'left', fontSize: '2rem', fontWeight: 300 }}>
        <p>
          Nicht jeder wird immer die besten Tools verwenden, weshalb wir auch
          weiterhin sowhohl sehr professionelle, als auch sehr schlechte Inhalte
          sehen werden.
          <br />
          <br />
          Deshalb sollte man generell immer auf die Texte und Hände achten.
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
    id: 'slide-is-everything-bad-004',
    type: 'image',
    url: 'background.png',
    headline: 'KI Fails',
    poll: null,
    shim: true,
    content: ['slides/ai-fail-1.png', 'slides/ai-fail-2.png'],
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
