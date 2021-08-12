import { studentConstants } from '../constants';
import { airtablebase } from '../helpers/airtable';

export const studentactions = {
  login,
  logout,
};

function login(name) {
  return (dispatch) => {
    const class_array = [];
    dispatch(request(name));
    airtablebase('Students')
      .select({
        filterByFormula: `Name = "${name}"`,
      })
      .firstPage(function (err, records) {
        if (err) {
          // do something to handle error
        }
        if (records.length > 0) {
          const fields = records[0].fields;
          airtablebase('Classes')
            .select({
              filterByFormula:
                'OR(' +
                fields.Classes.map((id) => {
                  return `RECORD_ID()='${id}'`;
                }).join(',') +
                ')',
            })
            .eachPage(
              function page(records, fetchNextPage) {
                records.forEach((record) => {
                  let class_data = {
                    name: record.get('Name'),
                    students: record.get('Students'),
                    student_name: 'asdfasdf',
                  };
                  class_array.push(class_data);
                });

                fetchNextPage();
              },
              function done(err) {
                if (err) {
                }

                const start = async () => {
                  await asyncForEach(class_array, async (item, index) => {
                    const students = await get_students(item.students);
                    class_array[index]['student_name'] = students;
                  });
                  dispatch(success(class_array));
                };

                start();
              }
            );
        } else {
        }
      });
  };

  function request(name) {
    return { type: studentConstants.SET_STUDENT, name };
  }

  function success(records) {
    return { type: studentConstants.SET_CLASSES, records };
  }
}

function logout() {
  return { type: studentConstants.LOGOUT };
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function get_students(students) {
  return new Promise((resolve) => {
    const student_array = [];
    airtablebase('Students')
      .select({
        filterByFormula:
          'OR(' +
          students
            .map((id) => {
              return `RECORD_ID()='${id}'`;
            })
            .join(',') +
          ')',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            student_array.push(record.get('Name'));
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) {
          }
          resolve(student_array);
        }
      );
  });
}
