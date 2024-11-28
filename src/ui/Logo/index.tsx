import Image from 'next/image';
import LogoCasino from '../../../public/Logo.svg';
export const Logo =()=>{
    return (
        <div className="h-[24rem] flex items-center justify-center mt-10">
            <Image src={LogoCasino} alt="logo" width={180} height={180}/>
        </div>
    )
}