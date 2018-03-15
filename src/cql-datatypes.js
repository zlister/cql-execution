// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
// For backwards compatibility until FHIR models change references
const DT = require('./datatypes/datatypes');

for (let element of Object.keys(DT)) {
  module.exports[element] = DT[element];
}
