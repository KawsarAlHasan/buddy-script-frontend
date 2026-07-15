"use client";
import { Avatar, Badge, Dropdown, Image, Input, Spin } from "antd";
import type { MenuProps } from "antd";
import { FiSearch } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi2";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { RiArrowDownSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useMyProfile } from "@/api-services/userServices";

export default function Header() {
  const router = useRouter();

  const { profileData, isLoading, isError, mutate } = useMyProfile();

  if (isLoading) {
    return <Spin />;
  }

  if (!isLoading && isError && !profileData) {
    Cookies.remove("token");
    router.push("/login");
  }

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  const menuItems: MenuProps["items"] = [
    { key: "profile", label: "My Profile" },
    { key: "settings", label: "Settings" },
    { key: "logout", label: "Log Out", onClick: handleLogout },
  ];

  return (
    <div className="sticky top-0 z-30 hidden h-18 items-center border-b border-border-subtle bg-surface px-6 lg:flex">
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between gap-6">
        {/* Logo */}
        <Image
          src="/images/logo.svg"
          className="cursor-pointer"
          alt="logo"
          preview={false}
        />

        {/* Search */}
        <div className="flex-1 flex justify-center px-10">
          <Input
            prefix={<FiSearch className="text-gray-400 mr-1" size={16} />}
            placeholder="input search text"
            className="max-w-[420px] !rounded-full bg-gray-50 dark:!bg-gray-800 border-0 hover:bg-gray-50 hover:border hover:border-[#178fff] focus:border focus:border-[#178fff]"
            style={{
              backgroundColor: "#f5f5f7",
              paddingTop: 8,
              paddingBottom: 8,
            }}
          />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-8 shrink-0">
          <button className="text-[#2f80ed] text-[25px] flex flex-col items-center relative cursor-pointer">
            <HiOutlineHome />
            <span className="absolute -bottom-5.5 left-1/2 -translate-x-1/2 w-7 h-[2px] bg-[#2f80ed] rounded-full" />
          </button>

          <button className="text-gray-500 text-[22px] hover:text-[#2f80ed] transition-colors cursor-pointer">
            <HiOutlineUserGroup />
          </button>

          <Badge count={6} size="small" color="#2f80ed">
            <button className="text-gray-500 text-[22px] hover:text-[#2f80ed] transition-colors cursor-pointer">
              <IoNotificationsOutline />
            </button>
          </Badge>

          <Badge count={2} size="small" color="#2f80ed">
            <button className="text-gray-500 text-[22px] hover:text-[#2f80ed] transition-colors cursor-pointer">
              <BiMessageRoundedDetail />
            </button>
          </Badge>

          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <button className="flex items-center gap-2 cursor-pointer">
              <Avatar size={32} src="https://i.pravatar.cc/64?img=13" />
              <span className="text-gray-800 text-sm font-medium">
                {profileData?.data?.firstName} {profileData?.data?.lastName}
              </span>
              <RiArrowDownSLine className="text-gray-400" size={16} />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
