const fs = require('fs');

let dropProductId = ['0', '2', '4', '5', '10'];
let dropStyleId = ['7', '8', '9', '10', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '47', '48', '49', '50', '51', '52'];

//Read and write products.csv

// fs.readFile('./rawData/product.csv','utf8', (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   const rows = data.split('\n');
//   const colName = rows[0];
//   const records = rows.slice(1);
//   const dataEntry = records.map(record => record.split(','));
//   const spaceRegex = /^\s+|\s+$/g;
//   const notNumberRegex = /\D+/g;
//   //drop record with extra column
//   const withoutExtraCol = dataEntry.filter(data => {
//     if (data.length === 6) {
//       return data;
//     } else {
//       dropProductId.push(data[0])
//     }
//   })
//   const extraColData = dataEntry.filter(data => data.length > 6)
//   //trim extra space
//   const trimData = withoutExtraCol.map(row => {
//     return row.map(entry => {
//       return entry.replace(spaceRegex, '');
//     })
//   })
//   //get rid of string in integer column
//   const valid = trimData.map(data => {
//     return [...data.slice(0, 5), data[5].replace(notNumberRegex, '')];
//   })
//   valid.unshift(colName);
//   const clean = valid.join('\n');
//   fs.writeFile('./cleanData/product_clean.csv', clean, (err) => {
//     if (err) throw err;
//     console.log('File created')
//   })
// })

//read and write styles.csv

// fs.readFile('/Users/kevinliu/Desktop/SDC/rawData/styles.csv', 'utf8', (err, data) => {
//   if (err) throw err;

//   const rows = data.split('\n');
//   let dataEntrys = rows.map(record => record.split(','));
//   dataEntrys = dataEntrys.filter(data => {
//     return dropProductId.indexOf(data[1]) === -1;
//   })
//   dataEntrys.forEach(row => {
//     if (row[3] === 'null') {
//       row[3] = '';
//     }
//   })
//   const clean = dataEntrys.map(entry => entry.join(',')).join('\n');
//   fs.writeFile('/Users/kevinliu/Desktop/SDC/cleanData/styles_clean.csv', clean, (err) => {
//     if (err) throw err;
//     console.log('File created');
//   })
// })

//Read and write features.csv

// fs.readFile('./rawData/features.csv', 'utf8', (err, data) => {
//   if (err) throw err;
//   let results = {};
//   const duplicateRegex = /^\d+,/g;
//   const productIdRegex = /,.+/g;
//   const rows = data.split('\n');
//   let rmId = rows.map(row => row.replace(duplicateRegex, '').split(','));
//   let rmProduct = rmId.filter(row => {
//     return dropProductId.indexOf(row[0]) === -1;
//   })
//   rmProduct = rmProduct.map(row => row.join(','));
//   rmProduct.forEach(row => {
//     if (results[row] === undefined) {
//       results[row] = row;
//     }
//   })
//   let feature_id = 0;
//   const feature_product = Object.keys(results).map(row => {
//     let array = [row.replace(productIdRegex, '')];
//     feature_id++
//     return [feature_id.toString(), ...array].join(',');
//   }).join('\n');
//   fs.writeFile('./cleanData/feature_product.csv', feature_product, (err) => {
//     if (err) throw err;
//     console.log('File created');
//   })
//   const clean = Object.keys(results).map(row => row.replace(duplicateRegex, '')).join('\n');
//   fs.writeFile('./cleanData/features_clean.csv', clean, (err) => {
//     if (err) throw err;
//     console.log('File created');
//   })
// })


//Read and write photos.csv

// const readPhotosStream = fs.createReadStream('./rawData/photos.csv', {encoding:'utf8', start:3000000001, end:4000000000});
// readPhotosStream.on('data', (data) => {
//   let rows = data.split('\n').slice(1);
//   const idRegex = /^\d+,/g;
//   rows = rows.map(row => row.replace(idRegex, ''));
//   const dataEntrys = rows.map(row => row.split(','));
//   const rmStyle = dataEntrys.filter(entry => {
//     return dropStyleId.indexOf(entry[0]) === -1;
//   })
//   const rmNull = rmStyle.filter(entry => {
//     return (!entry.includes("'null'") && !entry.includes(undefined));
//   });
//   let rmCol = rmNull.filter(row => row.length === 3);
//   rmCol = rmCol.filter(row => row[1].includes('http') && row[2].includes('http'))
//   const addQuatation = rmCol.map(row => {
//     const urLastIndex = row[1].length - 1;
//     const thumbnaiLastIndex = row[2].length - 1;
//     if (row[1][urLastIndex] !== '"') {
//       row[1] = row[1] + '"';
//     }
//     if (row[2][thumbnaiLastIndex] !== '"') {
//       row[2] = row[2] + '"';
//     }
//     return row;
//   })
//   let clean = addQuatation.map(row => row.join(','));
//   clean = clean.join('\n');
//   clean = clean + '\n';
//   fs.appendFile('./photos_clean4.csv', clean, (err) => {
//     if (err) throw err;
//   })
// })


//Read and write skus.csv

// const readSkusStream = fs.createReadStream('./rawData/skus.csv', 'utf8');
// readSkusStream.on('data', (data) => {
//   let rows = data.split('\n');
//   const rmIdRegex = /^\d+,/g;
//   rows = rows.map(row => row.replace(rmIdRegex, ''));
//   const dataEntrys = rows.map(row => row.split(','));
//   const rmExtraCol = dataEntrys.filter(row => row.length === 3)
//   const rmStyle = rmExtraCol.filter(entry => {
//     return dropStyleId.indexOf(entry[0]) === -1;
//   })
//   const rmNull = rmStyle.filter(entry => {
//     return !entry.includes("'null'");
//   });
//   let clean = rmNull.map(row => row.join(',')).join('\n');
//   clean = clean + '\n';
//   fs.appendFile('./cleanData/skus_clean.csv', clean, (err) => {
//     if (err) throw err;
//   })
// })




//Read and write related.csv

// fs.readFile('/Users/kevinliu/Desktop/SDC/rawData/related.csv', 'utf8', (err, data) => {
//   if (err) throw err;
//   const rows = data.split('\n');
//   const dataEntrys = rows.map(row => row.split(','));
//   const rmProducts = dataEntrys.filter(row => {
//     return dropProductId.indexOf(row[1]) === -1 && dropProductId.indexOf(row[2]) === -1;
//   })
//   let clean = rmProducts.map(row => row.join(','));
//   clean = clean.join('\n');
//   fs.writeFile('/Users/kevinliu/Desktop/SDC/cleanData/related.csv', clean, (err) => {
//     if (err) throw err;
//     console.log('File created');
//   })
// })