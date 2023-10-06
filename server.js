const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./src/database/connect');
const router = require('./src/routes/routes');
const SingupRouter= require("./src/routes/AuthRouter");
const  FeebBackRouter = require("./src/routes/FeebBackRouter")
const path = require('path')
const cron = require('node-cron');
// pdf to word 

const multer = require('multer');
const fs = require('fs');
const { PythonShell}= require('python-shell')
const cors = require('cors'); 

// done 
const app = express();
const port = process.env.PORT || 3001;
connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// pdf to word 
var storage = multer.diskStorage({
  destination:function(req, file, cd){
      cd(null, "uploads")
  },
  filename:function(req, file, cd){
      cd(null,Date.now()+path.extname(file.originalname))
  }
})
var uploads = multer({storage:storage})
// controllers 
app.use("/api/compiler", router);
app.use("/api/timecomplexity", router)
app.use("/api/Auth",SingupRouter)
app.use("/api/feedback",FeebBackRouter)

// app.post("/api/pdftoword", uploads.single("pdf"), (req, res)=>{
//     if(!req.filxe){
//       res.status(400).json("No file uploaded");
//     }
//     const pysheel = new PythonShell("pyscript.py",{
//       mode:'text',
//       pythonPath:'python3',
//       scriptPath:__dirname,
//       args:[req.file.path]
      

//     })
//     pysheel.on('message', (message)=>{
//       console.log(message)
//     })
//     pysheel.on("error", (message)=>{
//       console.log(message)
//     })
//       pysheel.end((err)=>{
//         console.log(err)
//     })
//     const docFile =  req.file.path.replace(".pdf",".docx");
//     res.download(docFile,"converted.docx", (err)=>{

//     })

// })

app.post("/api/pdftoword", uploads.single('pdf'), (req, res) => {
  if (!req.file) {
    return res.status(400).json("No file uploaded");
  }

  const pysheel = new PythonShell("pyscript.py", {
    mode: 'text',
    pythonPath: 'python3',
    scriptPath: __dirname,
    args: [req.file.path],
  });

  pysheel.on('message', (message) => {
    console.log(message);
    
  });

  pysheel.on("error", (message) => {
    console.log(message);
   
  });
  pysheel.end((err) => {
    if (err) {
      console.log(err)
      return
    } 
      const   docFile = req.file.path.replace('.pdf',".docx");
      // console.log(docFile)
      return res.download(docFile, (err)=>{
        console.log(err)
      });
  });
 
});

// Cron job to delete files in the upload folder every day at midnight
cron.schedule('0 0 * * *', () => {
  const uploadPath = path.join(__dirname, 'uploads');

  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(uploadPath, file);

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error deleting file ${file}: ${unlinkErr}`);
        } else {
          console.log(`File ${file} deleted successfully`);
        }
      });
    });
  });
}, {
  scheduled: true,
  timezone: "UTC",
});

app.listen(port, () => {
  console.log(`App is listening on port http://localhost:${port}`);
});
