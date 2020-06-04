import React from 'react';


const Inventory = () => {

    const handleAddInventory = () =>{
    //   const product = fakeData[0];
    //   console.log("before post",product);
      

    //  fetch('http://localhost:4200/addProduct',{
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
       
    //     headers: {
    //       'Content-Type': 'application/json'
      
    //     },
        
    //     body: JSON.stringify(fakeData) // body data type must match "Content-Type" header
    //   })
    //   .then(res => res.json())
    //   .then(data =>{
    //       console.log('post successful ', data);
          
    //   })
      
        
   }
    return (
        <div>
            <h1>Inventory Is Camming soon</h1>
             <button onClick={handleAddInventory}>Add Inventory</button>
        </div>
    );
};

export default Inventory;