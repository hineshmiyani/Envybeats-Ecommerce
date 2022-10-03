/* eslint-disable @next/next/no-img-element */
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";

const UserProfileDialog = () => {
  const { data: session } = useSession();

  return (
    <>
      {/* <div className="dialog-backdrop"></div> */}
      <div className="profile-dialog-ctn">
        <div className="profile-dialog">
          {session ? (
            <>
              <div className="profile-details">
                {session?.user?.image ? (
                  <img
                    src={session?.user?.image}
                    width={32}
                    height={32}
                    alt="profile-img"
                  ></img>
                ) : (
                  <FaUserCircle fontSize={34} />
                )}
                <div>
                  <h3>{session?.user?.name}</h3>
                  <p>{session?.user?.email}</p>
                </div>
              </div>
              <button type="button" onClick={() => signOut()}>
                SIGN OUT
              </button>
            </>
          ) : (
            <>
              <h3>Welcome</h3>
              <p style={{ marginBottom: "10px" }}>
                Please sign in to place orders.
              </p>
              <button type="button" onClick={() => signIn()}>
                SIGN IN
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfileDialog;
