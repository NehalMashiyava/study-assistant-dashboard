import { UserProfile, SummaryItem, FlashcardDeck, QuizItem, StudyActivity } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@university.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  major: 'Cognitive Neuroscience & AI',
  dailyStreak: 14,
  weeklyGoalHours: 20,
  completedHoursThisWeek: 14.5,
  xpPoints: 2450,
};

export const initialSummaries: SummaryItem[] = [
  {
    id: 'sum-1',
    title: 'Synaptic Plasticity & Long-Term Potentiation',
    subject: 'Neuroscience',
    excerpt: 'Detailed breakdown of NMDA receptor activation, Ca2+ influx mechanisms, and downstream protein kinase cascades in memory consolidation.',
    tldr: 'This lecture establishes that synaptic plasticity, driven by Long-Term Potentiation (LTP) in the hippocampus, forms the primary cellular basis for associative learning and memory encoding. Postsynaptic depolarization relieves the magnesium blockade on NMDA receptors, triggering a persistent intracellular calcium cascade that strengthens synaptic transmission.',
    coreConcepts: [
      'Glutamate release and initial AMPA receptor mediated postsynaptic depolarization.',
      'Voltage-dependent Mg2+ expulsion in NMDA receptor channels allowing Ca2+ influx.',
      'CaMKII and protein kinase phosphorylation driving AMPA receptor insertion.',
      'Retrograde messengers that enhance presynaptic neurotransmitter release efficiency.'
    ],
    detailedBreakdown: [
      {
        conceptTitle: 'AMPA & NMDA Receptor Dual-Gating Dynamics',
        explanation: 'At resting potential (-70mV), extracellular Mg2+ ions physically block NMDA receptor pores. Intense glutamate binding to neighboring AMPA receptors triggers local sodium influx, depolarizing the membrane to approximately -30mV and repelling the Mg2+ plug.',
        examples: [
          'High-frequency 100 Hz tetanic stimulation in CA1 hippocampal pyramidal neurons.',
          'Pharmacological blockage experiments with APV preventing LTP induction.'
        ]
      },
      {
        conceptTitle: 'Intracellular Calcium Signaling & Kinase Activation',
        explanation: 'Once unblocked, NMDA receptors permit high-affinity Ca2+ entry into dendritic spines. Elevated calcium binds calmodulin, activating Calcium/Calmodulin-dependent Protein Kinase II (CaMKII).',
        examples: [
          'CaMKII autophosphorylation locking the kinase into an autonomous active state.',
          'Phosphorylation of GluA1 subunits accelerating AMPA conductance.'
        ]
      },
      {
        conceptTitle: 'Structural Consolidation & Synaptic Remodeling',
        explanation: 'Long-term maintenance of LTP requires protein synthesis, spine enlargement, and recruitment of auxiliary scaffolding proteins (PSD-95) to stabilize enlarged postsynaptic densities.',
        examples: [
          'Dendritic spine head volume expansion observed via two-photon microscopy.',
          'CREB transcription factor activation leading to synaptic growth factors.'
        ]
      }
    ],
    keyVocabulary: [
      {
        term: 'Long-Term Potentiation (LTP)',
        definition: 'A persistent, activity-dependent strengthening of synapses based on recent patterns of activity.'
      },
      {
        term: 'NMDA Receptor',
        definition: 'An ionotropic glutamate receptor that is dual-gated by ligand binding and membrane voltage, highly permeable to calcium.'
      },
      {
        term: 'CaMKII',
        definition: 'Calcium/calmodulin-dependent protein kinase II, a master regulator kinase in synaptic plasticity.'
      },
      {
        term: 'Retrograde Messenger',
        definition: 'Diffusible molecules (such as nitric oxide) released postsynaptically to signal back to the presynaptic terminal.'
      }
    ],
    bulletPoints: [
      'Glutamate release triggers post-synaptic AMPA depolarization.',
      'Depolarization displaces the Mg2+ block in NMDA channels.',
      'Calcium influx initiates CaMKII phosphorylation cascade.',
      'Retrograde messengers promote presynaptic neurotransmitter release efficiency.'
    ],
    fullContent: 'Synaptic plasticity is the biological foundation of learning and memory. In hippocampal circuits, high-frequency stimulation triggers Long-Term Potentiation (LTP). Key mechanisms include dual-gated NMDA receptor conduction, AMPA receptor insertion into the postsynaptic density, and transcriptional changes mediated by CREB phosphorylation.',
    readingTimeMinutes: 4,
    createdAt: 'Yesterday, 4:15 PM',
    tags: ['Hippocampus', 'Neuroplasticity', 'LTP', 'Bio 301']
  },
  {
    id: 'sum-2',
    title: 'Monetary Policy & Inflation Dynamics',
    subject: 'Macroeconomics',
    excerpt: 'A synthesis of interest rate channels, quantitative easing impacts, and Phillips Curve shifts in modern post-pandemic economic models.',
    tldr: 'Central banks utilize interest rate adjustments and quantitative easing to steer aggregate demand, price stability, and maximum sustainable employment. While the short-run Phillips curve demonstrates trade-offs between inflation and unemployment, unanchored expectations risk creating persistent stagflationary shocks.',
    coreConcepts: [
      'Taylor Rule formulation for neutral nominal policy rate targeting.',
      'Transmission channels of interest rate adjustments to investment and consumer spending.',
      'Demand-pull versus supply-side cost-push inflationary mechanisms.',
      'Balance sheet management, quantitative easing (QE), and quantitative tightening (QT).'
    ],
    detailedBreakdown: [
      {
        conceptTitle: 'The Taylor Rule & Benchmark Rate Determination',
        explanation: 'The Taylor Rule provides an empirical guideline for adjusting nominal policy rates in response to deviations of inflation from target (2%) and GDP from potential output.',
        examples: [
          'Formula: i = r* + π + 0.5(π - π*) + 0.5(y - y*).',
          'Historical rate hikes during overheating periods to dampen excessive credit expansion.'
        ]
      },
      {
        conceptTitle: 'Monetary Transmission Channels & Time Lags',
        explanation: 'Policy rate modifications ripple through interbank lending, commercial borrowing costs, asset valuation, and foreign exchange rates with estimated 12-18 month operational lags.',
        examples: [
          'Mortgage borrowing rate escalation slowing housing starts.',
          'Currency appreciation reducing imported goods inflation.'
        ]
      },
      {
        conceptTitle: 'Inflation Expectations & The Long-Run Phillips Curve',
        explanation: 'Adaptive versus rational expectation models show that in the long run, the Phillips curve is vertical at the Non-Accelerating Inflation Rate of Unemployment (NAIRU).',
        examples: [
          'The 1970s stagflation episode where inflation expectations became unanchored.',
          'Forward guidance strategies deployed to reinforce market confidence.'
        ]
      }
    ],
    keyVocabulary: [
      {
        term: 'Taylor Rule',
        definition: 'A mathematical formula linking central bank target interest rates to inflation deviations and output gaps.'
      },
      {
        term: 'Quantitative Easing (QE)',
        definition: 'An unconventional monetary policy where central banks purchase longer-term securities to inject liquidity directly into the economy.'
      },
      {
        term: 'NAIRU',
        definition: 'Non-Accelerating Inflation Rate of Unemployment, representing the structural equilibrium level of unemployment.'
      }
    ],
    bulletPoints: [
      'Taylor Rule formulation for neutral nominal rate targeting.',
      'Supply-side shocks vs. demand-pull inflation dynamics.',
      'Transmission delays of central bank benchmark rate hikes (12-18 months).',
      'Balance sheet reduction mechanisms and liquidity absorption.'
    ],
    fullContent: 'Monetary policy operates through multiple transmission channels: interest rates, credit availability, asset prices, and exchange rates. The Phillips Curve model illustrates the short-run trade-off between unemployment and inflation, though inflation expectations heavily anchor long-term equilibrium.',
    readingTimeMinutes: 6,
    createdAt: 'Aug 19, 2026',
    tags: ['Central Bank', 'Taylor Rule', 'Econ 210']
  },
  {
    id: 'sum-3',
    title: 'Transformer Architecture: Self-Attention Mechanisms',
    subject: 'Computer Science',
    excerpt: 'Core principles of scaled dot-product attention, multi-head projections, positional encoding, and feedforward networks.',
    tldr: 'The Transformer model replaces recurrence with parallelized scaled dot-product self-attention mechanisms, enabling efficient long-range context capture across arbitrary sequences. Multi-head attention projections allow the network to attend to multiple semantic and syntactic representation subspaces concurrently.',
    coreConcepts: [
      'Scaled Dot-Product Attention: Softmax(Q·K^T / √d_k) · V.',
      'Multi-Head projections for parallel subspace contextualization.',
      'Sinusoidal and rotary positional embeddings encoding token ordering.',
      'Pre-LayerNorm residual connections ensuring deep network gradient stability.'
    ],
    detailedBreakdown: [
      {
        conceptTitle: 'Scaled Dot-Product Mathematical Formulation',
        explanation: 'Given Query (Q), Key (K), and Value (V) matrices, attention weights are computed via dot product, scaled by the square root of key dimension to prevent gradient saturation in Softmax.',
        examples: [
          'Scaling by 1/√64 when d_k = 64 prevents extremely small gradient backpropagation.',
          'Cross-attention masking preventing future token leakage in causal autoregressive models.'
        ]
      },
      {
        conceptTitle: 'Multi-Head Attention Projections',
        explanation: 'Instead of performing a single attention function, queries, keys, and values are linearly projected h times into lower dimensions (d_model / h), processed in parallel, and concatenated.',
        examples: [
          '8 heads allowing one head to capture verb-object dependencies while another tracks subject agreement.'
        ]
      }
    ],
    keyVocabulary: [
      {
        term: 'Self-Attention',
        definition: 'An attention mechanism relating different positions of a single sequence to compute a representation of the sequence.'
      },
      {
        term: 'Positional Encoding',
        definition: 'Fixed or learned vector representations added to token embeddings to inject sequence order without recurrent loops.'
      },
      {
        term: 'Residual Connection',
        definition: 'Skip connection adding layer input x to output F(x) to prevent vanishing gradients during deep backpropagation.'
      }
    ],
    bulletPoints: [
      'Scaled Dot-Product Attention: Softmax(Q·K^T / √d_k) · V.',
      'Multi-Head attention allows jointly attending to different representation subspaces.',
      'Sinusoidal and rotary positional encodings preserve sequence order.',
      'Residual connections and LayerNorm ensure stable gradient propagation.'
    ],
    fullContent: 'The Transformer architecture introduced in "Attention Is All You Need" revolutionized Natural Language Processing and generative modeling. By removing recurrence, transformers allow massive parallelization during training across GPUs.',
    readingTimeMinutes: 5,
    createdAt: 'Aug 16, 2026',
    tags: ['Deep Learning', 'Attention', 'CS 480']
  },
  {
    id: 'sum-4',
    title: 'Cellular Respiration: Krebs Cycle & Electron Transport',
    subject: 'Cell Biology',
    excerpt: 'Step-by-step pathway of acetyl-CoA oxidation, NADH/FADH2 synthesis, and ATP synthase chemiosmosis.',
    tldr: 'Aerobic cellular respiration catabolizes glucose into net 30-32 ATP through glycolysis, the mitochondrial Krebs cycle, and electron transport chain chemiosmosis. Oxygen acts as the terminal electron acceptor, driving the electrochemical proton gradient that powers ATP synthase rotation.',
    coreConcepts: [
      'Glycolysis in cytoplasm yielding 2 pyruvate, 2 net ATP, and 2 NADH.',
      'Pyruvate dehydrogenase link reaction producing Acetyl-CoA and CO2 in mitochondrial matrix.',
      'Citric Acid Cycle generating 3 NADH, 1 FADH2, and 1 GTP/ATP per turn.',
      'Oxidative phosphorylation and ATP Synthase (Complex V) proton turbine mechanics.'
    ],
    detailedBreakdown: [
      {
        conceptTitle: 'Krebs Cycle Enzymatic Oxidation',
        explanation: 'Oxaloacetate (4C) condenses with Acetyl-CoA (2C) to form Citrate (6C). Subsequent decarboxylations reduce NAD+ and FAD into high-energy electron carriers.',
        examples: [
          'Isocitrate dehydrogenase rate-limiting step inhibited by high ATP levels.',
          'Succinate dehydrogenase directly linked to Complex II of the electron transport chain.'
        ]
      },
      {
        conceptTitle: 'Chemiosmotic Proton Gradient & ATP Generation',
        explanation: 'Complexes I, III, and IV pump protons into the intermembrane space, creating a proton-motive force that rotates ATP synthase subunit stalks to condense ADP + Pi into ATP.',
        examples: [
          'P/O ratio yielding ~2.5 ATP per NADH and ~1.5 ATP per FADH2 oxidized.'
        ]
      }
    ],
    keyVocabulary: [
      {
        term: 'Chemiosmosis',
        definition: 'The movement of ions across a semipermeable membrane down their electrochemical gradient, generating ATP.'
      },
      {
        term: 'Acetyl-CoA',
        definition: 'The entry molecule for the citric acid cycle formed by the oxidative decarboxylation of pyruvate.'
      },
      {
        term: 'ATP Synthase',
        definition: 'A molecular motor enzyme that synthesizes adenosine triphosphate from ADP and inorganic phosphate.'
      }
    ],
    bulletPoints: [
      'Pyruvate dehydrogenase converts pyruvate into Acetyl-CoA in the mitochondrial matrix.',
      'Citric Acid cycle yields 3 NADH, 1 FADH2, and 1 GTP per turn.',
      'Proton gradient (H+) drives the rotary mechanism of ATP synthase (Complex V).'
    ],
    fullContent: 'Cellular respiration converts biochemical energy from nutrients into ATP. The complete aerobic oxidation of one glucose molecule yields approximately 30-32 net ATP molecules through glycolysis, pyruvate oxidation, Krebs cycle, and oxidative phosphorylation.',
    readingTimeMinutes: 4,
    createdAt: 'Aug 14, 2026',
    tags: ['Mitochondria', 'Biochemistry', 'Bio 102']
  }
];

