import { React, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { minidenticon } from "minidenticons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import axios from "axios";

const Navbar = () => {
  const { authUser, setAuthUser } = useAuth();
  const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
    const svgURI = useMemo(
      () =>
        "data:image/svg+xml;utf8," +
        encodeURIComponent(minidenticon(username, saturation, lightness)),
      [username, saturation, lightness]
    );
    return <img src={svgURI} alt={username} {...props} />;
  };
  return (
    <div className="flex justify-between px-3 md:px-8 items-center bg-[#02182B] sticky top-0 z-50 py-1.5">
      <p className="text-2xl md:text-5xl font-medium text-white mclaren tracking-wide">
        Welcome {authUser.user.name.split(" ")[0]}!
      </p>

      <Menu as="div" className="relative">
        <div>
          <MenuButton className="w-16 md:w-fit bg-transparent focus:outline-none">
            <MinidenticonImg
              username={authUser.name}
              saturation="80"
              width="80"
              height="80"
            />
          </MenuButton>
        </div>

        <MenuItems className="border-4 border-red-500 absolute w-full justify-center z-10 center rounded-full bg-white transition ease-in-out duration-100 focus:outline-none">
          <MenuItem>
            <button
              onClick={() => {
                const config = {
                  url: `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
                  method: "post",
                  withCredentials: true,
                };
                axios(config).then(() => {
                  setAuthUser(null);
                });
              }}
              className="p-1 rounded-full block text-center text-lg font-semibold w-full hover:bg-red-500 cursor-pointer hover:text-white transition ease-in-out duration-150"
            >
              logout
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default Navbar;