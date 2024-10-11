'use client'

import Check from '@/../public/images/Check.svg';
import Image from 'next/image';

export enum Status {
    ACTIVE = "active",
    PENDING = "pending",
    REJECTED = "rejected"
}

interface Props {
    title: string;
    description: string;
    status?: Status;
}

const NewCategory = ({ title, description, status = Status.ACTIVE }: Props) => {
    const statusPossibles = {
        active: <Image src={Check} alt="Active" />,
        pending: <Image src={Check} alt="Pending" />,
        rejected: <Image src={Check} alt="Rejected" />
    }

    return (
        <div className='min-w-[341px] w-[26vw] h-auto bg-[#ddd] flex p-3 rounded-lg'>
            <div className='flex items-center mr-4'>{statusPossibles[status]}</div>
            <div>
                <h2 className='font-bold'>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default NewCategory;
