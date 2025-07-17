import { cn } from "@/lib/utils";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { MdOutlineQrCode2 } from "react-icons/md";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const MasterCardIcon = ({ className, ...rest }: IconProps) => (
  <FaCreditCard className={cn("w-5 h-5", className)} {...rest} />
);

export const CashIcon = ({ className, ...rest }: IconProps) => (
  <FaMoneyBill1Wave className={cn("w-5 h-5", className)} {...rest} />
);

export const QRCodeIcon = ({ className, ...rest }: IconProps) => (
  <MdOutlineQrCode2 className={cn("w-5 h-5", className)} {...rest} />
);