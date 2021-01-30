const mongoose = require('mongoose');
const { isEmail, isAlpha, isInt } = require('validator');
const Report = require("./Report");

const tankSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
       
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
      },

    area: {
        type: String,
        required: [true, 'Please enter an area'],       
        lowercase: true
      },

    no: {
        type: String,       
        validate: [isInt , 'Please enter a valid value']

        },
    
    tds:{
        type: String,
        required: [true, 'Please enter tds count'],
        validate: [isInt , 'Please enter a valid value'],
        default: '0'
    },

    turbidity:{
        type: String,
        required: [true, 'Please enter turbidity count'],
        validate: [isInt , 'Please enter a valid value'],
        default: '0'
    },

    level:{
        type: String,
        required: [true, 'Please enter level'],
        validate: [isInt , 'Please enter a valid value'],
        default: '0'
    },

    usage:{
        type: String,
        required: [true, 'Please enter usage'],
        validate: [isInt , 'Please enter a valid value'],
        default: '0'
    },

    issue:{
        type: Boolean,
        default: false
    },
    
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
  });

 
/*
  tankSchema.post('save', function(){
    now = new Date();

    email = this.email;
    no = this.no;
    day = ((now).getDate());

    Report.find({
        email: email, no : no // search query
      },{ "_id":0, "email": 0, "__v": 0})

      .then(report => {
        data = report.monthlyUsage;

        if(day == 1)
        {
            for(i = 0; i < 31; i++)
            {
                data[i] = 0;
            }
        }

        console.log(typeof(data))
        console.log("28: "+ this.usage)
        data[day - 1] = this.usage;
        

        Report.updateOne({ email: email, no: no }, { monthlyUsage: data }, function(err,
            result)
            {
              if (err) 
                {
                  console.error(err);
                } 
              else 
                {
                    console.log("successfully updated");
                }
            });
      })
      .catch(err => {
        console.error(err)
        //res.status(400).json({ err: "error" });
      })


   
  });
     /* 
    now = new Date();

    email = this.email;
    no = this.no;
    day = ((now).getDate());

    Report.find({
        email: email, no : no // search query
      },{ "_id":0, "email": 0, "__v": 0})

      .then(report => {
        data = report.monthlyUsage;

        if(day == 1)
        {
            for(i = 0; i < 31; i++)
            {
                data[i] = 0;
            }
        }

        console.log(typeof(data))
        console.log("28: "+ this.usage)
        data[day - 1] = this.usage;
        

        Report.updateOne({ email: email, no: no }, { monthlyUsage: data }, function(err,
            result)
            {
              if (err) 
                {
                  console.error(err);
                } 
              else 
                {
                    console.log("successfully updated");
                }
            });
      })
      .catch(err => {
        console.error(err)
        //res.status(400).json({ err: "error" });
      })

*/
    


  tankSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) 
    {
        this.created_at = now
    }
    next();
    });


const Tank = mongoose.model('tank', tankSchema);

module.exports = Tank;