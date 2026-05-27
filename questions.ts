import { Question, Subject } from '../types';

function shuffleOptionsAndCorrectIndex(
  options: string[],
  correctIndex: number
): { shuffledOptions: string[]; newCorrectIndex: number } {
  const mapped = options.map((opt, i) => ({ opt, isCorrect: i === correctIndex }));
  mapped.sort(() => Math.random() - 0.5);
  const newCorrectIndex = mapped.findIndex(m => m.isCorrect);
  return {
    shuffledOptions: mapped.map(m => m.opt),
    newCorrectIndex,
  };
}

export function generateTestPaper(): Question[] {
  let questions: Question[] = [];
  let currentId = 1;

  const add = (subject: Subject, topic: string, text: string, options: string[]) => {
    const { shuffledOptions, newCorrectIndex } = shuffleOptionsAndCorrectIndex(options, 0);
    questions.push({
      id: currentId,
      numericId: currentId,
      subject,
      topic,
      text,
      options: shuffledOptions,
      correctOptionIndex: newCorrectIndex,
    });
    currentId++;
  };

  // PHYSICS (45)
  const phyEasy = [
    ["Dimensional formula for Work is?", "[M L^2 T^{-2}]", "[M L T^{-2}]", "[M L^2 T^{-1}]", "[M L T^{-1}]"],
    ["Dimensional formula for Power is?", "[M L^2 T^{-3}]", "[M L^2 T^{-2}]", "[M L T^{-2}]", "[M L^{-1} T^{-1}]"],
    ["Dimensional formula for Pressure is?", "[M L^{-1} T^{-2}]", "[M L T^{-2}]", "[M L^{-2} T^{-2}]", "[M L^2 T^{-2}]"],
    ["Dimensional formula for Surface Tension is?", "[M L^0 T^{-2}]", "[M L T^{-2}]", "[M L^{-1} T^{-2}]", "[M L^0 T^{-1}]"],
    ["Dimensional formula for Viscosity is?", "[M L^{-1} T^{-1}]", "[M L T^{-1}]", "[M L^{-2} T^{-1}]", "[M L^2 T^{-2}]"],
    ["Dimensional formula for Planck's Constant is?", "[M L^2 T^{-1}]", "[M L^2 T^{-2}]", "[M L T^{-1}]", "[M L^{-1} T^{-1}]"],
    ["Dimensional formula for Angular Momentum is?", "[M L^2 T^{-1}]", "[M L T^{-1}]", "[M L^2 T^{-2}]", "[M L^{-1} T^{-2}]"],
    ["Dimensional formula for Torque is?", "[M L^2 T^{-2}]", "[M L T^{-2}]", "[M L^2 T^{-1}]", "[M L^{-1} T^{-2}]"],
    ["Dimensional formula for Gravitational Constant is?", "[M^{-1} L^3 T^{-2}]", "[M L^2 T^{-2}]", "[M^{-1} L^2 T^{-2}]", "[M^{-2} L^3 T^{-1}]"],
    ["Number of significant figures in 0.007 m^2 is?", "1", "3", "4", "2"],
    ["Number of significant figures in 2.64 x 10^4 kg is?", "3", "2", "4", "5"],
    ["Number of significant figures in 0.2370 g/cm^3 is?", "4", "3", "5", "2"],
    ["Which of the following is a dimensionless quantity?", "Strain", "Stress", "Surface Tension", "Viscosity"],
  ];
  phyEasy.forEach(q => add('Physics', 'Easy: Dimensions & Sig Figs', q[0], [q[1], q[2], q[3], q[4]]));

  const phyMod = [
    ["If the percentage error in mass and momentum are 1% and 2% respectively, the maximum percentage error in kinetic energy is?", "5%", "4%", "3%", "1%"],
    ["The physical quantity X is given by X = 2k^3 l^2 / m*sqrt(n). The percentage errors in k, l, m, n are 1%, 2%, 3%, 4% respectively. The percentage error in X is?", "12%", "10%", "8%", "14%"],
    ["If error in measuring radius of a sphere is 2%, the error in measurement of its volume is?", "6%", "4%", "8%", "2%"],
    ["The percentage errors in the measurement of A, B, C, D are 1%, 2%, 3%, 4% respectively. If P = A^2 B / C D^{1/2}, what is the max % error in P?", "9%", "10%", "7%", "5%"],
    ["1 joule of energy is equivalent to how many ergs?", "10^7", "10^5", "10^6", "10^8"],
    ["1 newton of force is equivalent to how many dynes?", "10^5", "10^7", "10^4", "10^6"],
    ["If the main scale of a vernier caliper reads in mm and 10 vernier scale divisions coincide with 9 main scale divisions, the least count is?", "0.1 mm", "0.01 mm", "0.01 cm", "0.1 cm"],
    ["The least count of a stop watch is 0.2s. The time of 20 oscillations of a pendulum is measured to be 25s. The percentage error in the measurement of time is?", "0.8%", "1.6%", "0.4%", "1.0%"],
    ["Temperature of two bodies measured by a thermometer are t1 = 20 C +- 0.5 C and t2 = 50 C +- 0.5 C. Note temperature difference and error:", "30 C +- 1 C", "30 C +- 0.5 C", "30 C +- 0 C", "30 C +- 1.5 C"],
    ["In an experiment, ref. index of glass was observed to be 1.45, 1.56, 1.54, 1.44, 1.54. The mean absolute error is approx:", "0.04", "0.05", "0.02", "0.01"],
    ["Dimensional formula of magnetic field B is?", "[M T^{-2} A^{-1}]", "[M L T^{-2} A^{-1}]", "[M L^2 T^{-2} A^{-1}]", "[M T^{-1} A^{-2}]"],
    ["Dimensional formula of electric constant (permittivity of free space) is?", "[M^{-1} L^{-3} T^4 A^2]", "[M^{-1} L^{-2} T^3 A^1]", "[M L^3 T^{-4} A^{-2}]", "[M L^2 T^{-3} A^2]"],
    ["The dimensions of RC (Resistance x Capacitance) are same as that of?", "Time", "Frequency", "Wavelength", "Velocity"],
    ["The dimensions of L/R (Inductance / Resistance) are the same as that of?", "Time", "Current", "Voltage", "Power"],
  ];
  phyMod.forEach(q => add('Physics', 'Moderate: Error & Conversions', q[0], [q[1], q[2], q[3], q[4]]));

  const phyHard = [
    ["If force (F), velocity (V) and time (T) are taken as fundamental units, then the dimensions of mass are?", "[F V^{-1} T]", "[F V T^{-1}]", "[F V^{-1} T^{-1}]", "[F V T^{-2}]"],
    ["If energy (E), velocity (V) and time (T) are chosen as the fundamental quantities, the dimensional formula of surface tension will be?", "[E V^{-2} T^{-2}]", "[E V^{-1} T^{-2}]", "[E V^{-2} T^{-1}]", "[E^{-1} V^{-2} T^{-2}]"],
    ["If Planck's constant (h), speed of light (c) and gravitational constant (G) are used to form a unit of length, L is proportional to?", "sqrt(h G / c^3)", "sqrt(h c / G)", "sqrt(G c / h^3)", "sqrt(h G c^3)"],
    ["The density of a material in CGS system of units is 4 g/cm^3. In a system of units in which unit of length is 10 cm and unit of mass is 100 g, the value of density of material will be:", "40", "0.4", "400", "0.04"],
    ["A screw gauge gives the following readings: Main scale reading : 0 mm. Circular scale reading : 52 divisions. Given 1 mm on MS corresponds to 100 divisions on CS. The diameter is?", "0.52 mm", "0.052 cm", "0.0052 mm", "0.052 mm"],
    ["A student measured the diameter of a small steel ball using a screw gauge of LE 0.001 cm. Main scale reading is 5 mm and 0 of circular scale division coincides with 25. If zero error is -0.004 cm, correct diameter is:", "0.529 cm", "0.521 cm", "0.053 cm", "0.525 cm"],
    ["Velocity of a particle v = A + Bt + C/(D+t). Dimensions of A, B, C, D are respectively:", "[L T^{-1}], [L T^{-2}], [L], [T]", "[L T^{-1}], [L T^{-2}], [L T^{-1}], [T]", "[L], [L T^{-2}], [L], [T^{-1}]", "[L T^{-1}], [L], [L], [T]"],
    ["Pressure P = a/b e^(-az/k\\theta), where k is Boltzmann constant, z is distance, \\theta is temp. Dimensions of b are:", "[M^{-1} L^2 T^2]", "[M L^2 T^{-2}]", "[M^{-1} L^3 T^2]", "[M L^{-1} T^{-2}]"],
    ["The relation gives the value of 'x' = [ a^2 b^3 / c sqrt(d) ]. If percentage errors in a, b, c, and d are 2%, 1%, 3%, and 4% respectively, what is the relative error in 'x'?", "12%", "8%", "10%", "14%"],
    ["Which of the following physical quantities have the same dimensions?", "Work and Torque", "Angular momentum and Planck's constant", "Impulse and Momentum", "All of the above"],
    ["Dimensional formula of Stefan's constant is?", "[M L^0 T^{-3} K^{-4}]", "[M L^2 T^{-2} K^{-4}]", "[M L^2 T^{-3} K^{-1}]", "[M L^{-1} T^{-2} K^{-4}]"],
    ["Dimensional formula of coefficient of thermal conductivity is?", "[M L T^{-3} K^{-1}]", "[M L^2 T^{-2} K^{-1}]", "[M L^2 T^{-3} K^{-2}]", "[M L T^{-2} K^{-1}]"],
    ["Dimensions of 1/sqrt(\\mu_0 \\epsilon_0) are:", "[L T^{-1}]", "[L^{-1} T]", "[L^2 T^{-2}]", "[L^{-2} T^2]"],
    ["If C is capacitance and V is potential, the dimensional formula of CV^2 is?", "[M L^2 T^{-2}]", "[M L T^{-2}]", "[M L^2 T^{-1}]", "[M L^2 T^{-3}]"],
    ["The period of oscillation of a simple pendulum is given by T = 2\\pi sqrt(L/g). If measured value of L is 20cm known to 1mm config, and T is 90s for 100 oscillations measured with 1s precision, accuracy of g is:", "3%", "1%", "2%", "5%"],
    ["Error in measurement of side of a cube is 1%. The error in the calculated mass of the cube from its density (which is exact) and volume will be:", "3%", "1%", "2%", "4%"],
    ["What are the dimensions of Magnetic Flux?", "[M L^2 T^{-2} A^{-1}]", "[M L^2 T^{-1} A^{-1}]", "[M L T^{-2} A^{-1}]", "[M L^2 T^{-2} A^{-2}]"],
    ["The length, breadth, and thickness of a block are 12 cm, 6 cm, and 2.45 cm. The volume of the block according to the idea of significant figures should be:", "1.8 x 10^2 cm^3", "1.764 x 10^2 cm^3", "1.76 x 10^2 cm^3", "1.8 cm^3"],
  ];
  phyHard.forEach(q => add('Physics', 'Hard: Adv. Dimensions & Error', q[0], [q[1], q[2], q[3], q[4]]));

  // CHEMISTRY (45)
  const chemEasy = [
    ["Who discovered the electron?", "J.J. Thomson", "Ernest Rutherford", "James Chadwick", "Niels Bohr"],
    ["Who discovered the proton?", "E. Goldstein", "J.J. Thomson", "James Chadwick", "Niels Bohr"],
    ["Who discovered the neutron?", "James Chadwick", "J.J. Thomson", "Ernest Rutherford", "John Dalton"],
    ["Isotopes are atoms of the same element with different:", "Mass numbers", "Atomic numbers", "Number of electrons", "Number of protons"],
    ["Isobars have the same:", "Mass number", "Atomic number", "Number of neutrons", "Number of electrons"],
    ["Atoms having the same number of neutrons are called?", "Isotones", "Isotopes", "Isobars", "Isoelectronic"],
    ["Which of the following are isoelectronic?", "Na+ and F-", "Na and K", "F and Cl", "O2- and S2-"],
    ["The symbol for a proton is often written as?", "1H1", "0n1", "-1e0", "4He2"],
    ["The alpha particle is basically a?", "Helium nucleus", "Hydrogen nucleus", "Fast moving electron", "Neutron"],
    ["Bohr's model can explain the spectrum of:", "Hydrogen only", "Any atom", "Hydrogen and H-like ions", "Molecules"],
    ["Rutherford's alpha scattering experiment proved the existence of:", "Nucleus", "Electron", "Neutron", "Protons in orbit"],
    ["The maximum number of electrons in an orbit designated by n is:", "2n^2", "n^2", "2n+1", "4l+2"],
    ["The charge on an electron was determined by?", "Millikan's oil drop experiment", "Cathode ray tube", "Gold foil experiment", "Alpha scattering"],
  ];
  chemEasy.forEach(q => add('Chemistry', 'Easy: Atomic Basics', q[0], [q[1], q[2], q[3], q[4]]));

  const chemMod = [
    ["Radius of nth Bohr orbit in Hydrogen is proportional to?", "n^2", "n", "1/n", "1/n^2"],
    ["Energy of electron in nth orbit of H-atom is proportional to?", "1/n^2", "1/n", "n^2", "n"],
    ["Velocity of electron in nth orbit of H-atom is proportional to?", "1/n", "n", "1/n^2", "n^2"],
    ["Ratio of radii of 1st, 2nd, and 3rd orbits of H-atom is?", "1 : 4 : 9", "1 : 2 : 3", "1 : 8 : 27", "1 : 1 : 1"],
    ["The Balmer series falls in which region of the electromagnetic spectrum?", "Visible", "Ultraviolet", "Infrared", "Microwave"],
    ["The Lyman series falls in which region of the electromagnetic spectrum?", "Ultraviolet", "Visible", "Infrared", "Radio"],
    ["Expression for the angular momentum of an electron in an orbit is?", "mvr = nh/2\\pi", "mvr = nh/\\pi", "mvr = h/2\\pi", "mvr = n^2h/2\\pi"],
    ["The value of azimuthal quantum number (l) for a given value of principal quantum number (n) can range from:", "0 to n-1", "1 to n", "0 to n", "1 to n-1"],
    ["The magnetic quantum number (m) determines:", "Orientation of the orbital", "Size of the orbital", "Shape of the orbital", "Spin of the electron"],
    ["The subshell with n=3, l=2 is designated as?", "3d", "3p", "3s", "3f"],
    ["The maximum number of electrons in a subshell with given l is?", "4l+2", "2l+1", "2n^2", "n^2"],
    ["Which is the correct electronic configuration of Chromium (Z=24)?", "[Ar] 3d5 4s1", "[Ar] 3d4 4s2", "[Ar] 3d6 4s0", "[Ar] 3d3 4s2 4p1"],
    ["Which is the correct electronic configuration of Copper (Z=29)?", "[Ar] 3d10 4s1", "[Ar] 3d9 4s2", "[Ar] 3d8 4s2 4p1", "[Ar] 3d10 4s2"],
    ["Pauli exclusion principle states that:", "No two electrons in an atom can have the same set of four quantum numbers", "Electrons fill lower energy orbitals first", "Pairing of electrons occurs only after all orbitals are singly occupied", "Position and momentum cannot be simultaneously measured"],
  ];
  chemMod.forEach(q => add('Chemistry', 'Moderate: Bohr & Q-Numbers', q[0], [q[1], q[2], q[3], q[4]]));

  const chemHard = [
    ["The number of radial nodes for a 3p orbital is?", "1", "0", "2", "3"],
    ["The number of angular nodes for a 4d orbital is?", "2", "1", "3", "4"],
    ["Total number of nodes for a 4f orbital is?", "3", "4", "2", "1"],
    ["According to de Broglie, the wavelength of a moving particle is given by:", "\\lambda = h / mv", "\\lambda = m v / h", "\\lambda = h v / m", "\\lambda = h m / v"],
    ["Calculate the de Broglie wavelength of an electron moving with 1% of the speed of light (approx).", "2.42 x 10^{-10} m", "2.42 x 10^{-12} m", "1.21 x 10^{-10} m", "3.33 x 10^{-10} m"],
    ["If uncertainty in position and momentum are equal, then uncertainty in velocity is:", "1/2m * sqrt(h/\\pi)", "sqrt(h/\\pi)", "h/(2\\pi m)", "1/m * sqrt(h/4\\pi)"],
    ["The shortest wavelength in Hydrogen's Lyman series corresponds to the transition:", "n = \\infty to 1", "n = 2 to 1", "n = \\infty to 2", "n = 3 to 2"],
    ["The longest wavelength in the Balmer series corresponds to the transition:", "n = 3 to 2", "n = \\infty to 2", "n = 4 to 2", "n = 2 to 1"],
    ["Calculate the energy of an electron in the 3rd orbit of He+ ion.", "-6.04 eV", "-1.51 eV", "-13.6 eV", "-54.4 eV"],
    ["Ratio of the shortest wavelength of Lyman series to the shortest wavelength of Balmer series of He+ is:", "1 : 4", "1 : 3", "5 : 27", "1 : 9"],
    ["Ionization energy of He+ is 19.6 x 10^{-18} J/atom. The energy of the first stationary state (n=1) of Li2+ is:", "-4.41 x 10^{-17} J/atom", "-8.82 x 10^{-17} J/atom", "-4.41 x 10^{-16} J/atom", "-2.2 x 10^{-15} J/atom"],
    ["The wave mechanical model of the atom is based upon:", "Schrodinger wave equation", "Bohr's theory", "Rutherford's scattering", "Dalton's atomic theory"],
    ["Orbital angular momentum depends on:", "l", "n and l", "n and m", "m and s"],
    ["For an electron in a 3d orbital, the orbital angular momentum is:", "sqrt(6) h / 2\\pi", "sqrt(2) h / 2\\pi", "0", "sqrt(12) h / 2\\pi"],
    ["Spin angular momentum of an electron is given by:", "sqrt(s(s+1)) h / 2\\pi", "s (h / 2\\pi)", "sqrt(l(l+1)) h / 2\\pi", "+- 1/2 (h / 2\\pi)"],
    ["How many spatial orientations are possible for the f-orbital?", "7", "5", "3", "1"],
    ["The number of d-electrons in Fe2+ (Z=26) is not equal to that of:", "p-electrons in Ne (Z=10)", "d-electrons in Fe (Z=26)", "p-electrons in Cl (Z=17)", "s-electrons in Mg (Z=12)"],
    ["The permitted values of m for an electron with n=3 and l=2 are:", "-2, -1, 0, +1, +2", "0, 1, 2", "-3, -2, -1, 0, 1, 2, 3", "1, 2, 3"],
  ];
  chemHard.forEach(q => add('Chemistry', 'Hard: Quantum Mech & Numericals', q[0], [q[1], q[2], q[3], q[4]]));

  // BOTANY (45)
  const botEasy = [
    ["Who is known as the father of microscopy and first described a live cell?", "Anton Von Leeuwenhoek", "Robert Hooke", "Robert Brown", "Theodor Schwann"],
    ["Who proposed the modification to cell theory stating 'Omnis cellula-e cellula'?", "Rudolf Virchow", "Matthias Schleiden", "Robert Brown", "Camillo Golgi"],
    ["Which of the following is considered the 'powerhouse' of the cell?", "Mitochondria", "Nucleus", "Chloroplast", "Golgi apparatus"],
    ["Which of the following is found in plant cells but absent in animal cells?", "Cell wall", "Plasma membrane", "Nucleus", "Ribosomes"],
    ["Which of the following organisms are classified under Kingdom Monera?", "Bacteria", "Fungi", "Amoeba", "Algae"],
    ["R.H. Whittaker proposed how many kingdoms of classification?", "Five", "Two", "Three", "Four"],
    ["Which kingdom comprises unicellular eukaryotes?", "Protista", "Monera", "Fungi", "Plantae"],
    ["The 5-kingdom classification does not include:", "Viruses", "Fungi", "Monera", "Protista"],
    ["What is the major component of fungal cell walls?", "Chitin", "Cellulose", "Peptidoglycan", "Lignin"],
    ["What are chromosomes entirely composed of?", "DNA and Proteins", "RNA and Proteins", "Only DNA", "Lipids and DNA"],
    ["Which organelle is the site of protein synthesis?", "Ribosomes", "Lysosomes", "Smooth ER", "Vacuole"],
    ["Which plastic is responsible for photosynthesis?", "Chloroplast", "Chromoplast", "Leucoplast", "Amyloplast"],
    ["What structure separates the nucleus from the cytoplasm?", "Nuclear envelope", "Plasma membrane", "Cell wall", "Nucleolus"],
  ];
  botEasy.forEach(q => add('Botany', 'Easy: Cell & Diversity Intro', q[0], [q[1], q[2], q[3], q[4]]));

  const botMod = [
    ["The fluid mosaic model of the plasma membrane was proposed by:", "Singer and Nicolson", "Danielli and Davson", "Robertson", "Gorter and Grendel"],
    ["Mitochondria are semi-autonomous organelles because they contain:", "Circular DNA and 70S ribosomes", "Linear DNA and 80S ribosomes", "Only proteins and lipids", "RNA solely"],
    ["Smooth Endoplasmic Reticulum is primarily involved in:", "Lipid synthesis", "Protein synthesis", "ATP generation", "Photosynthesis"],
    ["Lysosomes are rich in which type of enzymes?", "Hydrolytic enzymes", "Oxidizing enzymes", "Reducing enzymes", "Synthetic enzymes"],
    ["Which kingdom includes heterotrophic, multicellular, eukaryotic organisms lacking a cell wall?", "Animalia", "Plantae", "Fungi", "Protista"],
    ["Which structures are infoldings of the cell membrane in prokaryotes?", "Mesosomes", "Plasmids", "Nucleoids", "Ribosomes"],
    ["Extrachromosomal, circular DNA molecules found in bacteria are called:", "Plasmids", "Nucleoids", "Chromomeres", "Kinetochores"],
    ["The cytoskeleton of eukaryotic cells is made of:", "Microtubules, microfilaments, and intermediate filaments", "Lipids and carbohydrates", "Only cellulose", "Chitin fibres"],
    ["In the 80S ribosome, what do the two subunits weigh?", "60S and 40S", "50S and 30S", "70S and 10S", "40S and 40S"],
    ["Which network of membranous tubules is studded with ribosomes?", "Rough Endoplasmic Reticulum", "Smooth Endoplasmic Reticulum", "Golgi apparatus", "Lysosomes"],
    ["Which of the following plastids store starch?", "Amyloplasts", "Elaioplasts", "Aleuroplasts", "Chromoplasts"],
    ["The primary site for the packaging of materials in the cell is:", "Golgi apparatus", "Mitochondria", "Nucleus", "Ribosomes"],
    ["Thylakoids are found in which organelle?", "Chloroplasts", "Mitochondria", "Nucleus", "Lysosomes"],
    ["Which organelle is correctly matched with its function?", "Nucleolus - Ribosomal RNA synthesis", "Golgi - Protein synthesis", "Mitochondria - Photosynthesis", "Lysosome - ATP synthesis"],
  ];
  botMod.forEach(q => add('Botany', 'Moderate: Organelles & Classification', q[0], [q[1], q[2], q[3], q[4]]));

  const botHard = [
    ["Identify the correct statement regarding the fluid mosaic model:", "Lipids can laterally diffuse, and sometimes flip-flop horizontally", "Proteins frequently flip-flop between layers", "The membrane is a rigid, crystalline structure", "Carbohydrates are present on the inner face"],
    ["The core of a eukaryotic flagellum is called the axoneme, which exhibits a microtubular arrangement of:", "9+2", "9+0", "8+2", "9+4"],
    ["Centrioles have a microtubular arrangement characterized as:", "9+0", "9+2", "9+1", "8+0"],
    ["Which chromosome has the centromere situated close to its end, forming one extremely short and one very long arm?", "Acrocentric", "Metacentric", "Sub-metacentric", "Telocentric"],
    ["A chromosome with a terminal centromere is termed:", "Telocentric", "Acrocentric", "Sub-metacentric", "Metacentric"],
    ["Which statement is incorrect regarding Archaebacteria?", "Their cell wall is identical to Eubacteria (peptidoglycan)", "They can survive extreme conditions", "Methanogens are found in the gut of ruminants", "They have cell membranes containing branched chain lipids"],
    ["Mycoplasmas are distinct from other bacteria because:", "They completely lack a cell wall", "They are strictly aerobic", "They are always multicellular", "They possess a true nucleus"],
    ["Viroids differ from viruses in that:", "They are free RNA without a protein coat", "They consist solely of a protein coat", "They infect only animal cells", "They contain DNA only"],
    ["Kinetochores are disc-shaped structures present on the:", "Sides of centromeres", "Ends of telomeres", "Surface of nucleolus", "Inner mitochondrial membrane"],
    ["The space inside the inner membrane of chloroplasts is called the:", "Stroma", "Matrix", "Lumen", "Cristae"],
    ["Which of the following is true for both mitochondria and chloroplasts?", "Both synthesize ATP using chemiosmosis", "Both break down glucose", "Both contain 80S ribosomes", "Both are part of the endomembrane system"],
    ["The endomembrane system includes:", "ER, Golgi, Lysosomes, and Vacuoles", "ER, Golgi, Mitochondria, and Chloroplasts", "Nucleus, ER, and Plastids", "Lysosomes, Vacuoles, and Microbodies"],
    ["Cyanobacteria are classified under which kingdom?", "Monera", "Protista", "Plantae", "Algae"],
    ["In ciliates, the macro-nucleus controls __________, and the micro-nucleus controls __________.", "Vegetative functions, reproduction", "Reproduction, vegetative functions", "Movement, feeding", "Digestion, excretion"],
    ["According to the endosymbiotic theory, which two organelles originated from free-living prokaryotes?", "Mitochondria and Chloroplasts", "Nucleus and ER", "Golgi and Lysosomes", "Vacuoles and Plastids"],
    ["Secondary constriction is seen in some chromosomes, leading to the formation of a small fragment called a:", "Satellite", "Telomere", "Kinetochore", "Chromomere"],
    ["Slime molds are classified under which kingdom?", "Protista", "Fungi", "Plantae", "Monera"],
    ["Which group of organisms forms a connecting link between plants, animals, and fungi?", "Protista", "Monera", "Archaebacteria", "Viruses"],
  ];
  botHard.forEach(q => add('Botany', 'Hard: Core Cell Biology & Exceptions', q[0], [q[1], q[2], q[3], q[4]]));

  // ZOOLOGY (45)
  const zooEasy = [
    ["The study of tissues is termed as:", "Histology", "Cytology", "Morphology", "Anatomy"],
    ["The four basic tissue types in animals are:", "Epithelial, Connective, Muscular, Neural", "Epithelial, Skeletal, Muscular, Neural", "Blood, Bone, Cartilage, Muscle", "Squamous, Cuboidal, Columnar, Ciliated"],
    ["Which tissue provides a protective covering for the body and lines its cavities?", "Epithelial tissue", "Connective tissue", "Muscular tissue", "Neural tissue"],
    ["Which tissue connects, supports, or binds other tissues and organs?", "Connective tissue", "Epithelial tissue", "Neural tissue", "Muscular tissue"],
    ["Which tissue is specialized for contraction and movement?", "Muscular tissue", "Neural tissue", "Epithelial tissue", "Connective tissue"],
    ["What is the fundamental functional unit of neural tissue?", "Neuron", "Nephron", "Glial cell", "Axon"],
    ["Epithelium composed of a single layer of flattened cells with irregular boundaries is called:", "Squamous epithelium", "Cuboidal epithelium", "Columnar epithelium", "Transitional epithelium"],
    ["Which type of muscle tissue is voluntary?", "Skeletal muscle", "Smooth muscle", "Cardiac muscle", "Visceral muscle"],
    ["Which muscle type shows striations but is strictly involuntary?", "Cardiac muscle", "Skeletal muscle", "Smooth muscle", "Multiunit smooth muscle"],
    ["The most abundant and widely distributed tissue in complex animals is:", "Connective tissue", "Epithelial tissue", "Muscular tissue", "Neural tissue"],
    ["Blood is classified as which type of tissue?", "Fluid connective tissue", "Dense connective tissue", "Specialized epithelial tissue", "Loose connective tissue"],
    ["Tendons and ligaments are examples of:", "Dense connective tissue", "Loose connective tissue", "Specialized connective tissue", "Adipose tissue"],
    ["Glands that release their secretions through ducts are known as:", "Exocrine glands", "Endocrine glands", "Heterocrine glands", "Apocrine glands"],
  ];
  zooEasy.forEach(q => add('Zoology', 'Easy: Animal Tissues Intro', q[0], [q[1], q[2], q[3], q[4]]));

  const zooMod = [
    ["Cuboidal epithelium is typically found in:", "Tubular parts of nephrons in kidneys and ducts of glands", "Air sacs of lungs", "Inner surface of the stomach", "Blood vessels"],
    ["Columnar epithelium with microvilli is found in the:", "Intestinal lining", "Fallopian tubes", "Alveoli of lungs", "Skin epidermis"],
    ["Where is ciliated epithelium primarily located in the human body?", "Inner surface of hollow organs like bronchioles and fallopian tubes", "Skin and sweat glands", "Walls of blood vessels", "Lining of the mouth"],
    ["Which tissue specializes in storing fat?", "Adipose tissue", "Areolar tissue", "Dense regular connective tissue", "Reticular tissue"],
    ["Tendons connect:", "Skeletal muscle to bone", "Bone to bone", "Muscle to muscle", "Nervous tissue to muscle"],
    ["Ligaments connect:", "Bone to bone", "Muscle to bone", "Cartilage to bone", "Skin to muscle"],
    ["Cartilage cells are called?", "Chondrocytes", "Osteocytes", "Fibroblasts", "Macrophages"],
    ["Bone cells are called?", "Osteocytes", "Chondrocytes", "Leukocytes", "Erythrocytes"],
    ["Intercalated discs are communication junctions specific to:", "Cardiac muscle", "Skeletal muscle", "Smooth muscle", "Nervous tissue"],
    ["Which muscle type is fusiform (spindle-shaped) and acts involuntarily?", "Smooth muscle", "Skeletal muscle", "Cardiac muscle", "Striated muscle"],
    ["What type of tissue forms the framework for the epidermis?", "Areolar connective tissue", "Dense irregular connective tissue", "Adipose tissue", "Cartilage"],
    ["The matrix of bone is rich in:", "Calcium salts and collagen fibers", "Chondroitin salts", "Elastin fibers", "Mucopolysaccharides"],
    ["The fluid matrix of blood is called:", "Plasma", "Lymph", "Serum", "Synovial fluid"],
    ["Which cell in neural tissue protects and supports neurons?", "Neuroglial cells", "Schwann cells only", "Fibroblasts", "Mast cells"],
  ];
  zooMod.forEach(q => add('Zoology', 'Moderate: Tissue Types & Locations', q[0], [q[1], q[2], q[3], q[4]]));

  const zooHard = [
    ["Which type of cell junction helps stop substances from leaking across a tissue?", "Tight junctions", "Adhering junctions", "Gap junctions", "Desmosomes"],
    ["Which cell junctions perform cementing to keep neighbouring cells together?", "Adhering junctions", "Tight junctions", "Gap junctions", "Plasmodesmata"],
    ["Which junctions facilitate cell communication by connecting the cytoplasm of adjoining cells?", "Gap junctions", "Tight junctions", "Adhering junctions", "Hemidesmosomes"],
    ["In areolar connective tissue, which cells secrete fibers and ground substance?", "Fibroblasts", "Mast cells", "Macrophages", "Adipocytes"],
    ["Mast cells of connective tissue secrete:", "Histamine, Heparin, and Serotonin", "Antibodies", "Melanin", "Collagen and Elastin"],
    ["Identify the correct characteristic of dense regular connective tissue:", "Collagen fibers are present in rows between many parallel bundles of fibers", "It has fibroblasts and many fibers perfectly randomly oriented", "It serves as a support framework for epithelium", "It resists compression and contains chondrocytes"],
    ["What are 'lacunae' in the context of skeletal connective tissues?", "Small fluid-filled spaces containing chondrocytes or osteocytes", "Canals communicating with blood vessels", "The solid matrix of bone", "Cells that break down bone"],
    ["Haversian systems (osteons) are uniquely found in:", "Mammalian compact bone", "Avian bones", "Reptilian bones", "Cartilage of fish"],
    ["Volkmann's canals are found in:", "Bone", "Cartilage", "Liver", "Kidney"],
    ["Macrophages are functionally categorized as:", "Phagocytic cells of connective tissue", "Fiber-producing cells", "Fat-storing cells", "Antibody-producing cells"],
    ["Which of the following is true for transitional epithelium?", "It is highly stretchable and found in the urinary bladder", "It lines the stomach and secretes mucus", "It consists of ciliated columnar cells", "It is composed of a single layer of flat cells"],
    ["Nissl's granules are found in which part of the neural tissue?", "Cell body and dendrites of a neuron", "Axon of a neuron", "Schwann cells", "Neuroglia"],
    ["The myelin sheath in the peripheral nervous system is formed by:", "Schwann cells", "Oligodendrocytes", "Astrocytes", "Microglia"],
    ["Stratified squamous non-keratinized epithelium is found in:", "Buccal cavity and pharynx", "Skin epidermis", "Lining of PCT", "Inner lining of intestine"],
    ["Which connective tissue fiber provides flexibility and high tensile strength but not elasticity?", "Collagen fiber", "Elastin fiber", "Reticular fiber", "Myofibrils"],
    ["The most abundant protein in the animal world is:", "Collagen", "RuBisCO", "Keratin", "Hemoglobin"],
    ["Compound epithelium functions primarily in:", "Protection against chemical and mechanical stresses", "Secretion of enzymes", "Absorption of nutrients", "Diffusion of gases"],
    ["Which of the following is a false statement about neuroglia?", "They constitute less than 10% of the volume of neural tissue", "They make up more than half the volume of neural tissue", "They protect and support neurons", "They are capable of division"],
  ];
  zooHard.forEach(q => add('Zoology', 'Hard: Adv. Tissues & Junctions', q[0], [q[1], q[2], q[3], q[4]]));

  return questions;
}
