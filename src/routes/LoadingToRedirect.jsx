import React,{ useEffect,useState } from 'react'
import { Navigate } from 'react-router-dom'


const LoadingToRedirect = () => {
    const [ count, setCount ] = useState(3)
    const [ redirect,setRedirect ] = useState(false)

    useEffect(()=>{
            const interval = setInterval(()=>{
                setCount((currentCount)=>{
                        if(currentCount===1){
                           clearInterval((interval))
                            setRedirect(true)
                        }
                        return currentCount -0.5
                })

            },2000)

            return () => clearInterval(interval)
    },[])

    if(redirect){
        return <Navigate to={'/'} />
    }

  return (
    <div>No Permistion, Redirect in {count}</div>
  )
}

export default LoadingToRedirect