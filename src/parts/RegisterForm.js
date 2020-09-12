import React from "react";
import users from "constants/api/users";

import { withRouter } from "react-router-dom";

import useForm from "helpers/hooks/useForm";
import { useState } from "react";
import { Select } from "components/form/select";
import fieldsErrors from "helpers/fieldsErrors";
import { Input } from "components/form/input";

const RegisterForm = ({ history }) => {
    const [
        { name, email, password, profession, otherProfession },
        setState,
    ] = useForm({
        name: "",
        email: "",
        password: "",
        profession: "",
        otherProfession: "",
    });

    const [Errors, setErrors] = useState(() => null);

    const submit = (e) => {
        e.preventDefault();

        users
            .register({
                name,
                email,
                password,
                profession:
                    profession === "Others" ? otherProfession : profession,
            })
            .then((res) => {
                history.push("/login");
            })
            .catch((err) => {
                setErrors(err?.response?.data?.message);
            });
    };

    const ERRORS = fieldsErrors(Errors);

    return (
        <div className="flex justify-center items-center pb-24">
            <div className="w-3/12">
                <h1 className="text-4xl text-gray-900 mb-6">
                    <span className="font-bold">Grow Skills </span> From,
                    Anywhere
                </h1>
                <form onSubmit={submit}>
                    <Input
                        errors={ERRORS?.name?.message}
                        inputType="text"
                        labelName="Full Name"
                        name="name"
                        placeholder="Your name"
                        onChange={setState}
                        value={name}
                    ></Input>

                    <Input
                        errors={ERRORS?.email?.message}
                        inputType="email"
                        labelName="Email Address"
                        name="email"
                        placeholder="Your Email Address"
                        onChange={setState}
                        value={email}
                    ></Input>

                    <Input
                        errors={ERRORS?.password?.message}
                        inputType="password"
                        labelName="Password"
                        name="password"
                        placeholder="Your Password"
                        onChange={setState}
                        value={password}
                    ></Input>

                    <div className="flex flex-col mb-4">
                        <Select
                            labelName="Occupation"
                            name="profession"
                            value={profession}
                            fallBackText="Select your focus"
                            onClick={setState}
                        >
                            <option value="">Select your focus</option>
                            <option value="Web Designer">Web Designer</option>
                            <option value="Front End Developer">
                                Front End Developer
                            </option>
                            <option value="Back End Developer">
                                Back End Developer
                            </option>
                            <option value="Others">Others</option>
                        </Select>
                    </div>

                    {profession === "Others" && (
                        <Input
                            errors={ERRORS?.otherProfession?.message}
                            inputType="text"
                            labelName="Other's Occupation"
                            name="otherProfession"
                            placeholder=" Other's Occupation"
                            onChange={setState}
                            value={otherProfession}
                        ></Input>
                    )}

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full"
                    >
                        Register
                    </button>
                </form>
            </div>
            <div className="w-1/12"></div>
            <div className="w-5/12 flex justify-end pt-24 ">
                <div className="relative" style={{ width: 369, height: 440 }}>
                    <div
                        className="absolute border-indigo-700 border-2 -mt-8 -ml-16 left-0 "
                        style={{ width: 324, height: 374 }}
                    ></div>
                    <div className="absolute w-full h-full -mb-8 -ml-8">
                        <img
                            src="assets/images/foto-register.png"
                            alt="tamara"
                        />
                    </div>
                    <div
                        className="absolute z-10 bg-white py-3 px-4 -mr-12 bottom-0 right-0"
                        style={{ transform: "translateY(40%)", width: 290 }}
                    >
                        <p className="text-gray-900 mb-2">
                            Semua materi terstruktrur baik
                            <br /> dan mentor yang sangat lihai
                        </p>
                        <p className="text-gray-600">James, Apps Developer</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(RegisterForm);
