//modules of dependencies 
const multer = require('multer');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose=require("mongoose");
const express=require("express")

//importing  the models 
const Agent = require('../models/agentSchema');
const Task = require('../models/tasks');

const taskapp = express();
taskapp.use(cors());
taskapp.use(express.json());

// Multer Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
  }); 

  
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /csv|xlsx|xls/;
      const isValid = filetypes.test(path.extname(file.originalname).toLowerCase());
      isValid ? cb(null, true) : cb(new Error("Only CSV, XLSX, XLS files allowed!"));
    }
  });

  //upload file route

  taskapp.post('/upload-tasks', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const filePath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
  
      // Fetch agents
      const agents = await Agent.find();
      if (agents.length === 0) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ message: "No agents found to assign tasks." });
      }
  
      let records = [];
  
      if (ext === '.csv') {
        await new Promise((resolve, reject) => {
          fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
              records.push(data);
            })
            .on('end', resolve)
            .on('error', reject);
        });
      } else if (ext === '.xlsx' || ext === '.xls') {
        const workbook = xlsx.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        records = xlsx.utils.sheet_to_json(worksheet);
      } else {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: 'Unsupported file format. Only csv, xlsx, xls allowed.' });
      }
  
      // Debug log raw records
      console.log('Raw records:', records);
  
      // Normalize and filter records
      records = records.map(r => ({
        firstName: r.FirstName || r.firstname || r.firstName || '',
        phone: r.Phone || r.phone || '',
        notes: r.Notes || r.notes || '',
      })).filter(r => r.firstName && r.phone && r.notes);
  
      // Debug log normalized records
      console.log('Normalized records:', records);
  
      if (records.length === 0) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: "No valid records found in the file." });
      }
  
      // Distribute tasks equally among agents
      const agentCount = agents.length;
  
      const taskPromises = records.map((record, index) => {
        const assignedAgent = agents[index % agentCount];
        return Task.create({
          firstName: record.firstName,
          phone: record.phone,
          notes: record.notes,
          agentId: assignedAgent._id
        });
      });
  
      await Promise.all(taskPromises);
  
      fs.unlinkSync(filePath); // remove uploaded file after processing
  
      res.json({ message: "Tasks assigned successfully to agents." });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error processing file." });
    }
  });


  taskapp.get('/tasks-by-agent', async (req, res) => {
    try {
      const tasks = await Task.find().populate('agentId');
  
      // Group tasks by agent
      const groupedTasks = {};
  
      tasks.forEach(task => {
        const agentName = task.agentId ? task.agentId.name : 'Unassigned';
        if (!groupedTasks[agentName]) {
          groupedTasks[agentName] = [];
        }
        groupedTasks[agentName].push({
          firstName: task.firstName,
          phone: task.phone,
          notes: task.notes
        });
      });
  
      res.json(groupedTasks);
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch tasks." });
    }
  });


  

  module.exports=taskapp
