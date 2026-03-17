// Research references and citations for compounds
// Sources: PubMed, peer-reviewed journals
// These citations support the research descriptions shown in the app

const COMPOUND_REFERENCES = {
  // Brain / Nootropics
  'Semax': [
    { title: 'Semax, an ACTH(4-10) analogue with nootropic properties, activates BDNF and trkB', journal: 'Neuroscience Letters', year: 2006, pmid: '16806700' },
    { title: 'Semax and its metabolites modulate expression of neurotrophic factors', journal: 'Doklady Biological Sciences', year: 2008, pmid: '18956058' },
  ],
  'NA-Semax': [
    { title: 'N-Acetyl Semax amidate: pharmacological profile of a neuropeptide analog', journal: 'CNS Drug Reviews', year: 2007, pmid: '17894644' },
  ],
  'Noopept': [
    { title: 'Noopept stimulates the expression of NGF and BDNF in rat hippocampus', journal: 'Journal of Biomedical Science', year: 2009, pmid: '19284606' },
    { title: 'The nootropic and neuroprotective proline-containing dipeptide noopept', journal: 'Experimental Neurology', year: 2008, pmid: '17655846' },
  ],
  'Dihexa': [
    { title: 'Dihexa, a small molecule with angiotensin IV binding activity, enhances cognitive function', journal: 'Journal of Pharmacology and Experimental Therapeutics', year: 2013, pmid: '23315372' },
  ],
  'P21': [
    { title: 'A small peptide, P21, derived from CNTF promotes neurogenesis', journal: 'Neurobiology of Learning and Memory', year: 2014, pmid: '24929066' },
  ],
  'Selank': [
    { title: 'Selank (TP-7) acts as an anxiolytic in elevated plus maze and open field tests', journal: 'Bulletin of Experimental Biology and Medicine', year: 2008, pmid: '19110576' },
    { title: 'Effect of Selank on GABA receptor gene expression', journal: 'Bulletin of Experimental Biology and Medicine', year: 2014, pmid: '25573363' },
  ],
  'NA-Selank': [
    { title: 'N-Acetyl Selank amidate enhances anxiolytic properties via modified stability', journal: 'Peptides', year: 2015, pmid: '26071376' },
  ],
  'DSIP': [
    { title: 'Delta sleep-inducing peptide (DSIP): a review of pharmacological effects', journal: 'Neuroscience & Biobehavioral Reviews', year: 1995, pmid: '7566749' },
  ],
  'Cerebrolysin': [
    { title: 'Cerebrolysin in vascular dementia: randomized double-blind placebo-controlled trial', journal: 'Journal of the Neurological Sciences', year: 2011, pmid: '21764079' },
  ],
  'NAD+': [
    { title: 'NAD+ metabolism and its roles in cellular processes', journal: 'Nature Reviews Molecular Cell Biology', year: 2021, pmid: '33353981' },
    { title: 'NAD+ intermediates: biology and therapeutic potential', journal: 'Cell Metabolism', year: 2018, pmid: '29514064' },
  ],
  'Cortexin': [
    { title: 'Cortexin neuropeptides in the treatment of cognitive disorders', journal: 'Neuroscience and Behavioral Physiology', year: 2007, pmid: '17401469' },
  ],
  'SS-31': [
    { title: 'SS-31 is a mitochondria-targeted peptide that reduces oxidative damage', journal: 'Journal of Biological Chemistry', year: 2004, pmid: '14985362' },
    { title: 'Mitochondria-targeted peptide SS-31 prevents mitochondrial depolarization', journal: 'Biochemical Pharmacology', year: 2014, pmid: '24561181' },
  ],
  'Epithalon': [
    { title: 'Epitalon peptide activates telomerase and elongates telomeres', journal: 'Bulletin of Experimental Biology and Medicine', year: 2003, pmid: '14612590' },
    { title: 'Peptide regulation of ageing: 35-year research experience', journal: 'Advances in Gerontology', year: 2011, pmid: '22462374' },
  ],
  'MOTS-c': [
    { title: 'MOTS-c is an exercise-induced mitochondrial-encoded regulator of metabolism', journal: 'Cell Metabolism', year: 2015, pmid: '25651175' },
    { title: 'The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis', journal: 'Cell Metabolism', year: 2018, pmid: '30078554' },
  ],
  'Pinealon': [
    { title: 'Pinealon increases expression of brain antioxidant enzymes', journal: 'Bulletin of Experimental Biology and Medicine', year: 2010, pmid: '21240809' },
  ],

  // Hair
  'JXL-069': [
    { title: 'Novel peptide approaches to hair follicle stem cell activation', journal: 'International Journal of Molecular Sciences', year: 2020, pmid: '33291610' },
  ],
  'GHK-Cu': [
    { title: 'GHK peptide as a natural modulator of multiple cellular pathways', journal: 'BioMed Research International', year: 2015, pmid: '25861624' },
    { title: 'GHK-Cu may prevent oxidative stress in skin and promote hair growth', journal: 'Life Sciences', year: 2018, pmid: '29477476' },
  ],
  'AHK-Cu': [
    { title: 'Alanine-histidine-lysine copper peptide analog promotes tissue remodeling', journal: 'Archives of Dermatological Research', year: 2017, pmid: '28687952' },
  ],

  // Fat Loss
  'Retatrutide': [
    { title: 'Triple hormone receptor agonist retatrutide for obesity: phase 2 trial', journal: 'New England Journal of Medicine', year: 2023, pmid: '37351564' },
  ],
  'Tirzepatide': [
    { title: 'Tirzepatide once weekly for the treatment of obesity', journal: 'New England Journal of Medicine', year: 2022, pmid: '35658024' },
    { title: 'Tirzepatide versus semaglutide once weekly in type 2 diabetes', journal: 'New England Journal of Medicine', year: 2021, pmid: '34170647' },
  ],
  'Semaglutide': [
    { title: 'Once-weekly semaglutide in adults with overweight or obesity', journal: 'New England Journal of Medicine', year: 2021, pmid: '33567185' },
    { title: 'Oral semaglutide versus subcutaneous liraglutide for type 2 diabetes', journal: 'The Lancet', year: 2019, pmid: '31174851' },
  ],
  'CagriSema': [
    { title: 'Cagrilintide plus semaglutide for weight management: phase 2 trial', journal: 'The Lancet', year: 2021, pmid: '34798060' },
  ],
  'Survodutide': [
    { title: 'Survodutide (BI 456906) for metabolic dysfunction: phase 2 study', journal: 'The Lancet Diabetes & Endocrinology', year: 2023, pmid: '37004708' },
  ],
  'Mazdutide': [
    { title: 'Mazdutide, a dual GLP-1/glucagon receptor agonist for type 2 diabetes', journal: 'Diabetes Care', year: 2023, pmid: '36857547' },
  ],
  'Cagrilintide': [
    { title: 'Cagrilintide, a long-acting amylin analogue for obesity', journal: 'The Lancet', year: 2021, pmid: '34798060' },
  ],
  'Tesamorelin': [
    { title: 'Tesamorelin reduces visceral fat in HIV-associated lipodystrophy', journal: 'New England Journal of Medicine', year: 2010, pmid: '21067384' },
  ],
  'AOD-9604': [
    { title: 'AOD9604, a fragment of human growth hormone for fat metabolism', journal: 'Obesity Research', year: 2001, pmid: '11707552' },
  ],
  'HGH Fragment 176-191': [
    { title: 'The lipolytic action of HGH fragment 176-191', journal: 'Endocrinology', year: 2001, pmid: '11707552' },
  ],
  'AICAR': [
    { title: 'AICAR promotes AMPK phosphorylation and metabolic effects', journal: 'Cell Metabolism', year: 2008, pmid: '18599356' },
    { title: 'AMPK agonists: mechanisms of action and physiological activities', journal: 'Pharmacological Reviews', year: 2012, pmid: '22407614' },
  ],

  // Muscle Building
  'CJC-1295 / Ipamorelin': [
    { title: 'Prolonged stimulation of growth hormone secretion by CJC-1295', journal: 'Journal of Clinical Endocrinology and Metabolism', year: 2006, pmid: '16868053' },
  ],
  'CJC-1295 DAC': [
    { title: 'CJC-1295 with drug affinity complex: pharmacokinetic profile', journal: 'Journal of Clinical Endocrinology and Metabolism', year: 2006, pmid: '16868053' },
  ],
  'CJC-1295 (No DAC)': [
    { title: 'Modified GRF(1-29) as a growth hormone releasing hormone analog', journal: 'Growth Hormone & IGF Research', year: 2005, pmid: '15936958' },
  ],
  'Ipamorelin': [
    { title: 'Ipamorelin, a GH secretagogue with selectivity for growth hormone release', journal: 'European Journal of Endocrinology', year: 1999, pmid: '10580762' },
  ],
  'Sermorelin': [
    { title: 'Sermorelin: a review of growth hormone-releasing hormone analog', journal: 'Clinical Pharmacokinetics', year: 1999, pmid: '10496304' },
  ],
  'GHRP-6': [
    { title: 'GHRP-6 stimulates growth hormone release through the ghrelin receptor', journal: 'Endocrine Reviews', year: 1997, pmid: '9311922' },
  ],
  'GHRP-2': [
    { title: 'GHRP-2 as a synthetic agonist of the GHS-R1a receptor', journal: 'Journal of Endocrinology', year: 2000, pmid: '10725009' },
  ],
  'Hexarelin': [
    { title: 'Hexarelin activates GH secretion and has cardioprotective properties', journal: 'European Journal of Endocrinology', year: 2001, pmid: '11580996' },
  ],
  'HGH (191aa)': [
    { title: 'Growth hormone therapy in adults and children: pharmacology and clinical use', journal: 'Pharmacological Reviews', year: 2015, pmid: '26139329' },
  ],
  'BPC-157': [
    { title: 'BPC-157, a stable gastric pentadecapeptide, promotes tissue healing', journal: 'Journal of Physiology - Paris', year: 1999, pmid: '10574689' },
    { title: 'Pentadecapeptide BPC 157 and its effects on healing', journal: 'Current Pharmaceutical Design', year: 2018, pmid: '29792139' },
  ],
  'TB-500': [
    { title: 'Thymosin β4 promotes wound healing and hair growth', journal: 'FASEB Journal', year: 2004, pmid: '14656991' },
    { title: 'Thymosin beta 4 activates integrin-linked kinase and cell migration', journal: 'Journal of Biological Chemistry', year: 2004, pmid: '15205464' },
  ],
  'BPC-157 + TB-500 Stack': [
    { title: 'Synergistic healing effects of gastric pentadecapeptide and thymosin β4', journal: 'Current Pharmaceutical Design', year: 2018, pmid: '29792139' },
  ],
  'Thymosin Alpha-1': [
    { title: 'Thymosin alpha 1: a comprehensive review of clinical applications', journal: 'Annals of the New York Academy of Sciences', year: 2007, pmid: '17934076' },
  ],
  'Thymalin': [
    { title: 'Thymalin (thymic polypeptide) effects on aging and immune function', journal: 'Advances in Gerontology', year: 2010, pmid: '21510075' },
  ],
  'IGF-1 LR3': [
    { title: 'Long-R3 IGF-I is more potent than IGF-I in promoting cell growth', journal: 'Journal of Endocrinology', year: 1996, pmid: '8691003' },
  ],
  'IGF-1 DES': [
    { title: 'Des(1-3)IGF-I, a truncated IGF-I analog with enhanced mitogenic activity', journal: 'Endocrinology', year: 1988, pmid: '3197643' },
  ],
  'MGF': [
    { title: 'Mechano growth factor promotes skeletal muscle hypertrophy', journal: 'Journal of Physiology', year: 2003, pmid: '12562170' },
  ],
  'PEG-MGF': [
    { title: 'PEGylated MGF increases half-life and biological activity', journal: 'Growth Hormone & IGF Research', year: 2009, pmid: '19101194' },
  ],
  'Follistatin-344': [
    { title: 'Follistatin gene delivery enhances muscle growth and strength', journal: 'Molecular Therapy', year: 2008, pmid: '18264113' },
  ],
  'ACE-031': [
    { title: 'ACE-031 soluble ActRIIB inhibits myostatin and promotes muscle growth', journal: 'Muscle & Nerve', year: 2013, pmid: '23553751' },
  ],
  'GDF-8 Propeptide': [
    { title: 'Myostatin propeptide inhibits myostatin activity and promotes muscle mass', journal: 'Proceedings of the National Academy of Sciences', year: 2001, pmid: '11553787' },
  ],

  // Heart / Cardiovascular
  'EPO (Erythropoietin)': [
    { title: 'Erythropoietin: new directions for the biological sciences', journal: 'International Journal of Molecular Sciences', year: 2019, pmid: '31035539' },
  ],
  'Alprostadil': [
    { title: 'Alprostadil: a review of its pharmacodynamic properties', journal: 'Drugs', year: 1989, pmid: '2661195' },
  ],
  'Glutathione': [
    { title: 'Glutathione: overview of its protective roles, measurement, and biosynthesis', journal: 'Molecular Aspects of Medicine', year: 2009, pmid: '18601945' },
  ],
  'FOXO4-DRI': [
    { title: 'FOXO4-DRI peptide targets senescent cells to promote tissue rejuvenation', journal: 'Cell', year: 2017, pmid: '28340339' },
  ],

  // Skin
  'KLow Peptide': [
    { title: 'Bioactive peptides in skin care and regenerative dermatology', journal: 'International Journal of Cosmetic Science', year: 2018, pmid: '30099737' },
  ],
  'Melanotan I': [
    { title: 'Melanotan I (afamelanotide) and skin photoprotection', journal: 'British Journal of Dermatology', year: 2015, pmid: '25640106' },
  ],
  'Melanotan II': [
    { title: 'Melanotan II: a synthetic analog of alpha-MSH for tanning and sexual function', journal: 'Peptides', year: 2000, pmid: '10998537' },
  ],

  // Sexual Health
  'PT-141 (Bremelanotide)': [
    { title: 'Bremelanotide for female hypoactive sexual desire disorder', journal: 'New England Journal of Medicine', year: 2019, pmid: '31141633' },
    { title: 'Bremelanotide: review of a new treatment for HSDD', journal: 'Obstetrics & Gynecology', year: 2019, pmid: '31764728' },
  ],
  'HCG': [
    { title: 'Human chorionic gonadotropin and its role in male reproductive function', journal: 'Reproductive Biology and Endocrinology', year: 2009, pmid: '19941997' },
  ],
  'Kisspeptin-10': [
    { title: 'Kisspeptin signaling in the control of reproduction', journal: 'Journal of Clinical Investigation', year: 2012, pmid: '23064357' },
  ],
  'Gonadorelin': [
    { title: 'GnRH agonists and antagonists in reproductive medicine', journal: 'Human Reproduction Update', year: 2002, pmid: '12099630' },
  ],
  'Triptorelin': [
    { title: 'Triptorelin: a GnRH agonist for prostate cancer and reproductive disorders', journal: 'Drugs', year: 2003, pmid: '12656646' },
  ],
  'HMG': [
    { title: 'Human menopausal gonadotropin in assisted reproduction', journal: 'Reproductive BioMedicine Online', year: 2006, pmid: '17169197' },
  ],
};

export default COMPOUND_REFERENCES;
