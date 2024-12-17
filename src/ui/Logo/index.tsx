import Image from 'next/image';
import LogoCasino from '../../../public/Logo.svg';
export const Logo =()=>{
    return (
        <div className="flex items-start">
            <Image src={LogoCasino} alt="logo" width={180} height={180}/>
        </div>
    )
}