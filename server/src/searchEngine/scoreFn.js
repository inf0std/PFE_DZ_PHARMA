const scoreDistence = (distences) => {
  let min = Math.min(...distences);
  if (min == 0) {
    return distences.map((dist) => (dist == min ? 1 : 0));
  }
  return distences.map((dist) => min / dist);
};

const scoreExpiration = () => {};

const scoreQuantity = () => {};

const constructMinExpirationGlobal = (matExpiration) => {
  console.log("E", matExpiration);
  return matExpiration.reduce((acc, elem) => {
    console.log("acc", acc);
    return acc.map((ac, i) => {
      if (elem[i] && ac) return ac < elem[i] ? ac : elem[i];
      if (elem[i]) return elem[i];
      return ac;
    });
  }, matExpiration[0]);
};
function setCover(matrix) {
  function backtrack(remainingColumns, chosenRows, solutions) {
    if (remainingColumns.size === 0) {
      solutions.push(Array.from(chosenRows));
      return;
    }

    const column = Array.from(remainingColumns)[0];
    for (const row in matrix) {
      if (matrix[row][column] > 0) {
        chosenRows.add(row);
      }
    }

    remainingColumns.delete(column);
    backtrack(remainingColumns, chosenRows, solutions);
    chosenRows.delete(Array.from(chosenRows).pop()); // Backtrack
    backtrack(remainingColumns, chosenRows, solutions);
    remainingColumns.add(column); // Restore the column
  }

  const solutions = [];
  const columns = new Set();
  const rows = matrix.length;

  matrix.forEach((row) => {
    row.forEach((value, columnIndex) => {
      if (value === 1) {
        columns.add(columnIndex.toString());
      }
    });
  });

  backtrack(columns, new Set(), solutions);

  return solutions;
}

const constructMaxQuantityGlobal = (matQuantity) => {
  return matQuantity.reduce(
    (acc, elem) =>
      (acc = acc.map((ac, index) => (ac > elem[index] ? ac : elem[index]))),
    [...matQuantity[0]]
  );
};

const constructPharmciesChains = (matQuantity) => {
  return setCover(matQuantity);
};

const minChainDist = (pharDisMat, distPhar, chains) => {};
module.exports = {
  constructMaxQuantityGlobal,
  constructMinExpirationGlobal,
  constructPharmciesChains,
};
