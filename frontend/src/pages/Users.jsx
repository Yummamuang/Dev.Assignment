// import React
import { useState, useEffect } from 'react'

// import components
import {Table, Spacing30px, UserDetail} from "../components";

function Users() {
  // * define state *
  const [userId, setUserId] = useState(null);

  // handle on after update
  useEffect(() => {
    const userUpdated = JSON.parse(localStorage.getItem('userUpdated'));
    if (userUpdated?.success) {
      setUserId(userUpdated?.userId);
      localStorage.removeItem('userUpdated');
    }
  }, []);

  return (
    <div>
      <Table setUserId={setUserId}/>
      <Spacing30px />
      {userId && <UserDetail userId={userId} setUserId={setUserId}/> } 
    </div>
  )
}

export default Users