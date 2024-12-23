import { toast } from 'react-toastify';

export const ToastiFy  = ({userInfo, message}) =>{
    return(
        <>
        {toast[userInfo](message)}
        </>
    )
}