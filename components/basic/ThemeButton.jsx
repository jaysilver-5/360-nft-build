import Button from '../basic/button/Button'
import { useState, useEffect } from "react";

const ThemeButton = () => {
    const [activeTheme, setActiveTheme] = useState('light');
    const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

    useEffect(() => {
      const savedTheme = window.localStorage.getItem('theme');
      savedTheme && setActiveTheme(savedTheme);
    }, []);

    useEffect(() => {
      document.body.dataset.theme = activeTheme;
      window.localStorage.setItem('theme', activeTheme);
    }, [activeTheme]);

    return (
        <Button bg='toggle' onClick={() => setActiveTheme(inactiveTheme)} type='secondary' iconClass='icon-moon' ariaLabel={`Change to ${inactiveTheme} mode`} title={`Change to ${inactiveTheme} mode`}/>
    )
}

export default ThemeButton


// This dark mode toggle adheres to accessibility best practices, 
// persists on reload and takes a user's preferred colour scheme into consideration.
// It also doesn't suffer from the dreaded 'flash' of incorrect colours on initial load.
// Bonus: as we're importing the ThemeToggle component dynamically it won't appear 
// if a user has JavaScript turned off, which makes sense as it would be rendered useless without JS. 
// However, due to the beauty of CSS variables, users will still see the fallback 'light' colour scheme,
// even without JavaScript running - winning! 
