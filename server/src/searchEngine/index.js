const {
  createIndexFromIDs,
  createDCIIndexFromIds,
  createPharmaDistenceIndex,
  createPharmaDistenceMatrix,
} = require("./queryGenerators");

const { filterKeysByPrefix } = require("./helper");
const {
  constructMaxQuantityGlobal,
  constructMinExpirationGlobal,
  constructPharmciesChains,
  finalScore,
  setCover,
} = require("../searchEngine/scoreFn");
const test_data = {
  pharmacies: [
    {
      pharmacie_id: 4,
      distance: 30.1823226584659,
      latitude: "36.72821425",
      longitude: "4.07997222",
    },
    {
      pharmacie_id: 5,
      distance: 33.1823226584659,
      latitude: "36.72821425",
      longitude: "4.07997222",
    },
    {
      pharmacie_id: 6,
      distance: 20.1823226584659,
      latitude: "36.72821425",
      longitude: "4.07997222",
    },
    {
      pharmacie_id: 7,
      distance: 10.1823226584659,
      latitude: "36.72821425",
      longitude: "4.07997222",
    },
    {
      pharmacie_id: 8,
      distance: 3.1823226584659,
      latitude: "36.72821425",
      longitude: "4.07997222",
    },
    {
      pharmacie_id: 9,
      distance: 0.1823226584659,
      latitude: "36.72821425",
      longitude: "4.07997222",
    },
    {
      pharmacie_id: 10,
      distance: 2.1823226584659,
      latitude: "36.72821425",
      longitude: "4.07997222",
    },
    {
      pharmacie_id: 11,
      distance: 10.1823226584659,
      latitude: "36.72821425",
      longitude: "4.07997222",
    },
    {
      pharmacie_id: 12,
      distance: 32.1823226584659,
      latitude: "36.72821425",
      longitude: "4.07997222",
    },
    {
      pharmacie_id: 13,
      distance: 3.1823226584659,
      latitude: "36.72821425",
      longitude: "4.07997222",
    },
  ],
  quantities: [
    [10, 0, 0, 0, 0],
    [2, 20, 5, 0, 0],
    [10, 0, 0, 9, 4],
    [0, 0, 5, 0, 8],
    [10, 0, 0, 0, 0],
    [2, 20, 5, 2, 0],
    [10, 0, 0, 9, 4],
    [0, 3, 15, 0, 8],
    [10, 0, 0, 0, 0],
    [2, 20, 5, 2, 0],
  ],
  mat: [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 0, 1, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9],
    [2, 1, 0, 2, 5, 6, 4, 8.9, 10, 4.3],
    [3, 2.3, 2, 0],
    [4, 3.4, 5],
    [5, 4.5, 6],
    [6, 5.6, 4],
    [7, 6.7, 8.9],
    [8, 7.8, 10],
    [9, 8.9, 4.3],
  ],
};
const quantityIndex = (quantities) => {
  return quantities.map((quantity) =>
    filterKeysByPrefix("Q_", Object.keys(quantity)).map((key) =>
      Number.parseInt(quantity[key])
    )
  );
};

const expirationIndex = (quantities) => {
  return quantities.map((quantity) =>
    filterKeysByPrefix("exp_", Object.keys(quantity)).map((key) =>
      Number.parseInt(quantity[key])
    )
  );
};

const medIdsFromQuantity = (quantities) => {
  return filterKeysByPrefix("Q_", Object.keys(quantities[0])).map((key) =>
    Number.parseInt(key.slice(2))
  );
};
const colapseToDciQ = (matrix, dcis) => {
  return matrix.map((row) => {
    return Object.values(
      row.reduce((acc, val, i) => {
        let a = { ...acc };
        if (acc[dcis[i]]) {
          a[dcis[i]] = a[dcis[i]] + val;
          return a;
        }
        a[dcis[i]] = val;
        return a;
      }, {})
    );
  });
};
const colapseToDciE = (matrix, dcis) => {
  return matrix.map((row) => {
    return Object.values(
      row.reduce((acc, val, i) => {
        let a = { ...acc };
        if (!acc[dcis[i]]) {
          a[dcis[i]] = val;
          return a;
        }
        a[dcis[i]] = isNaN(val) ? a[dcis[i]] : val;
        return a;
      }, {})
    );
  });
};
const makeSearch = async (req, res) => {
  //console.log(req);
  //console.log(req.body);
  let pharmacies = await createPharmaDistenceIndex(req.body.position);
  let [quantity, dcis] = await createIndexFromIDs(req.body.ids, pharmacies);

  console.log("\n\n\n\nquantity", quantity, "\n\n\n\n");
  console.log(
    Object.values(quantity[0])
      .filter((_, index) => index % 2 == 1)
      .reduce((acc, e) => acc + Number.parseInt(e), 0) > 0
  );
  quantity = quantity.filter(
    (list) =>
      Object.values(list)
        .filter((_, index) => index % 2 == 1)
        .reduce((acc, e) => acc + Number.parseInt(e), 0) > 0
  );
  console.log(quantity);
  if (!quantity.length) {
    res.json({ results: [] });
    return;
  }
  collapsedQ = colapseToDciQ(quantityIndex(quantity), dcis);
  collapsedE = colapseToDciE(expirationIndex(quantity), dcis);
  console.log(collapsedQ);

  pharmacies = pharmacies.filter((pharma) =>
    quantity.some((_) => _.pharmacie_id == pharma.pharmacie_id)
  );
  console.log(pharmacies.length);
  res.json({
    ...finalScore(setCover(collapsedQ), collapsedE, [], collapsedQ, pharmacies),
  });
};

module.exports = makeSearch;
