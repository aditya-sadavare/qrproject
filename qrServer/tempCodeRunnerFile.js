app.post("/addqr",(req,res)=>{
  let {username,orgUrl}=req.body
  let uniqueId = uuid.v4();
  console.log(orgUrl)
  qrModel.findOne({ username, orgUrl })
    .then((qr) => {
      if (qr) {
        res.json("URL already exists");
      } else {
        qrModel
        .create({ uniqueId,username, orgUrl}) 
        .then(() => res.json({msg:"URL added successfully",uid:uniqueId}));
    }
    })
    .catch((err) => res.json("Error: " + err));
})