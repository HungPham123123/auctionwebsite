import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useAuthToken = () => {
    const [hasToken, setHasToken] = useState(!!Cookies.get('token'));

    useEffect(() => {
        const checkToken = () => {
            setHasToken(!!Cookies.get('token'));
        };

        // Check the token initially
        checkToken();

        // Set up a MutationObserver to listen for changes in cookies
        const observer = new MutationObserver(checkToken);
        observer.observe(document, { attributes: true, childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    return hasToken;
};

export default useAuthToken;