export const initialDecks: FlashcardDeck[] = [
  {
    id: 'deck-1',
    title: 'Organic Chemistry Reagents & Reactions',
    subject: 'Chemistry',
    description: 'Electrophilic aromatic substitution, nucleophilic addition, Grignard reagents, and stereochemistry rules.',
    totalCards: 48,
    masteredCards: 38,
    lastStudied: 'Today, 10:20 AM',
    color: 'from-amber-500 to-orange-600',
    cards: [
      {
        id: 'c1',
        front: 'What does PCC (Pyridinium chlorochromate) do to primary alcohols?',
        back: 'Selectively oxidizes primary alcohols to aldehydes (does not oxidize further to carboxylic acids).',
        mastered: true
      },
      {
        id: 'c2',
        front: 'What are the products of an Ozonolysis (O3, (CH3)2S) on a disubstituted alkene?',
        back: 'Two carbonyl compounds (ketones or aldehydes depending on alkene substitution).',
        mastered: true
      },
      {
        id: 'c3',
        front: 'Define Markovnikov\'s Rule for electrophilic addition.',
        back: 'In HX addition to an asymmetric alkene, the proton (H) attaches to the carbon with more hydrogens, and X attaches to the more substituted carbon.',
        mastered: false
      },
      {
        id: 'c4',
        front: 'What reagents are required for Jones Oxidation?',
        back: 'CrO3 in aqueous H2SO4 and acetone. (Oxidizes 1° alcohols to carboxylic acids, 2° alcohols to ketones).',
        mastered: false
      }
    ]
  },
  {
    id: 'deck-2',
    title: 'Neural Networks & Deep Learning Foundations',
    subject: 'Computer Science',
    description: 'Backpropagation, activation functions, loss functions, regularization techniques, and optimization algorithms.',
    totalCards: 36,
    masteredCards: 29,
    lastStudied: 'Yesterday, 8:45 PM',
    color: 'from-indigo-600 to-blue-700',
    cards: [
      {
        id: 'c5',
        front: 'Why is ReLU preferred over Sigmoid in hidden layers of deep networks?',
        back: 'Prevents the vanishing gradient problem for positive inputs and is computationally fast to calculate.',
        mastered: true
      },
      {
        id: 'c6',
        front: 'What is the mathematical definition of Cross-Entropy Loss for binary classification?',
        back: 'L = - [ y · log(p) + (1 - y) · log(1 - p) ]',
        mastered: true
      },
      {
        id: 'c7',
        front: 'Explain the difference between L1 (Lasso) and L2 (Ridge) regularization.',
        back: 'L1 adds the absolute value of weights (encourages sparsity/feature selection); L2 adds squared weights (encourages small, distributed weights).',
        mastered: true
      }
    ]
  },
  {
    id: 'deck-3',
    title: 'French B2 Vocabulary & Idiomatic Expressions',
    subject: 'Languages',
    description: 'Advanced conversational idioms, subjunctive triggers, and academic transitions.',
    totalCards: 65,
    masteredCards: 42,
    lastStudied: 'Aug 18, 2026',
    color: 'from-emerald-500 to-teal-600',
    cards: [
      {
        id: 'c8',
        front: 'What does "Avoir le cafard" mean?',
        back: 'To feel down, depressed, or to have the blues (literal: to have the cockroach).',
        mastered: true
      },
      {
        id: 'c9',
        front: 'Does "Bien que" require the subjunctive or indicative mood?',
        back: 'Subjunctive! Example: "Bien qu\'il fasse froid..."',
        mastered: false
      }
    ]
  },
  {
    id: 'deck-4',
    title: 'Cellular Signaling Pathways',
    subject: 'Biology',
    description: 'G-protein coupled receptors, Tyrosine kinase cascades, second messengers (cAMP, IP3, DAG).',
    totalCards: 24,
    masteredCards: 18,
    lastStudied: 'Aug 15, 2026',
    color: 'from-rose-500 to-pink-600',
    cards: [
      {
        id: 'c10',
        front: 'What enzyme catalyzes the conversion of ATP to cyclic AMP (cAMP)?',
        back: 'Adenylyl Cyclase (activated by G_alpha-s subunit).',
        mastered: true
      },
      {
        id: 'c11',
        front: 'What is the role of Phospholipase C (PLC)?',
        back: 'Cleaves PIP2 into IP3 (mobilizes intracellular Ca2+) and DAG (activates Protein Kinase C).',
        mastered: false
      }
    ]
  }
];

