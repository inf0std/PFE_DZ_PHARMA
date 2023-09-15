const params = require("../params/searchEngineParams");

const countCumul = (chain, matrix) => {
  /* console.log("chain", chain);
  const filteredMat = matrix.filter((_, index) =>
    chain.some((__, i) => i == index)
  );
  console.log("filteredMat", filteredMat);
  return filteredMat.reduce((acc, elem) =>
    acc ? acc.map((a, i) => a + elem[i]) : elem
  ); */

  return chain.reduce((acc, index) => {
    if (!acc) return matrix[index];
    return acc.map((a, i) => a + matrix[index][i]);
  }, null);
};

const covered = (cumul) => {
  return cumul.filter((e) => e != 0).length == cumul.length;
};

const setCover = (matrix) => {
  let i = 0,
    j = 0;
  const nbRows = matrix.length ? matrix.length : 0;
  const nbCols = matrix.length > 0 ? matrix[0].length : 0;
  const chains = matrix.map((_, index) => [index]);

  const initialCumuls = chains.map((c) => countCumul(c, matrix));
  const bestCumuls = initialCumuls
    .map((cumul) => cumul.filter((e) => e > 0).length)
    .sort((a, b) => b - a)
    .slice(0, params.getParams().nb_result);

  const indexes = matrix.map((_, i) => i);
  for (let _ = 0; _ < params.getParams().nb_pharma_result_max; _++) {
    chains.forEach((chain) => {
      console.log(indexes.filter((e) => !chain.some((c) => c == e)));
    });
  }
};
/* function couvertureParEnsemble(matriceIncidence) {
  const resultat = new Set(); // Use a Set to store unique sets
  const lignes = matriceIncidence.length;
  const colonnes = matriceIncidence[0].length;

  function backtrack(ensembleActuel, colonnesRestantes) {
    if (colonnesRestantes.size === 0) {
      resultat.add(new Set(ensembleActuel)); // Add the unique set to the Set
      return;
    }

    const colonne = [...colonnesRestantes][0];
    for (let ligne = 0; ligne < lignes; ligne++) {
      if (matriceIncidence[ligne][colonne] === 1) {
        ensembleActuel.add(ligne); // Use Set.add to add elements
        const nouvellesColonnesRestantes = new Set(colonnesRestantes);
        nouvellesColonnesRestantes.delete(colonne);
        backtrack(ensembleActuel, nouvellesColonnesRestantes);
        ensembleActuel.delete(ligne); // Use Set.delete to remove elements
      }
    }
  }

  const colonnesRestantes = new Set();
  for (let j = 0; j < colonnes; j++) {
    colonnesRestantes.add(j);
  }

  backtrack(new Set(), colonnesRestantes); // Start with an empty Set
  return Array.from(resultat); // Convert the Set back to an array before returning
}

// Exemple d'utilisation
const matriceIncidence = [
  [1, 0, 1, 0],
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [0, 0, 1, 1],
];

const solutions = couvertureParEnsemble(matriceIncidence);
console.log("Différentes combinaisons de solutions :", solutions); */

setCover([
  [1, 0, 1, 0],
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [0, 1, 1, 1],
]);
