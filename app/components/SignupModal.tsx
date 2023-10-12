"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useAuth from "../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import Loader from "./Loader";
import { Alert } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

export default function SignupModal() {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, setUser] = useState<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  const { signup } = useAuth();
  const { loading, data, error } = React.useContext(AuthenticationContext);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signup(user, handleClose);

    setUser({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      password: "",
    });
  };

  useEffect(() => {
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.phone ||
      !user.city ||
      !user.password
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [user]);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="border bg-cyan-500 py-1 px-4 rounded mr-3 text-white font-bold hover:bg-cyan-800 "
      >
        Sign Up
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <Loader />
        ) : (
          <Box sx={style} style={{ width: "600px" }}>
            {error && <Alert severity="error">{error}</Alert>}
            {/* <div>
              <span> {data?.first_name}</span>
              <span> {data?.last_name}</span>
            </div> */}

            <div className="flex justify-end mb-5">
              <button
                onClick={handleClose}
                className="text-white bg-red-600 px-4 py-2 font-semibold hover:bg-red-800 "
              >
                Close
              </button>
            </div>

            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="flex justify-center font-bold text-4xl uppercase my-5 p-3 "
            >
              Sign Up
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 px-5 ">
                  <div>
                    <input
                      className="border-2 px-4 py-2 border-black  w-full"
                      placeholder="First Name"
                      value={user.firstName}
                      name="firstname"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      className="border-2 px-4 py-2 border-black w-full"
                      placeholder="Last Name"
                      name="lastname"
                      type="text"
                      value={user.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" col-span-2">
                    <input
                      className="border-2 px-4 py-2 border-black w-full"
                      placeholder=" Email Address"
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      className="border-2 px-4 py-2 border-black w-full"
                      placeholder=" Phone Number"
                      name="phone"
                      type="text"
                      value={user.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      className="border-2 px-4 py-2 border-black w-full"
                      name="city"
                      value={user.city}
                      placeholder=" City"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      className="border-2 px-4 py-2 border-black w-full "
                      name="password"
                      value={user.password}
                      placeholder="Password"
                      type="password"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex justify-center my-4">
                  <button
                    className="px-10 py-2 text-white bg-cyan-600 hover:bg-cyan-900 rounded disabled:bg-gray-500"
                    type="submit"
                    disabled={disabled}
                  >
                    Register
                  </button>
                </div>
              </form>
            </Typography>
          </Box>
        )}
      </Modal>
    </div>
  );
}
