"use client";

import useLogin from "@/hooks/useLogin";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import PageButton from "./PageButton";
import { PageName } from "./types";

//interface Props {
//  pageName: PageName;
//}

const NavBar = () => {
  const router = useRouter();
  const { logout } = useLogin();
  return (
    <div className="-outline-offset-2 flex items-center justify-center outline outline-2 outline-subtle-03/50 rounded-[12px] overflow-hidden h-fit">
      <div className="flex">
        <PageButton
          pageName={PageName.Today}
          onClick={() => router.push("/today")}
        />
        <PageButton
          pageName={PageName.Week}
          onClick={() => router.push("/week")}
        />
        {/*
        <PageButton
          pageName={PageName.Friends}
          onClick={() => router.push("/friends")}
        />
        */}
      </div>
      <div>
        <Button
          variant="minimal"
          size="sm"
          className="bg-subtle-01 rounded-none"
          onClick={logout}
          isIcon
        >
          <IconLogout className="text-subtle-05" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
