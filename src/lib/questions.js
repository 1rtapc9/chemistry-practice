// src/lib/questions.js
// Local question bank (mode -> grade -> array of question objects).
// Each object: { prompt, canonicalAnswer, acceptedAnswers, explanation, remediation }

const QUESTIONS = {
  acid: {
    6: [
      {
        prompt: "Name HCl (aqueous).",
        canonicalAnswer: "hydrochloric acid",
        acceptedAnswers: ["hydrochloric acid", "hydrogen chloride (aqueous)"],
        explanation: "Binary acid: 'hydro-' + root of anion + '-ic acid' gives hydrochloric acid.",
        remediation: "For binary acids, use hydro- + ion base + -ic acid (e.g., HCl → hydrochloric acid)."
      },
      {
        prompt: "Name HBr (aq).",
        canonicalAnswer: "hydrobromic acid",
        acceptedAnswers: ["hydrobromic acid", "hydrogen bromide (aqueous)"],
        explanation: "HBr in water is hydrobromic acid (binary acid name pattern).",
        remediation: "Binary acid naming: hydro- + brom- + -ic acid."
      },
      {
        prompt: "Name HI (aq).",
        canonicalAnswer: "hydroiodic acid",
        acceptedAnswers: ["hydroiodic acid", "hydrogen iodide (aqueous)"],
        explanation: "Hydrogen + iodide in water becomes hydroiodic acid.",
        remediation: "Remember binary acids with halogens follow the hydro-...-ic rule."
      }
    ],
    7: [
      {
        prompt: "Name H2SO4 (aqueous).",
        canonicalAnswer: "sulfuric acid",
        acceptedAnswers: ["sulfuric acid", "sulphuric acid"],
        explanation: "H2SO4 is the oxyacid sulfuric acid (anion SO4^2- → sulfate → -ic acid).",
        remediation: "For oxyacids, -ate → -ic acid (sulfate → sulfuric acid)."
      },
      {
        prompt: "Name HNO3 (aq).",
        canonicalAnswer: "nitric acid",
        acceptedAnswers: ["nitric acid"],
        explanation: "HNO3 contains the nitrate ion (NO3^-); nitrate corresponds to nitric acid.",
        remediation: "Recall: -ate → -ic (nitrate → nitric acid)."
      },
      {
        prompt: "Name H2CO3 (aq).",
        canonicalAnswer: "carbonic acid",
        acceptedAnswers: ["carbonic acid"],
        explanation: "H2CO3 is carbonic acid, formed from CO2 dissolved in water.",
        remediation: "Think of CO2 + H2O producing carbonic acid."
      }
    ],
    8: [
      {
        prompt: "Name H3PO4 (aqueous).",
        canonicalAnswer: "phosphoric acid",
        acceptedAnswers: ["phosphoric acid"],
        explanation: "H3PO4 is phosphoric acid; phosphate (PO4^3-) corresponds to phosphoric acid.",
        remediation: "Oxyacid rule: phosphate (PO4^3-) → phosphoric acid (H3PO4)."
      },
      {
        prompt: "Name HClO (hypochlorous acid).",
        canonicalAnswer: "hypochlorous acid",
        acceptedAnswers: ["hypochlorous acid", "chlorous acid (no)", "hypochlorous"],
        explanation: "HClO is hypochlorous acid (hypo- indicates one fewer oxygen than chlorous/chloric acids).",
        remediation: "Memorize the hypo- / -ous / -ic pattern for chlorine oxyacids."
      },
      {
        prompt: "Name HClO4 (aq).",
        canonicalAnswer: "perchloric acid",
        acceptedAnswers: ["perchloric acid"],
        explanation: "HClO4 is perchloric acid — 'per-' indicates the most oxygenated oxyacid.",
        remediation: "Perchlorate → perchloric acid; remember the oxygen ordering."
      }
    ],
    9: [
      {
        prompt: "Name CH3COOH (aqueous).",
        canonicalAnswer: "acetic acid",
        acceptedAnswers: ["acetic acid", "ethanoic acid"],
        explanation: "CH3COOH is the organic carboxylic acid acetic (ethanoic) acid.",
        remediation: "Carboxylic acids often end in -oic acid (e.g., ethanoic = acetic)."
      },
      {
        prompt: "Name H2S (aq, weak acid).",
        canonicalAnswer: "hydrosulfuric acid",
        acceptedAnswers: ["hydrosulfuric acid", "hydrogen sulfide (aqueous)"],
        explanation: "H2S in water can act as a weak acid (hydrosulfuric).",
        remediation: "For H2 plus a nonmetal, use 'hydro-' + base + '-ic' when aqueous binary acid."
      },
      {
        prompt: "Name HCN (aq).",
        canonicalAnswer: "hydrocyanic acid",
        acceptedAnswers: ["hydrocyanic acid", "hydrogen cyanide (aqueous)"],
        explanation: "HCN in water is hydrocyanic acid; cyanide is the anion CN^-.",
        remediation: "Binary acids with polyatomic anions still follow hydro-...-ic if not oxyacids."
      }
    ],
    10: [
      {
        prompt: "Name H2SO3 (aq).",
        canonicalAnswer: "sulfurous acid",
        acceptedAnswers: ["sulfurous acid", "sulphurous acid"],
        explanation: "H2SO3 corresponds to sulfite (SO3^2-) → sulfurous acid (-ous = fewer oxygens).",
        remediation: "Remember: -ite → -ous acid; -ate → -ic acid."
      },
      {
        prompt: "Name HNO2 (aq).",
        canonicalAnswer: "nitrous acid",
        acceptedAnswers: ["nitrous acid"],
        explanation: "HNO2 is nitrous acid (from nitrite NO2^-).",
        remediation: "Practice the -ite/-ous and -ate/-ic conversions for oxyacids."
      },
      {
        prompt: "Name oxalic acid (formula: C2H2O4).",
        canonicalAnswer: "oxalic acid",
        acceptedAnswers: ["oxalic acid"],
        explanation: "C2H2O4 is oxalic acid, a dicarboxylic organic acid.",
        remediation: "Many dicarboxylic acids are named with common names (oxalic, malonic, succinic)."
      }
    ],
    11: [
      {
        prompt: "Name C6H5COOH (benzoic acid).",
        canonicalAnswer: "benzoic acid",
        acceptedAnswers: ["benzoic acid"],
        explanation: "C6H5COOH is benzoic acid, an aromatic carboxylic acid.",
        remediation: "For aromatic acids, common names (benzoic) are often used alongside IUPAC."
      },
      {
        prompt: "Name CH3CH2COOH (propionic acid).",
        canonicalAnswer: "propionic acid",
        acceptedAnswers: ["propionic acid", "propanoic acid"],
        explanation: "CH3CH2COOH is propionic (propanoic) acid — a three-carbon carboxylic acid.",
        remediation: "Carboxylic acids: count carbons and use -oic ending for IUPAC names."
      },
      {
        prompt: "Name HSO4- as an acid in water (what acid species is formed?).",
        canonicalAnswer: "sulfuric acid (bisulfate is HSO4-; protonation gives H2SO4)",
        acceptedAnswers: ["sulfuric acid", "bisulfate protonates to sulfuric acid"],
        explanation: "HSO4^- is the bisulfate ion; adding a proton gives H2SO4 (sulfuric acid).",
        remediation: "Understand polyprotic species and their conjugate acids/bases."
      }
    ],
    12: [
      {
        prompt: "Name (CH3)2CHCOOH (isobutyric acid).",
        canonicalAnswer: "isobutyric acid",
        acceptedAnswers: ["isobutyric acid", "2-methylpropanoic acid"],
        explanation: "(CH3)2CHCOOH is the branched four-carbon carboxylic acid isobutyric.",
        remediation: "Practice IUPAC naming for branched carboxylic acids (number the main chain)."
      },
      {
        prompt: "Name HOOC-CH=CH-COOH (maleic acid) and indicate cis/trans isomer.",
        canonicalAnswer: "maleic acid (cis) / fumaric acid is trans",
        acceptedAnswers: ["maleic acid", "maleic (cis) acid"],
        explanation: "HOOC-CH=CH-COOH with cis configuration is maleic acid (trans is fumaric).",
        remediation: "Cis/trans orientation changes properties — name accordingly (maleic = cis)."
      },
      {
        prompt: "Name CH3COO- (conjugate base) as an acid (give the acid name).",
        canonicalAnswer: "acetic acid",
        acceptedAnswers: ["acetic acid", "ethanoic acid"],
        explanation: "CH3COO^- is the acetate ion; adding a proton gives acetic acid (CH3COOH).",
        remediation: "Identify conjugate acid/base pairs: acetate ↔ acetic acid."
      }
    ]
  },

  skeleton: {
    6: [
      {
        prompt: "Solid sodium reacts with water — write a skeleton.",
        canonicalAnswer: "2 Na(s) + 2 H2O(l) -> 2 NaOH(aq) + H2(g)",
        acceptedAnswers: ["2 na + 2 h2o -> 2 naoh + h2", "na + h2o -> naoh + h2"],
        explanation: "Alkali metals react with water to form hydroxide and hydrogen gas.",
        remediation: "Remember single-displacement and that group 1 metals produce hydroxides + H2."
      },
      {
        prompt: "Calcium metal reacts with water — skeleton (not balanced is ok).",
        canonicalAnswer: "Ca(s) + 2 H2O(l) -> Ca(OH)2(aq) + H2(g)",
        acceptedAnswers: ["ca + h2o -> ca(oh)2 + h2"],
        explanation: "Calcium gives Ca(OH)2 and hydrogen gas when reacting with water.",
        remediation: "Balance metals with water to form metal hydroxide and hydrogen gas."
      },
      {
        prompt: "Hydrogen gas burns in oxygen — skeleton.",
        canonicalAnswer: "2 H2(g) + O2(g) -> 2 H2O(l)",
        acceptedAnswers: ["2 h2 + o2 -> 2 h2o", "h2 + o2 -> h2o"],
        explanation: "Combustion of hydrogen produces water.",
        remediation: "Combustion of hydrogen/ hydrocarbons produce H2O and sometimes CO2."
      }
    ],
    7: [
      {
        prompt: "Magnesium reacts with hydrochloric acid — skeleton.",
        canonicalAnswer: "Mg(s) + 2 HCl(aq) -> MgCl2(aq) + H2(g)",
        acceptedAnswers: ["mg + 2 hcl -> mgcl2 + h2"],
        explanation: "Magnesium displaces hydrogen from HCl producing MgCl2 and H2.",
        remediation: "Metals above hydrogen in reactivity series will displace H from acids."
      },
      {
        prompt: "Zinc reacts with copper(II) sulfate — skeleton.",
        canonicalAnswer: "Zn(s) + CuSO4(aq) -> ZnSO4(aq) + Cu(s)",
        acceptedAnswers: ["zn + cuso4 -> znso4 + cu"],
        explanation: "Zinc replaces copper in solution (single-displacement).",
        remediation: "Check reactivity series to predict single displacement."
      },
      {
        prompt: "Combustion of methane — skeleton.",
        canonicalAnswer: "CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(l)",
        acceptedAnswers: ["ch4 + 2 o2 -> co2 + 2 h2o"],
        explanation: "Complete combustion of methane yields carbon dioxide and water.",
        remediation: "Balance C,H,O atoms in combustion reactions."
      }
    ],
    8: [
      {
        prompt: "Silver nitrate reacts with sodium chloride — skeleton.",
        canonicalAnswer: "AgNO3(aq) + NaCl(aq) -> AgCl(s) + NaNO3(aq)",
        acceptedAnswers: ["agno3 + nacl -> agcl + nano3"],
        explanation: "Double-displacement producing a precipitate (AgCl).",
        remediation: "Identify spectator ions and the precipitate in double displacement."
      },
      {
        prompt: "Decomposition of hydrogen peroxide — skeleton.",
        canonicalAnswer: "2 H2O2(aq) -> 2 H2O(l) + O2(g)",
        acceptedAnswers: ["2 h2o2 -> 2 h2o + o2"],
        explanation: "Hydrogen peroxide decomposes into water and oxygen gas.",
        remediation: "Remember common decomposition patterns like H2O2 -> H2O + O2."
      },
      {
        prompt: "Formation of carbonic acid from CO2 and water — skeleton.",
        canonicalAnswer: "CO2(g) + H2O(l) -> H2CO3(aq)",
        acceptedAnswers: ["co2 + h2o -> h2co3"],
        explanation: "CO2 dissolves in water to form carbonic acid.",
        remediation: "Show reactants forming the acid; balance if needed for larger equations."
      }
    ],
    9: [
      {
        prompt: "Chromium redox: Fe2+ oxidized by MnO4- in acidic solution — skeleton.",
        canonicalAnswer: "5 Fe2+ + MnO4- + 8 H+ -> 5 Fe3+ + Mn2+ + 4 H2O",
        acceptedAnswers: ["5 fe2 + mno4 + 8 h -> 5 fe3 + mn2 + 4 h2o"],
        explanation: "Permanganate in acidic solution oxidizes Fe2+ to Fe3+; balanced redox skeleton shown.",
        remediation: "Use half-reaction method for complex redox balancing."
      },
      {
        prompt: "Synthesis of ammonia from nitrogen and hydrogen — skeleton.",
        canonicalAnswer: "N2(g) + 3 H2(g) -> 2 NH3(g)",
        acceptedAnswers: ["n2 + 3 h2 -> 2 nh3"],
        explanation: "Haber process skeleton for ammonia formation.",
        remediation: "Balance atoms and be mindful of diatomic molecules (N2, H2, O2)."
      },
      {
        prompt: "Neutralization: sodium hydroxide reacts with hydrochloric acid — skeleton.",
        canonicalAnswer: "NaOH(aq) + HCl(aq) -> NaCl(aq) + H2O(l)",
        acceptedAnswers: ["naoh + hcl -> nacl + h2o"],
        explanation: "Acid-base neutralization produces salt and water.",
        remediation: "Match H+ and OH- to form H2O and combine remaining ions to form salt."
      }
    ],
    10: [
      {
        prompt: "Formation of a precipitate: lead(II) nitrate + potassium iodide — skeleton.",
        canonicalAnswer: "Pb(NO3)2(aq) + 2 KI(aq) -> PbI2(s) + 2 KNO3(aq)",
        acceptedAnswers: ["pb(no3)2 + 2 ki -> pbi2 + 2 kno3"],
        explanation: "Double-displacement yielding insoluble PbI2 precipitate.",
        remediation: "Check solubility rules to predict precipitates."
      },
      {
        prompt: "Saponification (generic): ester + base -> alcohol + carboxylate — skeleton.",
        canonicalAnswer: "RCOOR' + OH- -> RCOO- + R'OH",
        acceptedAnswers: ["rcoor + oh -> rcoo + roh", "ester + base -> alcohol + carboxylate"],
        explanation: "Ester hydrolysis under basic conditions yields alcohol + carboxylate salt.",
        remediation: "Focus on bond cleavage at the ester oxygen for saponification."
      },
      {
        prompt: "Thermal decomposition of calcium carbonate — skeleton.",
        canonicalAnswer: "CaCO3(s) -> CaO(s) + CO2(g)",
        acceptedAnswers: ["caco3 -> cao + co2"],
        explanation: "Calcium carbonate decomposes on heating to lime (CaO) and CO2.",
        remediation: "Identify common decomposition reactions for carbonates."
      }
    ],
    11: [
      {
        prompt: "Redox: balancing combustion with limiting oxygen (skeleton) — example for C3H8.",
        canonicalAnswer: "C3H8 + 5 O2 -> 3 CO2 + 4 H2O",
        acceptedAnswers: ["c3h8 + 5 o2 -> 3 co2 + 4 h2o"],
        explanation: "Propane combustion balanced into CO2 and H2O.",
        remediation: "Balance carbons then hydrogens, then oxygen last."
      },
      {
        prompt: "Complex ion formation (skeleton): Cu2+ reacts with NH3 to form [Cu(NH3)4]2+",
        canonicalAnswer: "Cu2+ + 4 NH3 -> [Cu(NH3)4]2+",
        acceptedAnswers: ["cu2 + 4 nh3 -> [cu(nh3)4]2+"],
        explanation: "Ammonia acts as a ligand forming a coordination complex with Cu2+.",
        remediation: "Remember ligands coordinate to metal ions forming complex ions."
      },
      {
        prompt: "Acid-base titration skeleton: acetic acid with sodium hydroxide (net ionic style).",
        canonicalAnswer: "CH3COOH + OH- -> CH3COO- + H2O",
        acceptedAnswers: ["ch3cooh + oh -> ch3coo + h2o"],
        explanation: "Net ionic equation for neutralization of acetic acid by OH-.",
        remediation: "Net ionic equations omit spectator ions (e.g., Na+, Cl-)."
      }
    ],
    12: [
      {
        prompt: "Redox + acid: permanganate oxidizes oxalate in acidic solution — skeleton.",
        canonicalAnswer: "2 MnO4- + 5 C2O4^2- + 16 H+ -> 2 Mn2+ + 10 CO2 + 8 H2O",
        acceptedAnswers: ["2 mno4 + 5 c2o4 + 16 h -> 2 mn2 + 10 co2 + 8 h2o"],
        explanation: "Balanced acidic redox: permanganate oxidizes oxalate to CO2.",
        remediation: "Use half-reactions and balance electrons for such redox cases."
      },
      {
        prompt: "Esterification (skeleton): carboxylic acid + alcohol -> ester + water.",
        canonicalAnswer: "RCOOH + R'OH -> RCOOR' + H2O",
        acceptedAnswers: ["rcooh + r'oh -> rcoor' + h2o"],
        explanation: "Acid-catalyzed esterification yields ester and water.",
        remediation: "Show the condensation step; catalysts don't appear in skeleton if optional."
      },
      {
        prompt: "Balancing combustion of methylbenzene (toluene) — skeleton (C7H8).",
        canonicalAnswer: "2 C7H8 + 21 O2 -> 14 CO2 + 8 H2O",
        acceptedAnswers: ["2 c7h8 + 21 o2 -> 14 co2 + 8 h2o"],
        explanation: "Toluene combustion produces CO2 and H2O; balance carefully for large hydrocarbons.",
        remediation: "Balance carbons first, hydrogens second, oxygens last; multiply if needed to avoid fractions."
      }
    ]
  }
};

export default QUESTIONS;
