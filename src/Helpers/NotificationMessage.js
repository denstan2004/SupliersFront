function NotificationMessage ({Close, message}){

    
    return(

        <div className='error-container'>
             <button onClick={Close} className='error-button'>x</button>
            <div className='error-message'>
            {message}
            </div>
           
        </div>
    )

}
export default NotificationMessage