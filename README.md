# React Budget App

This repository contains a React application to manage incomes, expenses, and saving targets. The application is built using TypeScript and focuses on fundamental concepts.

**Link:** [Budget app](https://faizan-budgetapp.netlify.app/)

- [x] Create UI for a one-page application to store incomes, expenses, and saving targets, saving amount.
- [x] Implement features to add income sources, value and date.
- [x] Implement features to add expense sources, value, and date.
- [x] Implement features to add the value of the target saving.
- [x] Implement features to add the value of the saving amount.
- [x] Display a summary section showing total income, total expenses, target saving amount, and current saving amount.
- [x] Use CSS modules or styled-components or anything you prefer to style the application components.
- [x] Depoly the app on netlify or vercel or anywhere you prefer and then add the link to the PR.
---
- [x] Calculate the account balance using the formula: income - expense - saving = balance.
- [x] Implement a feature to transfer the balance amount to the saving amount.
- [x] Calculate the total of the current saving and the percentage of the current saving amount / target of saving.
- [x] Add a delete button to remove items in income and expense sources.
- [x] Validate the input income, expense, target of income, and saving account. They should be positive numbers. In case the user enters a negative number, display an error message. Use React Hook Form and Zod to apply validation
- [x] Implement local storage to persist data so that it remains available even after a page refresh.
 ---
- [x] Apply React Router so when users access "/budget-app", it will render the Budget component.
- [x] Implement a chart to visualize the incomes and expenses using a library like react-chartjs-2 or recharts.
- [x] Add a feature to export the income and expense data to a CSV file.
---
**Additional Features:**
- Added a transfer button, which transfers all balance to savings and vice versa by clicking the icon.
- Handled all edge cases for negative balance to the best of my knowledge. 

**Additional Features:**
- Certain things like routing is only implemented for the sake of learning and experimenting.
