interface IDataTableCalls {
  value: string
}

interface IDataTableRows {
  cells: IDataTableCalls[],
}
interface IDataTable {
  rows: IDataTableRows[],
}

const { I } = inject();
// Add in your custom step files

// Given('I have a defined step', () => {
//   // TODO: replace with your own step
// });

Given('I am on login page', () => {
  I.amOnPage('/login');
});

// When('I enter form fields:', (userData: IDataTable) => {
//   userData.rows.forEach((row) => {
//     const [fieldName, fieldValue] = row.cells;
//
//     I.fillField(fieldName.value, fieldValue.value);
//   });
// });
//
// When('I click {string} button', (text: string) => {
//   I.click(`//button[contains(text(), '${text}')]`);
// });

Then('I see {string} in user menu.', (username: string) => {
  // const text = `Hello, ${username}`;
  //
  // I.see(text.toUpperCase());
  I.see(`//button[contains(text(), 'login')]`);
});
