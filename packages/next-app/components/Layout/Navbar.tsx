import { Box, Button, Text, IconSun, useTheme, IconMoon } from "degen";
import Link from "next/link";
import Image from "next/image";
import Wallet from "./Wallet";
import styles from "./Navbar.module.css";
import logoDark from "../../public/dark_tight.png";
import logoLight from "../../public/light_tight.png";
import cookieCutter from "cookie-cutter";
import React, { useEffect, useState } from 'react';
import UAuth from '@uauth/js'
import ResolveDomain from "./Domain";

const Navbar = () => {
  const { mode, setMode } = useTheme();
  const handleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    cookieCutter.set("mode", newMode, { path: "/" });
    setMode(newMode);
  };

  const uauth = new UAuth({
    clientID: "dea1b64c-919d-45ef-a567-9eddb321afc3",
    redirectUri: "https://3000-neodaoist-loudverse-j7lzxc8bsz5.ws-eu81.gitpod.io/",
    scope: "openid wallet email profile:optional social:optional" 
  });
  
  useEffect(() => {
    // setUserWallet("Login With Unstoppable")
    uauth
      .user()
      .then((user) => {
        setUserWallet(user.sub);
        // user exists
        console.log("User information:", user);
      })
      .catch((err) => {
        console.log(err);
        // user does not exist
      });
  }, []);
  
  const login = async () => {
    try {
      const authorization = await uauth.loginWithPopup();
      uauth.user().then((user) => {
        setUserWallet(user.sub);
        // user exists
        console.log("User information:", user);
      });
      // setUserWallet(authorization.sub)
      // window.location.reload();
      console.log(authorization);
    } catch (error) {
      console.error(error);
    }
  };
  
    const [userWallet, setUserWallet] = useState(null);
  
     const logout = async () => {
       try {
         await uauth.logout();
  
         setUserWallet(null);
       } catch (error) {
         console.error(error);
       }
     };

  return (
    <Box
      width="full"
      height="16"
      paddingX="12"
      paddingY="4"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      marginBottom="4"
      borderBottomWidth="px"
      borderColor="foregroundSecondary"
      maxWidth="screenXl"
    >
      <Link href="/" passHref={true}>
        <Box as="a" fontSize='extraLarge'>
          TRUST
        </Box>
      </Link>
      <Box display="flex">
        <Box display="flex" alignItems="center" width="auto" marginRight="6">
          <Box display="flex" alignItems="center" cursor="pointer" paddingX="4" onClick={() => handleMode()}>
            {mode == "light" ? (
              <>
                <span className={styles.solarFade}>Solarpunk Mode</span>
                <IconMoon size="8" strokeWidth={"0.375"} color={"black"} />
              </>
            ) : (
              <>
                <span className={styles.lunarFade}>Lunarpunk Mode</span>
                <IconSun size="8" strokeWidth={"0.375"} color={"yellow"} />
              </>
            )}
          </Box>
          <Link href="/calls" passHref={true}>
            <Box as="a" paddingX="0">
              <Button size="small" variant="transparent">
                Active Projects
              </Button>
            </Box>
          </Link>
          <Box as="a" paddingX="0">
              <Button size="small" variant="transparent">
                <ResolveDomain/>
              </Button>
            </Box>
         <Box><button onClick={() => {userWallet ? logout() : login()}} style={{
      color: 'white',
      backgroundColor: '#0096FF',
      border: 'rounded',
      borderRadius: '10px',
      padding: '10px 20px',
      fontSize: '16px',
        }}>
                {userWallet ? userWallet : "Login Unstoppable"}</button></Box>
        </Box>
        <Wallet />
      </Box>
    </Box>
  );
};

export default Navbar;
