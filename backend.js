const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let employees = [];
let idCounter = 1;

// Get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Create a new employee
app.post('/employees', (req, res) => {
  const { name, role } = req.body;
  const employee = { id: idCounter++, name, role };
  employees.push(employee);
  res.status(201).json(employee);
});

// Update an employee
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;
  const employee = employees.find(emp => emp.id === parseInt(id));
  
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employee.name = name;
  employee.role = role;
  res.json(employee);
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  employees = employees.filter(emp => emp.id !== parseInt(id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
