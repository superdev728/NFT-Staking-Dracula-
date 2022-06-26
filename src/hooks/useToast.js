import { toast } from 'material-react-toastify';

export const houseSuccess = (toastContent) => {
    toast.success(toastContent);
}

export const houseInfo = (toastContent) => {
    toast.info(toastContent);
}

export const houseWarning = (toastContent) => {
    toast.warning(toastContent);
}

export const houseError = (toastContent) => {
    toast.error(toastContent);
}