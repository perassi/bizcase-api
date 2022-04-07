// Script file to generate SQL creating kpi_lib data 
// to kpi_libs table of kpi database using yml file

/*
 * sample
 * node utils/parse-kpi-yml.js path/to/ymlfile.yml
 */

const YAML = require('yamljs');
const tableName = 'kpi_libs';
const createRecord = (record) => (
  `INSERT INTO "${tableName}"("label", "kpi") VALUES ('${record.label}', '${JSON.stringify(record.kpi)}');`
);



if (process.argv.length <= 2) {
  console.log('YML file is required. Command should look');
  console.log('node script/path.js path/to/yml');
  process.exit(1);
}

const nativeObject = YAML.load(process.argv[2]);

let kpiRecords = [];

Object.keys(nativeObject).forEach(key => {
  const records = nativeObject[key];
  records.forEach(record => {
    let exists = kpiRecords.find(el => el.label === record.label);

    if (!exists) {
      kpiRecords.push({
        label: record.label || '',
        kpi: {
          formula: record.formula,
          variables: record.variables,
          type: record.type || '',
        },
      })
    }
  })
});

let query = kpiRecords.reduce((query, rec) => query += createRecord(rec) + '\n', '');

console.log(query);