const { json } = require("body-parser");
const e = require("express");
const fs = require("fs");
 
const getUsers = (req, res) => {
 fs.readFile("./users.json", (err, data) => {
   if (err) {
     fs.writeFileSync("./users.json", "[]");
     res.json([]).status(200);
   } else {
     if (req.params.passportID) {
       const filteredUsers = JSON.parse(data).filter(
         (user) => user.passportID === req.params.passportID
       );
       res.json(filteredUsers).status(200);
     } else if (req.params.amount) {
       const filteredUsers = JSON.parse(data).filter(
         (user) => user.amount === parseInt(req.params.amount)
       );
       res.json(filteredUsers).status(200);
     } else if (req.params.credit) {
       const filteredUsers = JSON.parse(data).filter(
         (user) => user.credit === parseInt(req.params.credit)
       );
       res.json(filteredUsers).status(200);
     } else {
       res.json(JSON.parse(data)).status(200);
     }
   }
 });
};
 
const addUser = (req, res) => {
 if (!req.body.passportID) return res.status(400).json({ error: "the passportID is empty" });
   const newUser = {
     passportID: req.body.passportID,
     amount: req.body.amount || 0,
     credit: req.body.credit || 0,
   };
   fs.readFile("./users.json", (err, data) => {
     if (err) {
       fs.writeFileSync("./users.json", "[]");
       res
         .json({ error: "the users json doesn't exist. creating new one.." })
         .status(409);
     } else {
       fs.writeFile(
         "./users.json",
         JSON.stringify([...JSON.parse(data), newUser]),
         (err) => {
           if (err) {
             res.json({ error: err }).status(400);
           } else {
             res.json({ status: "done" }).status(200);
           }
         }
       );
     }
   });
};
 
 
const depositCash = (req, res) => {
   if(!req.body.amount || !req.body.passportID) return res.json({error: "the amount/passportID is empty."}).status(400)
   fs.readFile('./users.json', (err, data) => {
       if(err) {
           fs.writeFileSync("./users.json", "[]");
       res
         .json({ error: "the users json doesn't exist. creating new one.." })
         .status(409);
       }
       else {
           let selectedUser = (JSON.parse(data)).filter(user => req.body.passportID === user.passportID)
           if(selectedUser.length == 0) return res.json({error: "the user doesn't exist."})
           data = (JSON.parse(data)).filter(user => req.body.passportID !== user.passportID)
           selectedUser[0].amount += req.body.amount
           fs.writeFile('./users.json', JSON.stringify([...data, ...selectedUser]), (err) => {
               if(err) return res.json({error: "error while writing the file"}).status(409)
               res.status(200).json("amount added successfuly!")
           })
       }
   })
}
 
const updateCredit = (req, res) => {
   if(!req.body.credit || !req.body.passportID) return res.json({error: "the credit/passportID is empty."}).status(400)
   fs.readFile('./users.json', (err, data) => {
       if(err) {
           fs.writeFileSync("./users.json", "[]");
       res
         .json({ error: "the users json doesn't exist. creating new one.." })
         .status(409);
       }
       else {
           let selectedUser = (JSON.parse(data)).filter(user => req.body.passportID === user.passportID)
           if(selectedUser.length == 0) return res.json({error: "the user doesn't exist."})
           data = (JSON.parse(data)).filter(user => req.body.passportID !== user.passportID)
           selectedUser[0].credit = req.body.credit
           fs.writeFile('./users.json', JSON.stringify([...data, ...selectedUser]), (err) => {
               if(err) return res.json({error: "error while writing the file"}).status(409)
               res.status(200).json("credit updated successfuly!")
           })
       }
   })
}
 
 
const withdraw = (req, res) => {
   if(!req.body.amount || !req.body.passportID) return res.json({error: "the amount/passportID is empty."}).status(400)
   fs.readFile('./users.json', (err, data) => {
       if(err) {
           fs.writeFileSync("./users.json", "[]");
       res
         .json({ error: "the users json doesn't exist. creating new one.." })
         .status(409);
       }
       else {
           let selectedUser = (JSON.parse(data)).filter(user => req.body.passportID === user.passportID)
           if(selectedUser.length == 0) return res.json({error: "the user doesn't exist."})
           data = (JSON.parse(data)).filter(user => req.body.passportID !== user.passportID)
           if (req.body.amount > selectedUser[0].amount + selectedUser[0].credit) return res.json("not enough money.").status(400)
           selectedUser[0].amount -= req.body.amount
           fs.writeFile('./users.json', JSON.stringify([...data, ...selectedUser]), (err) => {
               if(err) return res.json({error: "error while writing the file"}).status(409)
               res.status(200).json("cash withdrawed successfuly!")
           })
       }
   })
}
 
 
module.exports = {
 getUsers,
 addUser,
 depositCash,
 updateCredit,
 withdraw
};
