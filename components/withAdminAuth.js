import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const withAdminAuth = (WrappedComponent) => {

    const ProtectedComponent = (props) => {
        const router = useRouter();
        const [authorized, setAuthorized] = useState(false);

        useEffect(() => {
            const myuser = localStorage.getItem("myuser");
            if (myuser) {
                const user = JSON.parse(myuser);
                if (user?.token && user?.role === 'admin') {
                    setAuthorized(true);
                }
                else {
                    router.replace("/admin/login");
                }
            }
            else {
                router.replace("/admin/login");
            }
        }, []);

        if(!authorized){
            return <div className='text-center mt-20 text-gray-700 font-bold'>Checking Admin Access...</div>
        }

        return <WrappedComponent {...props} />;
    };
    return ProtectedComponent;
}

export default withAdminAuth;