export const initialQuizzes: QuizItem[] = [
  {
    id: 'quiz-1',
    title: 'Cognitive Systems Midterm Prep',
    subject: 'Neuroscience',
    questionsCount: 15,
    durationMinutes: 20,
    difficulty: 'Advanced',
    status: 'completed',
    score: 93,
    lastAttemptDate: 'Yesterday, 3:00 PM',
    questions: [
      {
        id: 'q1',
        question: 'Which brain structure is primarily responsible for the consolidation of declarative memories?',
        options: ['Hippocampus', 'Cerebellum', 'Basal Ganglia', 'Amygdala'],
        correctAnswer: 0,
        explanation: 'The hippocampus and medial temporal lobe are crucial for consolidating episodic and semantic declarative memories.'
      },
      {
        id: 'q2',
        question: 'What is the primary inhibitory neurotransmitter in the adult mammalian central nervous system?',
        options: ['Glutamate', 'GABA', 'Dopamine', 'Acetylcholine'],
        correctAnswer: 1,
        explanation: 'GABA (gamma-aminobutyric acid) is the main inhibitory neurotransmitter, reducing neuronal excitability.'
      },
      {
        id: 'q3',
        question: 'Which ion channel blockage is relieved by post-synaptic depolarization during LTP induction?',
        options: ['Sodium (Na+)', 'Potassium (K+)', 'Magnesium (Mg2+)', 'Chloride (Cl-)'],
        correctAnswer: 2,
        explanation: 'NMDA receptors are blocked by Mg2+ at resting membrane potentials; depolarization expels the Mg2+ ion.'
      }
    ]
  },
  {
    id: 'quiz-2',
    title: 'Machine Learning: Loss Functions & Optimization',
    subject: 'Computer Science',
    questionsCount: 10,
    durationMinutes: 15,
    difficulty: 'Intermediate',
    status: 'completed',
    score: 88,
    lastAttemptDate: 'Aug 19, 2026',
    questions: [
      {
        id: 'q4',
        question: 'Which optimizer adaptively calculates individual learning rates for different parameters using first and second moments of gradients?',
        options: ['SGD with Momentum', 'Adam', 'Adagrad', 'RMSProp'],
        correctAnswer: 1,
        explanation: 'Adam (Adaptive Moment Estimation) combines the benefits of both AdaGrad and RMSProp with exponentially decaying average of past gradients.'
      },
      {
        id: 'q5',
        question: 'What happens to a neural network when the learning rate is set excessively high?',
        options: ['It converges faster to the global minimum', 'The loss diverges or oscillates uncontrollably', 'Weights become exactly zero', 'The model overfits quickly'],
        correctAnswer: 1,
        explanation: 'A very large learning rate can cause the optimizer to overshoot the minima and diverge.'
      }
    ]
  },
  {
    id: 'quiz-3',
    title: 'Macroeconomic Principles: IS-LM & Policy Mix',
    subject: 'Economics',
    questionsCount: 12,
    durationMinutes: 15,
    difficulty: 'Intermediate',
    status: 'upcoming',
    questions: [
      {
        id: 'q6',
        question: 'In the IS-LM model, an expansionary fiscal policy shifts which curve in which direction?',
        options: ['IS curve to the right', 'IS curve to the left', 'LM curve to the right', 'LM curve to the left'],
        correctAnswer: 0,
        explanation: 'Increased government spending or tax cuts shift the IS curve to the right, increasing interest rates and output.'
      },
      {
        id: 'q7',
        question: 'What is the liquidity trap?',
        options: [
          'When commercial banks have zero reserves',
          'When nominal interest rates are near zero and monetary policy becomes ineffective',
          'When inflation exceeds 100%',
          'When tax rates are 100%'
        ],
        correctAnswer: 1,
        explanation: 'A liquidity trap occurs when monetary policy cannot lower interest rates further because rates are already near zero.'
      }
    ]
  },
  {
    id: 'quiz-4',
    title: 'Organic Synthesis & Mechanism Check',
    subject: 'Chemistry',
    questionsCount: 20,
    durationMinutes: 25,
    difficulty: 'Advanced',
    status: 'upcoming',
    questions: [
      {
        id: 'q8',
        question: 'What reaction converts a primary amide to an amine with one less carbon atom?',
        options: ['Hofmann Rearrangement', 'Curtius Rearrangement', 'Gabriel Synthesis', 'Aldol Condensation'],
        correctAnswer: 0,
        explanation: 'The Hofmann rearrangement treats primary amides with Br2 and base to produce primary amines with loss of the carbonyl carbon.'
      }
    ]
  }
];

export const initialRecentActivities: StudyActivity[] = [
  {
    id: 'act-1',
    type: 'quiz',
    title: 'Cognitive Systems Midterm Prep',
    timeAgo: '2 hours ago',
    scoreOrDuration: 'Scored 93% (14/15)'
  },
  {
    id: 'act-2',
    type: 'flashcards',
    title: 'Organic Chemistry Reagents (18 cards reviewed)',
    timeAgo: '5 hours ago',
    scoreOrDuration: '25 mins practiced'
  },
  {
    id: 'act-3',
    type: 'summary',
    title: 'Synaptic Plasticity & LTP generated',
    timeAgo: 'Yesterday',
    scoreOrDuration: '4 min read'
  },
  {
    id: 'act-4',
    type: 'flashcards',
    title: 'French B2 Expressions (12 cards mastered)',
    timeAgo: '2 days ago',
    scoreOrDuration: '15 mins practiced'
  }
];
