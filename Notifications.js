import React, { useEffect, useState } from 'react';

export default function Notifications() {

  const [notifications,setNotifications] =
    useState([]);

  const [loading,setLoading] =
    useState(true);

  useEffect(()=>{

    async function loadNotifications(){

      try{
        const response = await fetch(
          'http://localhost:8000/notifications'
        );

        const data =
          await response.json();

        setNotifications(data || []);

      } catch(error){
        console.log(error);
      } finally{
        setLoading(false);
      }

    }

    loadNotifications();

  },[]);


  function getStyle(type){

    if(type==="critical"){
      return {
        background:'#f8d7da',
        color:'#721c24'
      };
    }

    return {
      background:'#fff3cd',
      color:'#856404'
    };

  }

  return (
    <div className="page-container">

      <h1
        style={{
          marginBottom:'25px',
          color:'#2c3e50'
        }}
      >
        Notifications
      </h1>

      <div className="card">

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length===0 ? (
        <p>
          No active notifications.
        </p>
      ) : (

        notifications.map(
          (note,index)=>(
            <div
              key={index}
              style={{
                ...getStyle(
                  note.type
                ),
                padding:'18px',
                borderRadius:'8px',
                marginBottom:'15px',
                fontWeight:'500'
              }}
            >
              {note.message}
            </div>
          )
        )

      )}

      </div>

    </div>
  );
}