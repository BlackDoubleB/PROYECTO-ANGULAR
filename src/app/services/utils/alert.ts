import Swal, { SweetAlertIcon } from 'sweetalert2';

export const alertAsync = async (options: IMessagePopupOptions) => {
  const result = await Swal.fire({
    title: options.title,
    text: options.text,
    icon: options.icon ?? 'info',
    showDenyButton: options.showDenyButton ?? true,
    confirmButtonColor: options.confirmButtonColor ?? '#F88101',
    denyButtonColor: options.denyButtonColor ?? '#81898b',
    denyButtonText: options.denyButtonText ?? 'Cancelar',
    confirmButtonText: options.confirmButtonText ?? 'Aceptar',
  });

  if (result.isConfirmed) {
    return true;
  } else if (result.isDenied || result.isDismissed) {
    return false;
  }

  return false;
};

interface IMessagePopupOptions {
  title: string;
  text: string;
  icon?: SweetAlertIcon;
  showDenyButton?: boolean;
  confirmButtonColor?: string;
  denyButtonColor?: string;
  denyButtonText?: string;
  confirmButtonText?: string;
}
