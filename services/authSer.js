export const auth = async() => {
  if(!localStorage["token"]){
    return window.location.href = "login.html"
  }
  let myData = await axios.get("/users/auth",{
  // let myData = await axios.get("http://localhost:5000/users/auth",{
    headers: {
      "x-auth-token": localStorage["token"],
    }
  })
  console.log(myData);
  try{
    return myData.data
  }
  catch(err){
    alert("Token invalid or expired please try login again");
    localStorage.removeItem("token");
    return window.location.href = "login.html"
  }


  
}


// setInterval(()=>{
//   auth();
// },432000)