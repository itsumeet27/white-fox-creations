/**
 * Featured client work by category — edit here to add/remove projects.
 */
(function () {
  const img = {
    pulse: "assets/images/gallery/pulse.jpg",
    orbital: "assets/images/gallery/orbital-silence.jpg",
    liquid: "assets/images/gallery/liquid-frequency.jpg",
    chaos: "assets/images/gallery/chaos-theory.jpg",
    unseen: "assets/images/gallery/unseen.jpg",
    threshold: "assets/images/gallery/threshold.jpg",
    momentum: "assets/images/gallery/momentum.jpg",
    interval: "assets/images/gallery/interval.jpg",
    flow: "assets/images/gallery/flow-state.jpg",
    cubic: "assets/images/gallery/cubic-light.jpg",
    voidSignal: "assets/images/gallery/void-signal.jpg",
    amber: "assets/images/gallery/amber-rift.jpg",
    glass: "assets/images/gallery/glass-noise.jpg",
    neon: "assets/images/gallery/neon-fold.jpg",
    bloom: "assets/images/gallery/static-bloom.jpg",
    heat: "assets/images/gallery/vector-heat.jpg",
    prism: "assets/images/gallery/dark-prism.jpg",
    echo: "assets/images/gallery/echo-form.jpg",
    rift: "assets/images/gallery/rift-study.jpg",
    flare: "assets/images/gallery/mono-flare.jpg",
    burn: "assets/images/gallery/burn-grid.jpg",
    arc: "assets/images/gallery/silent-arc.jpg",
    phase: "assets/images/gallery/phase-cut.jpg",
    hero: "assets/images/gallery/hero-gallery.jpg",
    echoes: "assets/images/project-echoes.jpg",
    fluidity: "assets/images/project-fluidity.jpg",
    kinetic: "assets/images/project-kinetic.jpg",
    cinematic: "assets/images/hero-cinematic.jpg",
    g1: "assets/images/gallery-01.jpg",
    g2: "assets/images/gallery-02.jpg",
    g3: "assets/images/gallery-03.jpg",
    g4: "assets/images/gallery-04.jpg",
    g5: "assets/images/gallery-05.jpg"
  };

  const processDefault = [
    "Concept Development",
    "3D Modeling",
    "Textures & Materials",
    "Lighting & Look Development",
    "Animation & Camera",
    "Compositing"
  ];

  function project(partial) {
    return Object.assign(
      {
        year: 2026,
        duration: "00:45 Seconds",
        tools: ["Cinema 4D", "After Effects", "Octane Render", "Redshift"],
        deliverables: [
          "Motion Graphic Video",
          "Loop Version",
          "High Resolution Stills",
          "Behind The Scenes"
        ],
        process: processDefault,
        objective:
          "Craft a cinematic motion piece that holds attention through light, rhythm and material tension."
      },
      partial
    );
  }

  window.PROJECT_CATEGORIES = [
    {
      id: "posts",
      name: "Posts",
      cover: img.g1,
      projects: [
        project({
          id: "orbital-shift",
          title: "Orbital Shift",
          discipline: "3D / Motion Graphics",
          year: 2026,
          image: img.hero,
          summary:
            "A cinematic study of rotation, fracture and rebirth — a sphere splitting open to reveal a living core of light.",
          about: [
            "Orbital Shift explores the moment a closed system can no longer hold itself together. The form rotates with mechanical calm, then ruptures — fragments peeling away as an orange core ignites from within.",
            "The piece is built as a loopable sequence: destruction and rebirth occupy the same orbit, so the ending is also the beginning. Every frame is composed to feel like a still you could hang on a wall."
          ],
          objective:
            "Translate a brand metaphor of transformation into a 45-second motion piece with physical weight, heat, and a single unforgettable core.",
          duration: "00:45 Seconds",
          process: [
            "Concept Development",
            "3D Modeling",
            "Textures & Materials",
            "Simulation & Fracture",
            "Lighting & Rendering",
            "Color & Composite"
          ]
        }),
        project({
          id: "night-dispatch",
          title: "Night Dispatch",
          discipline: "Social / Motion",
          year: 2026,
          image: img.g1,
          summary: "A vertical campaign still series for after-hours product drops.",
          about: [
            "Night Dispatch treats social frames as cinema. Each post is a cropped sequence from a longer motion system — neon visors, grain, and a single orange cue.",
            "The system was designed so stills, loops and stories share the same lighting grammar."
          ],
          objective: "Build a repeatable social language that still feels editorial.",
          duration: "00:12 Seconds",
          tools: ["After Effects", "Photoshop", "Premiere Pro"],
          deliverables: ["Story Loops", "Feed Stills", "Cover Frames", "Motion Kit"]
        }),
        project({
          id: "pulse-drop",
          title: "Pulse Drop",
          discipline: "Campaign Still",
          year: 2025,
          image: img.pulse,
          summary: "Circular energy studies distilled into square and 4:5 posts.",
          about: [
            "Pulse Drop extracts orbital mechanics into social-ready compositions.",
            "The challenge was keeping the 3D depth readable at phone scale without losing the core glow."
          ],
          duration: "00:08 Seconds"
        }),
        project({
          id: "ember-feed",
          title: "Ember Feed",
          discipline: "Art Direction",
          year: 2025,
          image: img.amber,
          summary: "Heat ruptures used as a visual signature across a content calendar.",
          about: [
            "Ember Feed is a content system built around one gesture: a vertical tear of heat.",
            "The same rupture is cropped, looped and re-timed so every post feels related without repeating."
          ],
          duration: "00:10 Seconds",
          tools: ["Photoshop", "After Effects"]
        }),
        project({
          id: "visor-cut",
          title: "Visor Cut",
          discipline: "Portrait / Posts",
          year: 2025,
          image: img.unseen,
          summary: "Editorial portraits interrupted by a single orange stroke.",
          about: [
            "A portrait series where identity is suggested, then withheld.",
            "The orange gesture is the only brand mark — everything else stays cinematic and quiet."
          ],
          duration: "00:06 Seconds"
        }),
        project({
          id: "signal-grid",
          title: "Signal Grid",
          discipline: "Layout System",
          year: 2024,
          image: img.burn,
          summary: "Modular post templates with scorched grid interruptions.",
          about: [
            "Signal Grid is a layout kit for rapid campaign publishing.",
            "Type, crop and heat marks snap to a shared 8-column system."
          ],
          duration: "00:15 Seconds",
          tools: ["InDesign", "Photoshop", "After Effects"]
        }),
        project({
          id: "rift-note",
          title: "Rift Note",
          discipline: "Motion Still",
          year: 2025,
          image: img.rift,
          summary: "Circular rupture studies formatted for launch announcements.",
          about: [
            "Rift Note takes a 3D rupture and crops it as if it were a logo.",
            "The stills were used as countdown frames leading into a product film."
          ]
        }),
        project({
          id: "glass-post",
          title: "Glass Post",
          discipline: "Optical Study",
          year: 2024,
          image: img.glass,
          summary: "Interference patterns packaged as a weekly visual series.",
          about: [
            "Concentric optical noise, slowed until it reads as jewelry.",
            "Each week a new crop, same physics, different tension."
          ],
          duration: "00:09 Seconds"
        }),
        project({
          id: "mono-brief",
          title: "Mono Brief",
          discipline: "Typography Post",
          year: 2024,
          image: img.flare,
          summary: "Monochrome type hit by a single flare — made for stories.",
          about: [
            "Mono Brief is a type-first social system.",
            "One flare does all the branding work so the copy can stay severe."
          ],
          tools: ["Illustrator", "After Effects"]
        }),
        project({
          id: "void-card",
          title: "Void Card",
          discipline: "Motion Study",
          year: 2025,
          image: img.voidSignal,
          summary: "Waveform arcs composed as shareable stills.",
          about: [
            "Void Card treats audio-like arcs as objects in space.",
            "The set was designed to work as both wallpaper and campaign asset."
          ]
        }),
        project({
          id: "fold-drop",
          title: "Fold Drop",
          discipline: "Type / Social",
          year: 2026,
          image: img.neon,
          summary: "Folded type structures announced as a limited drop.",
          about: [
            "Fold Drop is a teaser sequence for a type-led product.",
            "Folds catch orange edge light as if the letterforms were metal."
          ]
        }),
        project({
          id: "threshold-post",
          title: "Threshold Post",
          discipline: "Cinematic Still",
          year: 2025,
          image: img.threshold,
          summary: "A glowing doorway cropped for a high-impact feed moment.",
          about: [
            "One interior, one light, no extra graphic.",
            "The doorway is the call to action."
          ]
        })
      ]
    },
    {
      id: "posters",
      name: "Posters",
      cover: img.chaos,
      projects: [
        project({
          id: "chaos-theory",
          title: "Chaos Theory",
          discipline: "Poster / Typography",
          year: 2026,
          image: img.chaos,
          summary: "Experimental typography colliding order with noise.",
          about: [
            "Chaos Theory is a large-format poster that treats type as wreckage and architecture at once.",
            "Letterforms stack, shear and burn while a single orange axis holds the composition together."
          ],
          objective: "Design a print piece that still feels like motion when it is hanging still.",
          duration: "Print / 00:20 Motion",
          tools: ["Illustrator", "Photoshop", "After Effects"],
          deliverables: ["A1 Poster", "A3 Variant", "Motion Teaser", "Social Crops"],
          process: [
            "Concept Sketches",
            "Type Construction",
            "Texture & Print Tests",
            "Color Separation",
            "Motion Extension"
          ]
        }),
        project({
          id: "interval-poster",
          title: "Interval",
          discipline: "Editorial Poster",
          year: 2024,
          image: img.interval,
          summary: "Vertical letter rhythm for an editorial poster series.",
          about: [
            "Interval is a six-sheet series about waiting.",
            "Columns of type act like a score — pauses are as designed as the marks."
          ],
          tools: ["InDesign", "Photoshop"]
        }),
        project({
          id: "static-bloom",
          title: "Static Bloom",
          discipline: "Poster Study",
          year: 2023,
          image: img.bloom,
          summary: "Interrupted vertical bars for a gallery announcement.",
          about: [
            "A poster that looks like a signal failing in public.",
            "The bloom is the only moment of warmth."
          ]
        }),
        project({
          id: "burn-grid-poster",
          title: "Burn Grid",
          discipline: "Campaign Poster",
          year: 2022,
          image: img.burn,
          summary: "Grid posters with scorched orange interruptions.",
          about: [
            "A modular poster family for a season of events.",
            "The grid stays strict so the burn can feel accidental."
          ]
        }),
        project({
          id: "momentum-sheet",
          title: "Momentum",
          discipline: "Type Poster",
          year: 2026,
          image: img.momentum,
          summary: "Large-scale type driven by directional motion.",
          about: [
            "Momentum is a poster that should feel like it is still moving.",
            "Letterspacing and shear were animated first, then frozen for print."
          ]
        }),
        project({
          id: "mono-flare-print",
          title: "Mono Flare",
          discipline: "Typography Poster",
          year: 2024,
          image: img.flare,
          summary: "Monochrome type hit by a single flare accent.",
          about: [
            "A severe type poster with one photographic accident.",
            "The flare is printed as a spot orange, not a photograph."
          ]
        }),
        project({
          id: "echo-sheet",
          title: "Echo Form",
          discipline: "Figure Poster",
          year: 2023,
          image: img.echo,
          summary: "Repeated silhouettes suggesting delayed motion.",
          about: [
            "The figure is printed five times, each pass slightly late.",
            "It reads as a poster and as a motion diagram."
          ]
        }),
        project({
          id: "neon-fold-print",
          title: "Neon Fold",
          discipline: "3D Type Poster",
          year: 2026,
          image: img.neon,
          summary: "Folded type structures with orange edge light.",
          about: [
            "Type modeled as sheet metal, then lit like a product.",
            "The print is a still from a longer title sequence."
          ]
        }),
        project({
          id: "phase-cut-print",
          title: "Phase Cut",
          discipline: "Diagram Poster",
          year: 2026,
          image: img.phase,
          summary: "Frame-cut motion diagrams across a wide format.",
          about: [
            "A poster that explains a cut without using words.",
            "Used as a key art for a workshop on editing."
          ]
        }),
        project({
          id: "dark-current",
          title: "Dark Current",
          discipline: "Abstract Poster",
          year: 2023,
          image: img.g4,
          summary: "Flowing dark shapes with a single orange undercurrent.",
          about: [
            "An abstract print for a listening event.",
            "The current is the only directional cue."
          ]
        }),
        project({
          id: "vector-bill",
          title: "Vector Heat",
          discipline: "Event Poster",
          year: 2025,
          image: img.heat,
          summary: "Radial heat maps over dark sculptural rings.",
          about: [
            "A night-market poster that has to work from across a street.",
            "The ring is the logo; the heat is the date."
          ]
        }),
        project({
          id: "unseen-print",
          title: "Unseen",
          discipline: "Portrait Poster",
          year: 2025,
          image: img.unseen,
          summary: "A cinematic portrait interrupted by a single orange gesture.",
          about: [
            "Key art for a short film about withheld identity.",
            "The gesture is hand-painted over a 3D grade."
          ]
        })
      ]
    },
    {
      id: "movies",
      name: "Movies",
      cover: img.echoes,
      projects: [
        project({
          id: "echoes",
          title: "Echoes",
          discipline: "Brand Film / Motion Direction",
          year: 2026,
          image: img.echoes,
          summary:
            "A cinematic brand film exploring the connection between sound, motion and emotion.",
          about: [
            "Echoes follows a signal through mountain ridges and neon weather. The camera never hurries; the light does the talking.",
            "Sound design led the picture cut. Peaks in the score trigger camera rolls, lens flares and the orange horizon line."
          ],
          objective: "Direct a brand film that feels like a place, not a product demo.",
          duration: "02:18 Minutes",
          tools: ["Cinema 4D", "After Effects", "Premiere Pro", "Octane Render"],
          deliverables: ["Main Film", "60s Cutdown", "15s Bumper", "Still Frames"],
          process: [
            "Treatment & Boards",
            "World Build",
            "Camera Layout",
            "Look Development",
            "Edit & Sound",
            "Color"
          ]
        }),
        project({
          id: "fluidity-film",
          title: "Fluidity",
          discipline: "Motion Design",
          year: 2025,
          image: img.fluidity,
          summary: "An abstract nebula piece about materials that refuse to settle.",
          about: [
            "Fluidity is a material ballet — smoke, metal and light trading identities.",
            "It was designed as a mid-film interstitial for a luxury campaign."
          ],
          duration: "00:40 Seconds"
        }),
        project({
          id: "kinetic-type",
          title: "Kinetic Type",
          discipline: "Title Design",
          year: 2025,
          image: img.kinetic,
          summary: "High-contrast titles for a feature documentary.",
          about: [
            "The titles are the first character in the film.",
            "Weight, tracking and impact are timed to archival tape hiss."
          ],
          duration: "01:12 Minutes",
          tools: ["After Effects", "Illustrator", "Premiere Pro"]
        }),
        project({
          id: "cinematic-gate",
          title: "The Gate",
          discipline: "Opening Sequence",
          year: 2026,
          image: img.cinematic,
          summary: "A lone figure walking toward a neon portal — the film's first breath.",
          about: [
            "The Gate is a cold open designed to be silent for eight seconds.",
            "Then the portal ignites and the score arrives all at once."
          ],
          duration: "00:32 Seconds"
        }),
        project({
          id: "threshold-reel",
          title: "Threshold",
          discipline: "Short Film Still",
          year: 2025,
          image: img.threshold,
          summary: "A dark interior opened by a glowing doorway.",
          about: [
            "A narrative beat extended into a standalone atmospheric piece.",
            "Used as both a film still and a teaser loop."
          ]
        }),
        project({
          id: "phase-edit",
          title: "Phase Cut",
          discipline: "Edit Study",
          year: 2026,
          image: img.phase,
          summary: "A visual essay on cutting on action across wide formats.",
          about: [
            "Phase Cut is a teaching film and a show piece.",
            "Every splice is drawn on screen before it happens."
          ],
          duration: "01:05 Minutes"
        }),
        project({
          id: "void-score",
          title: "Void Signal",
          discipline: "Music Film",
          year: 2025,
          image: img.voidSignal,
          summary: "Waveform arcs drifting through empty space for a single release.",
          about: [
            "The picture is the instrument.",
            "Arcs thicken on the kick and dissolve on the decay."
          ],
          duration: "03:04 Minutes"
        }),
        project({
          id: "orbital-title",
          title: "Orbital Silence",
          discipline: "Main on End",
          year: 2024,
          image: img.orbital,
          summary: "Astronomical stillness with a single orange crescent.",
          about: [
            "End titles that refuse to hurry.",
            "The crescent is the only moving object for forty seconds."
          ]
        }),
        project({
          id: "echo-delay",
          title: "Delay",
          discipline: "Performance Film",
          year: 2023,
          image: img.echo,
          summary: "Repeated silhouettes suggesting delayed motion.",
          about: [
            "A dancer filmed once, printed many times.",
            "The delay is the choreography."
          ],
          duration: "00:55 Seconds"
        }),
        project({
          id: "liquid-seq",
          title: "Liquid Frequency",
          discipline: "Brand Interstitial",
          year: 2026,
          image: img.liquid,
          summary: "Fluid forms, light and motion as a mid-roll signature.",
          about: [
            "A 12-second ident that can live inside longer films.",
            "The liquid is simulated, then re-lit as if it were chrome."
          ],
          duration: "00:12 Seconds"
        }),
        project({
          id: "prism-cut",
          title: "Dark Prism",
          discipline: "Trailer Graphic",
          year: 2024,
          image: img.prism,
          summary: "Refracted bands cutting through void space.",
          about: [
            "Trailer graphics that feel physical, not UI.",
            "Bands of light wipe titles on and off."
          ]
        }),
        project({
          id: "hero-core",
          title: "Core",
          discipline: "Concept Film",
          year: 2026,
          image: img.hero,
          summary: "A mechanical sphere revealing an orange heart of light.",
          about: [
            "A sister sequence to Orbital Shift, cut for a darker grade.",
            "Built to play as a looping installation."
          ],
          duration: "01:00 Loop"
        })
      ]
    },
    {
      id: "digital-art",
      name: "Digital Art",
      cover: img.liquid,
      projects: [
        project({
          id: "liquid-art",
          title: "Liquid Frequency",
          discipline: "Digital Art",
          year: 2026,
          image: img.liquid,
          summary: "An exploration of fluid forms, light and motion.",
          about: [
            "Liquid Frequency is a still that behaves like a loop.",
            "The surface is simulated, then painted with light until it feels handmade."
          ],
          duration: "Still / 00:20 Loop",
          tools: ["Blender", "After Effects", "Photoshop"],
          deliverables: ["Hero Still", "4K Loop", "Print File", "Detail Crops"]
        }),
        project({
          id: "orbital-art",
          title: "Orbital Silence",
          discipline: "Digital Art",
          year: 2024,
          image: img.orbital,
          summary: "Astronomical stillness with a single orange crescent.",
          about: [
            "A quiet piece about scale.",
            "The crescent is the only warm object in a cold field."
          ]
        }),
        project({
          id: "unseen-art",
          title: "Unseen",
          discipline: "Digital Art",
          year: 2025,
          image: img.unseen,
          summary: "A cinematic portrait interrupted by a single orange gesture.",
          about: [
            "Portraiture without a full face.",
            "The gesture is both censorship and signature."
          ]
        }),
        project({
          id: "glass-art",
          title: "Glass Noise",
          discipline: "Optical Art",
          year: 2024,
          image: img.glass,
          summary: "Concentric interference patterns and optical tension.",
          about: [
            "Glass Noise is about looking until the eye gives up.",
            "The rings are 3D, the grain is photographic."
          ]
        }),
        project({
          id: "rift-art",
          title: "Rift Study",
          discipline: "Digital Art",
          year: 2025,
          image: img.rift,
          summary: "Circular rupture studies with orange rim light.",
          about: [
            "A family of ruptures, each lit as if from a different sun.",
            "Made as a print series and a motion study."
          ]
        }),
        project({
          id: "cubic-art",
          title: "Cubic Light",
          discipline: "3D Art",
          year: 2025,
          image: img.cubic,
          summary: "Geometric volumes illuminated by orange facets.",
          about: [
            "Hard geometry, soft light.",
            "The cube is a stage for a single bouncing highlight."
          ]
        }),
        project({
          id: "pulse-art",
          title: "Pulse",
          discipline: "Circular Composition",
          year: 2025,
          image: img.pulse,
          summary: "Circular mechanics and orbiting energy studies.",
          about: [
            "Pulse is a machine that never quite completes a rotation.",
            "The incompletion is the subject."
          ]
        }),
        project({
          id: "silent-arc-art",
          title: "Silent Arc",
          discipline: "Sculpture Study",
          year: 2023,
          image: img.arc,
          summary: "Quiet orbital geometry suspended in black.",
          about: [
            "A digital sculpture made to feel museum-still.",
            "No particles, no extra light — only form."
          ]
        }),
        project({
          id: "vector-art",
          title: "Vector Heat",
          discipline: "Digital Art",
          year: 2025,
          image: img.heat,
          summary: "Radial heat maps over dark sculptural rings.",
          about: [
            "Data that is not data.",
            "The heat map is a feeling, not a chart."
          ]
        }),
        project({
          id: "g5-orbit",
          title: "Orbit",
          discipline: "Circular Composition",
          year: 2026,
          image: img.g5,
          summary: "Neon composition with orbiting points of light.",
          about: [
            "A personal study that later became a client language.",
            "Points of light behave like a score."
          ]
        }),
        project({
          id: "g3-threshold",
          title: "Portal Walk",
          discipline: "Digital Art",
          year: 2025,
          image: img.g3,
          summary: "A silhouette walking into stacked neon portals.",
          about: [
            "Figure as scale reference, not character.",
            "The portals are the architecture."
          ]
        }),
        project({
          id: "hero-art",
          title: "Living Core",
          discipline: "3D Art",
          year: 2026,
          image: img.hero,
          summary: "A fragmenting sphere with a brilliant orange interior.",
          about: [
            "The core is always brighter than the shell.",
            "A still from a longer destruction sequence."
          ]
        })
      ]
    },
    {
      id: "experimental",
      name: "Experimental",
      cover: img.flow,
      projects: [
        project({
          id: "flow-state",
          title: "Flow State",
          discipline: "Experimental",
          year: 2024,
          image: img.flow,
          summary: "Abstract line fields mapping continuous motion.",
          about: [
            "Flow State is a drawing made by a simulation.",
            "Thousands of lines were allowed to find a path, then frozen."
          ],
          objective: "Find a visual that feels generated and authored at the same time.",
          duration: "00:30 Loop",
          tools: ["Processing", "After Effects", "Photoshop"],
          process: [
            "Rule Setting",
            "Simulation",
            "Culling & Crop",
            "Grade",
            "Loop Design"
          ]
        }),
        project({
          id: "dark-prism-x",
          title: "Dark Prism",
          discipline: "Experimental",
          year: 2024,
          image: img.prism,
          summary: "Refracted bands cutting through void space.",
          about: [
            "Light treated as a solid that can be sliced.",
            "The bands were rendered, then optically re-photographed."
          ]
        }),
        project({
          id: "amber-x",
          title: "Amber Rift",
          discipline: "Experimental",
          year: 2023,
          image: img.amber,
          summary: "Vertical ruptures of heat against black fields.",
          about: [
            "A material experiment that became a brand cue.",
            "Heat is painted, not keyed."
          ]
        }),
        project({
          id: "g2-pulse",
          title: "Pulse Fields",
          discipline: "Motion Study",
          year: 2024,
          image: img.g2,
          summary: "Black and white experimental motion patterns.",
          about: [
            "No color until the last eight frames.",
            "A study in withholding the accent."
          ]
        }),
        project({
          id: "echo-x",
          title: "Afterimage",
          discipline: "Experimental",
          year: 2023,
          image: img.echo,
          summary: "Silhouettes stacked until they become a texture.",
          about: [
            "How many copies until a figure is a field?",
            "The answer was seventeen."
          ]
        }),
        project({
          id: "glass-x",
          title: "Interference",
          discipline: "Optical Experiment",
          year: 2024,
          image: img.glass,
          summary: "Interference pushed past comfort.",
          about: [
            "A test of how long a viewer will stay with a vibrating still.",
            "The loop is 6 seconds and feels longer."
          ],
          duration: "00:06 Loop"
        }),
        project({
          id: "phase-x",
          title: "Frame Error",
          discipline: "Edit Experiment",
          year: 2026,
          image: img.phase,
          summary: "Deliberate mis-cuts as a graphic language.",
          about: [
            "Mistakes, kept.",
            "The error is the composition."
          ]
        }),
        project({
          id: "vector-x",
          title: "Heat II",
          discipline: "Experimental",
          year: 2022,
          image: img.heat,
          summary: "Secondary heat-map experiment from the same series.",
          about: [
            "A rougher, louder sibling of Vector Heat.",
            "Made to fail in interesting ways."
          ]
        }),
        project({
          id: "g4-current",
          title: "Undertow",
          discipline: "Abstract Form",
          year: 2023,
          image: img.g4,
          summary: "Dark currents with an orange undertow.",
          about: [
            "Painted in 3D, then blurred like a memory.",
            "The undertow is the only sharp edge."
          ]
        }),
        project({
          id: "void-x",
          title: "Drift",
          discipline: "Motion Study",
          year: 2025,
          image: img.voidSignal,
          summary: "Arcs that refuse to resolve into a logo.",
          about: [
            "A study in almost-branding.",
            "The form never quite closes."
          ]
        }),
        project({
          id: "cubic-x",
          title: "Facet Error",
          discipline: "3D Experiment",
          year: 2025,
          image: img.cubic,
          summary: "Geometry with lighting that should not work — and does.",
          about: [
            "Wrong lights, kept.",
            "The cube becomes a lantern."
          ]
        }),
        project({
          id: "hero-x",
          title: "Shatter Study",
          discipline: "Destruction Test",
          year: 2026,
          image: img.hero,
          summary: "A sphere mid-break, held longer than is comfortable.",
          about: [
            "The hold is the experiment.",
            "Most destruction work cuts too soon."
          ],
          duration: "00:20 Hold"
        })
      ]
    }
  ];
})();
