drop database if exists CollegeERP;
CREATE DATABASE CollegeERP;
USE CollegeERP;

-- Table for Students
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(20),
    email VARCHAR(50),
    phone VARCHAR(15)
);
select * from students;

-- Table for Teachers
CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(20),
    email VARCHAR(50),
    phone VARCHAR(15)
);
select * from teachers;
