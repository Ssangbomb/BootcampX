const { Pool } = require('pg');

const pool = new Pool({
  user: 'boom',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2];
const value = `%${cohort}%`
const numbOFstudents = process.argv[3];
const query = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students 
JOIN cohorts ON cohorts.id = cohort_id WHERE cohorts.name like $1
LIMIT $2;
`

pool.query(query, [value, numbOFstudents])
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack)); 