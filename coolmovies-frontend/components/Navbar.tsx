import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import useThemeToggle from "../hooks/useThemeToggle";
import Logo from "../public/favicon.ico";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const { toggleTheme, mode } = useThemeToggle();
  const router = useRouter();

  return (
    <AppBar
      position="static"
      className="bg-secondary dark:bg-primary text-white shadow-md"
    >
      <Toolbar className="flex justify-center lg:justify-between items-center">
        <div className="flex items-center space-x-2">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={Logo} alt="CoolMovies Logo" width={30} height={30} />
            <Typography variant="h6">CoolMovies</Typography>
          </div>
        </div>
        <div className="right-[10px] absolute">
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
