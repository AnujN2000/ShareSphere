import User from "../models/User";

// read
export const getUser = async (req,res) =>{
    try{
      const {id}= req.params;
      const user= await User.findById(id);
      res.status(200).json(user);
    }
    catch(err){
      res.status(404).json({message:err.message});
    }
}

export const getUserFriends = async (req,res) =>{
    try{
        const {id}= req.params;
        const user= await User.findById(id);

        // promise.all because we are making multiple api calls
        const friends= await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );

        const formattedFriends=friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath})=>{
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        return res.status(200).json(formattedFriends);
      }
      catch(err){
        res.status(404).json({message:err.message});
      }
};

// update
export const addRemoveFriend = async (req, res)=>{
    try{
       const {id,friendId} =req.params;
       const user= await User.findById(id);
       const friend= await User.findById(friendId);
    //    logic to remove and add
       if(!user.friends.includes(friendId)){
        user.friends= user.friends.filter((id)=>id!==friendId);
        friend.friends = friend.friends.filter((id) => id!==id);
       }else{
        user.friends.push(friendId);
        friend.friends.push(id);
       }
       await user.save();
       await friend.save();
        
       const friends= await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );

        const formattedFriends=friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath})=>{
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(401).json({message:err.message}); 
    }
}