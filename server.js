const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ankush@12',
    database: 'CollegeERP'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Get All Students
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add Student
app.post('/students', (req, res) => {
    const { name, department, email, phone } = req.body;
    db.query(
        'INSERT INTO students (name, department, email, phone) VALUES (?, ?, ?, ?)',
        [name, department, email, phone],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Student added', id: result.insertId });
        }
    );
});

app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, department, email, phone } = req.body;

    db.query(
        'UPDATE students SET name = ?, department = ?, email = ?, phone = ? WHERE id = ?',
        [name, department, email, phone, id],
        (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.json({ message: 'Student details updated' });
        }
    );
});

// Delete Student
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Student deleted' });
    });
});

// Get All Teachers
app.get('/teachers', (req, res) => {
    db.query('SELECT * FROM teachers', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add Teacher
app.post('/teachers', (req, res) => {
    const { name, department, email, phone } = req.body;
    db.query(
        'INSERT INTO teachers (name, department, email, phone) VALUES (?, ?, ?, ?)',
        [name, department, email, phone],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Teacher added', id: result.insertId });
        }
    );
});

// Update Teacher
app.put('/teachers/:id', (req, res) => {
    const { id } = req.params;
    const { name, department, email, phone } = req.body;

    db.query(
        'UPDATE teachers SET name = ?, department = ?, email = ?, phone = ? WHERE id = ?',
        [name, department, email, phone, id],
        (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Teacher not found' });
            }
            res.json({ message: 'Teacher details updated' });
        }
    );
});

// Delete Teacher
app.delete('/teachers/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM teachers WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Teacher deleted' });
    });
});

// Summary endpoint for students and teachers
app.get('/summary', (req, res) => {
    const summaryData = {
        totalStudents: 0,
        totalTeachers: 0,
        departments: {}
    };

    db.query('SELECT COUNT(*) AS total FROM students', (err, studentResult) => {
        if (err) throw err;
        summaryData.totalStudents = studentResult[0].total;

        db.query('SELECT COUNT(*) AS total FROM teachers', (err, teacherResult) => {
            if (err) throw err;
            summaryData.totalTeachers = teacherResult[0].total;

            db.query(`
                SELECT department, 
                       COUNT(*) AS studentCount 
                FROM students 
                GROUP BY department
            `, (err, studentDeptResult) => {
                if (err) throw err;
                summaryData.departments.students = studentDeptResult;

                db.query(`
                    SELECT department, 
                           COUNT(*) AS teacherCount 
                    FROM teachers 
                    GROUP BY department
                `, (err, teacherDeptResult) => {
                    if (err) throw err;
                    summaryData.departments.teachers = teacherDeptResult;

                    res.json(summaryData);
                });
            });
        });
    });
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
