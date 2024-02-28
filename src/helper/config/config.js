module.exports={
    SWAGGERPORT: process.env.PORT || "localhost:8888",
  
    //--------------------- JWT Auth Key -----------------
    auth: {
        secret: "our-secret-key",
    },
}