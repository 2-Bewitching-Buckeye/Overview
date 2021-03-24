const pool = require('../../connection/postgresConnection.js');

exports.getProducts = (req, res) => {
  const page = req.body.page || 1;
  const count = req.body.count || 5;
  pool.query(`SELECT * FROM products WHERE product_id BETWEEN ${page * 30 - 29} AND ${page * 30} LIMIT ${count}`)
  .then(result => {
    res.status(200).send(result.rows)
  })
  .catch(err => {throw err})
};

exports.getProduct = (req, res) => {
  const sql = `SELECT p.*, f.feature, f.value FROM products p INNER JOIN products_features pf ON pf.product_id = p.product_id INNER JOIN features f ON pf.feature_id = f.feature_id WHERE p.product_id = ${req.params.product_id}`
  pool.query(sql)
    .then(result => {
      const infos = result.rows;
      const features = infos.map(info => {
        return {feature: info.feature, value: info.value}
      })
      const response = {
        product_id: infos[0].product_id,
        name: infos[0].name,
        slogan: infos[0].slogan,
        description: infos[0].description,
        category: infos[0].category,
        default_price: infos[0].default_price,
        features: features,
      }
      return response;
    })
    .then(response => res.status(200).send(response))
    .catch(err => res.status(400).send(err))
};

exports.getStyles = (req, res) => {
  const sql = `SELECT jsonb_agg(nested_results) AS results
  FROM (
    SELECT s.style_id, s.name, s.original_price, s.sale_price, s.default,
      (
        SELECT jsonb_agg(nested_photos)
        FROM (
          SELECT p.url, p.thumbnail_url
          FROM photos p
          WHERE p.style_id = s.style_id
        ) AS nested_photos
      ) AS photos
    FROM styles s WHERE s.product_id = ${req.params.product_id}
  ) AS nested_results`;
  let styles;
  const styleId = [];
  pool.query(sql)
    .then(data => {
      styles = data.rows[0].results;
      styles.forEach(style => styleId.push(style.style_id))
      const skusPromises = styleId.map(id => getSkus(id))
      return skusPromises;
    })
    .then(skusPromises => {
      Promise.all(skusPromises)
        .then(results => {
          for (let i = 0; i < styles.length; i++) {
            let skus = {};
            for (let j = 0; j < results[i].rows.length; j++) {
              skus[results[i].rows[j].skus_id] = {quantity: results[i].rows[j].quantity, size: results[i].rows[j].size}
            }
            styles[i].skus = skus;
          }
          const response = {product_id: req.params.product_id, results: styles};
          res.status(200).send(response);
        })
        .catch(err => {throw err})
    })
    .catch(err => {throw err})
}

exports.getRelated = (req, res) => {
  const sql = `SELECT related_product_id FROM related WHERE related.product_id = ${req.params.product_id}`;
  pool.query(sql)
    .then(result => {
      const response = [];
      result.rows.forEach(data => response.push(data.related_product_id));
      res.status(200).send(response);
    })
    .catch(err => res.status(400).send(err));
};

const getPhotos = (styleId) => {
  const sql = `SELECT image_url, thumbnail_url FROM photos WHERE style_id = ${styleId}`;
  const promise = new Promise ((resolve, reject) => {
    pool.query(sql)
      .then(result => resolve(result.rows))
      .catch(err => reject(err));
  })
  return promise;
}

const getSkus = (styleId) => {
  const sql = `SELECT skus_id, style_id, size, quantity FROM skus WHERE style_id = ${styleId}`;
  const promise = new Promise ((resolve, reject) => {
    pool.query(sql)
      .then(results => resolve(results))
      .catch(err => reject(err));
  })
  return promise;
}

// exports.getProduct = (req, res) => {
//   const firstSql = `SELECT * FROM products WHERE product_id = ${req.params.product_id}`
//   const secondSql = `SELECT f.feature, f.value FROM features f INNER JOIN products_features pf ON f.feature_id = pf.feature_id WHERE pf.product_id = ${req.params.product_id}`
//   pool.query(firstSql)
//     .then(result => {
//       const product = result.rows[0];
//       return product;
//     })
//     .then(product => {
//       pool.query(secondSql)
//         .then(result => {
//           const response = {...product, features: result.rows}
//           res.status(200).send(response);
//         })
//         .catch(err => res.status(400).send(err));
//     })
//     .catch(err => res.status(400).send(err))
// };

// exports.getStyles = (req, res) => {
//   const styleSql = `SELECT style_id, name, sale_price, original_price, default_style FROM styles WHERE product_id = ${req.params.product_id}`
//   const styleId = [];
//   const photoPromises = [];
//   const skusPromises = [];
//   let response = {
//     product_id: req.params.product_id,
//   }
//   let results;
//   pool.query(styleSql)
//     .then(styles => {
//       styles.rows.forEach(style => styleId.push(style.style_id));
//       for (let i = 0; i < styleId.length; i++) {
//         photoPromises.push(getPhotos(styleId[i]));
//         skusPromises.push(getSkus(styleId[i]));
//       }
//       results = styles.rows;
//     })
//     .then(() => {
//       Promise.all(photoPromises)
//         .then(images => {
//           for (let i = 0; i < images.length; i++) {
//             results[i].photos = images[i];
//           }
//         })
//         .then(() => {
//           Promise.all(skusPromises)
//             .then(data => {
//               for (let i = 0; i < styleId.length; i++) {
//                 let j = 0;
//                 const skus = {};
//                 while (j < data[i].rows.length) {
//                   skus[data[i].rows[j].skus_id] = {size: data[i].rows[j].size, quantity: data[i].rows[j].quantity};
//                   j++;
//                 }
//                 results[i].skus = skus;
//               }
//             })
//             .then(() => {
//               res.status(200).send({...response, results:results})
//             })
//         })
//     })
//     .catch(err => {
//       res.status(400).send(err)
//     });
// }